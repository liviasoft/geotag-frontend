import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useFetch } from '@vueuse/core'

export const useGeolocationStore = defineStore('geolocation', () => {
  const searchTerm = ref('')
  const id = ref(1)
  const url = computed(() => {
    return new URL(`https://localhost:3001/api/v1/locations/${id.value}`).href
  })
  const {isFetching, data, error } = useFetch(url, {refetch: true, })


  // const fetchStates = async () => {
  //   isLoading.value = true;
  //   error.value = null;
  //   try {
  //     const response = await useFetch('https://your-api-endpoint.com/states');
  //     states.value = response.data;
  //   } catch (err) {
  //     error.value = err;
  //   } finally {
  //     isLoading.value = false;
  //   }
  // };

  return {
    id,
    data,
    error,
    isFetching,
    // states,
    // isLoading,
    // error,
    // fetchStates,
    // stateNames: computed(() => states.value.map(state => state.name)),
  };
});
