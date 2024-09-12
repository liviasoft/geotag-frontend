<script lang="ts" setup>
  import { ref } from 'vue';
  import { watchDebounced } from '@vueuse/core';
  import type { City } from '~/types/Locations.types';

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  const loading = ref(false);

  const emit = defineEmits(['update:selectedCity'])
  const props = defineProps({
    countryId: {
      type: Number,
      default: null
    },
    stateId: {
      type: Number,
      default: null
    }
  })
  const url = computed(() => {
    if(!props.countryId || !props.stateId) return null;
    return (new URL(`${apiBaseUrl}/api/v1/locations/countries/${props.countryId}/states/${props.stateId}/cities`)).href
  })
  watchDebounced(url, (newVal, oldVal) => {
    if(newVal !== oldVal){
      selectedCity.value = null
      emit('update:selectedCity', selectedCity.value)
    }
    if(newVal){
      query()
    }
  }, {debounce: 500})
  const selectedCity = ref<City | null>(null);
  const cities = ref<Array<City>>([])
  async function query(){
    if(loading.value || !url.value) return;
    try {
      loading.value = true;
      const res = await fetch(url.value);
      const {data: {cities: fetchedCities}} = await res.json()
      cities.value = fetchedCities
    } catch (error: any) {
      console.log({error});
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div>
    <v-autocomplete
      class="mb-2"
      prependInnerIcon="mdi-flag"
      active
      prepend
      v-model="selectedCity"
      @update:modelValue="(e: City) => emit('update:selectedCity', e)"
      :items="cities"
      :readonly="loading"
      hideDetails
      autoSelectFirst
      :loading="loading"
      flat
      itemTitle="name"
      variant="outlined"
      label="City"
      placeholder="Select City"
      density="compact"
      return-object
      >
      <template #item="{props, item}">
        <v-hover>
          <template v-slot:default="{ isHovering, props: hoverProps }">
            <div v-bind="{...props, ...hoverProps}" :class="isHovering ? 'bg-grey-lighten-3' : undefined" class="px-4 pt-1" style="cursor: pointer">
              <span
                class="d-inline-block text-truncate"
                style="max-width: 170px;"
                >
                {{ item.raw.name }}
              </span>
            </div>
          </template>
        </v-hover>
      </template>
    </v-autocomplete>
  </div>
</template>
