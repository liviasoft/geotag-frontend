<script lang="ts" setup>
  import type { City, Country, State } from '~/types/Locations.types';
  import CountrySelect from './CountrySelect.vue';
  import StateSelect from './StateSelect.vue';
  import CitySelect from './CitySelect.vue';
  import {ref} from 'vue';
  const show = ref(false);
  const emit = defineEmits(['update:selectedState', 'update:selectedCountry', 'update:selectedCity'])
  const selectedCountry = ref<Country | null>(null)
  const selectedState = ref<State | null>(null)
  const selectedCity = ref<City | null>(null)
  watch([selectedCity, selectedState, selectedCountry], ([newCity, newState, newCountry], [oldCity, oldState, oldCountry],) => {
    if(newCity !== oldCity) {
      emit('update:selectedCity', newCity)
    }
    if(newState !== oldState){
      emit('update:selectedState', newState)
    }
    if(newCountry !== oldCountry){
      emit('update:selectedCountry', newCountry)
    }
  })
</script>

<template>
  <div>
    <v-card tile elevation=0>
      <v-card-title @click="show = !show" class="bg-secondary text-white d-flex align-center">
      <v-icon size="20" class="mr-2">mdi-map-check</v-icon>
      Locations <v-spacer></v-spacer> <v-icon>mdi-chevron-{{show ? 'up': 'down'}}</v-icon></v-card-title>
      <v-expand-transition>
        <v-card-text v-show="show" class="py-4"style="max-height: calc(98vh - 164px); overflow-y: scroll;">
          <CountrySelect v-model:selected-country="selectedCountry" />
          <StateSelect :country-id="selectedCountry?.id" v-model:selected-state="selectedState"  />
          <CitySelect :country-id="selectedCountry?.id" :state-id="selectedState?.id" v-model:selected-city="selectedCity" />
          <v-expand-transition>
            <div v-show="Boolean(selectedCity)" >
              <v-card class="px-2 py-1" color="primary">
                <p v-if="selectedCity" class="mb-0">{{ selectedCity.name }}</p>
                <small v-if="selectedCity">Lat: {{ selectedCity.latitude }}, Lng: {{selectedCity.longitude}}</small>
              </v-card>
            </div>
          </v-expand-transition>
        </v-card-text>
      </v-expand-transition>
    </v-card>
  </div>
</template>
