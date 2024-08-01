import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import type {LocationType} from '../types/Locations.types'
import { useAuthStore } from './auth'

export const useLocationStore = defineStore('locations', () => {
  const locationTypes = ref<Array<LocationType>>([])
  const { makeAuthenticatedRequest } = useAuthStore()

  const getLocationTypes = async () => {
    const {error, response} = await makeAuthenticatedRequest({ url: 'api/v1/settings/location-types', method: 'GET', type: 'JSON', data: null})
    console.log({response, error})
    if(response?.data?.locationTypes) {
      locationTypes.value = response.data.locationTypes
    }
  }
  return {
    locationTypes,
    getLocationTypes,
  }
})