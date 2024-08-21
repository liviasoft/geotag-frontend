<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  import type { Country } from '~/types/Locations.types';
  const selectedCountry = ref<Country | null>(null)
  const countries = ref<Array<Country>>([])
  const loading = ref(false);
  async function getCountries() {
    if(loading.value) return;
    try {
      loading.value = true;
      const url = (new URL(`${apiBaseUrl}/api/v1/locations/countries`)).href
      const res = await fetch(url);
      const {data: {countries: fetchedCountries}} = await res.json()
      countries.value = fetchedCountries;
    } catch (error: any) {
      console.log({error})
    } finally {
      loading.value = false
    }
  }
  onMounted(() => {
    getCountries()
  })
  const emit = defineEmits(['update:selectedCountry'])
</script>

<template>
  <div>
    <v-autocomplete
      
      prependInnerIcon="mdi-flag"
      active
      prepend
      v-model="selectedCountry"
      @update:modelValue="(e: Country) => emit('update:selectedCountry', e)"
      :items="countries"
      :readonly="loading"
      hideDetails
      autoSelectFirst
      :loading="loading"
      flat
      itemTitle="name"
      variant="outlined"
      label="Country"
      placeholder="Select Country"
      density="compact"
      class="mb-4"
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
