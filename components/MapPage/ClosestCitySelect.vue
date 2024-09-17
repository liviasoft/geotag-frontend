<script lang="ts" setup>
  import { ref, defineModel } from 'vue';
  import { watchDebounced } from '@vueuse/core';
  import type { NearbyCity } from '~/types/Locations.types';
  const authStore = useAuthStore();
  // const config = useRuntimeConfig();
  // const apiBaseUrl = config.public.API_BASE_URL;
  const selectedNearbyCity = defineModel('selectedNearbyCity')
  const props = defineProps({
    lat: {
      type: Number,
      default: 0
    },
    lng: {
      type: Number,
      default: 0
    }
  })
  const nearestCities = ref<Array<NearbyCity>>([])
  const loading = ref(false);
  // const url = computed(() => {
  //   return new URL(`${apiBaseUrl}/api/v1/locations/nearest-cities?lat=${props.lat}&lng=${props.lng}&limit=10`).href
  // })
  const url = computed(() => {
    return `api/v1/locations/nearest-cities?lat=${props.lat}&lng=${props.lng}&limit=50`
  })
  const query = async () => {
    if (loading.value) return;
    loading.value = true;
    try {
      
      // const {res} = await fetch(url.value);
      const {response: {data: {cities}}} = await authStore.makeAuthenticatedRequest({url: url.value});
      
      nearestCities.value = cities;
      emit('update:selectedNearbyCity', cities[0])
    } catch (error: any) {
      console.log({error});
    } finally {
      loading.value = false
    }
  }
  // watch([props.lat, props.lng], ([newA, newB], [prevA, prevB]) => {
  watchDebounced(url, () => {
    query()
  }, {debounce: 500})
  onMounted(() => {
    query()
  })
  const emit = defineEmits(['update:selectedNearbyCity'])
</script>

<template>
  <div>
    <v-select :loading="loading" clearable label="Nearest City" hide-details class="mb-2" :items="nearestCities" v-model="selectedNearbyCity" return-object @update:modelValue="(e: string) => emit('update:selectedNearbyCity', e)" item-title="name" item-value="id" placeholder="City" variant="outlined" density="compact">
      <template v-slot:selection="{ item }" :key="url">
        <div class="d-flex align-center">
          <span>{{ item.title }}, {{ item.raw.state_code }}</span>
        </div>
      </template>
    </v-select>
  </div>
</template>
