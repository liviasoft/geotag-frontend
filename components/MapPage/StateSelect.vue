<script lang="ts" setup>
  import { ref } from "vue";
  import { watchDebounced } from '@vueuse/core';
  import type { State } from "~/types/Locations.types";

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  const loading = ref(false);
  const emit = defineEmits(['update:selectedState'])
  const props = defineProps({
    countryId: {
      type: Number,
      default: null
    }
  })
  const url = computed(() => {
    if(!props.countryId) return null;
    return (new URL(`${apiBaseUrl}/api/v1/locations/countries/${props.countryId}/states`)).href
  })
  watchDebounced(url, (newVal, oldVal) => {
    if(newVal !== oldVal){
      selectedState.value = null
    }
    if(newVal){
      query()
    }
  }, {debounce: 500})
  const selectedState = ref<State | null>(null)
  const states = ref<Array<State>>([])
  async function query(){
    if(loading.value || !url.value) return;
    try {
      loading.value = true;
      const res = await fetch(url.value);
      const {data: {states: fetchedStates}} = await res.json()
      states.value = fetchedStates
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
      
      prependInnerIcon="mdi-flag"
      active
      prepend
      v-model="selectedState"
      @update:modelValue="(e: State) => emit('update:selectedState', e)"
      :items="states"
      :readonly="loading"
      hideDetails
      autoSelectFirst
      :loading="loading"
      flat
      itemTitle="name"
      variant="outlined"
      label="State"
      placeholder="Select State"
      density="compact"
      return-object
      class="mb-4"
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
