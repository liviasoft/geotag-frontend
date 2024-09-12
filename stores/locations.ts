import { defineStore } from "pinia";
import { ref, computed, reactive, toRef } from 'vue';
import {locationFields, type LocationType, type SavedLocation} from '../types/Locations.types'
import { useAuthStore } from './auth'
import { getObjectKeys, isBoolean, sanitizeData } from "@neoncoder/validator-utils";

export const useLocationStore = defineStore('locations', () => {
  const locationTypes = ref<Array<LocationType>>([])
  const savedLocations = ref<Array<SavedLocation>>([])
  const selectedLocationTypeFilter = ref('all')

  const { makeAuthenticatedRequest } = useAuthStore()

  const getLocationTypes = async () => {
    const {error, response} = await makeAuthenticatedRequest({ url: 'api/v1/settings/location-types', method: 'GET', type: 'JSON', data: null})
    if(response?.data?.locationTypes) {
      locationTypes.value = response.data.locationTypes
    }
  }

  const getSavedLocations = async () => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: 'api/v1/locations/sites'})
      .then(result => {
        const { data: {locations}} = result.response
        savedLocations.value = locations.map((x: Omit<SavedLocation, 'connectionTestLoading' | 'deviceFilesLoading'>) => ({...x, connectionTestLoading: ref(false), deviceFilesLoading: ref(false)}));
        resolve(result)
      }).catch(error => reject(error))
    });
  }

  function toggleConnectionTestLoadingState (locationId: string, loading = true) {
    const loc = savedLocations.value.find(x => x.id === locationId);
    
    if(loc){
      loc.connectionTestLoading = loading
    }
  }

  function toggleDeviceFilesLoadingState (locationId: string, loading = true) {
    const loc = savedLocations.value.find(x => x.id === locationId);
    if(loc){
      loc.deviceFilesLoading = Boolean(loading)
    }
  }

  function updateSavedLocation(locationId: string, updateData: Record<string, any> ){
    const loc: Record<string, any> | undefined = savedLocations.value.find(x => x.id === locationId);
    if(loc){
      const data = sanitizeData<SavedLocation>(locationFields, updateData)
      for (const key in loc) {
        if(data[key as keyof SavedLocation]) loc[key as keyof SavedLocation] = data[key as keyof SavedLocation]
        if(isBoolean(data[key as keyof SavedLocation])) loc[key as keyof SavedLocation] = data[key as keyof SavedLocation]
      }
    }
  }

  function fetchLocationDetails(locationId: string): Promise<{ error?: any, response?: any}>{
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: `api/v1/locations/sites/${locationId}`})
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  }

  const filteredSavedLocations = computed(() => {
    if (selectedLocationTypeFilter.value === 'all') return savedLocations.value
    return savedLocations.value.filter(l => l.locationType === selectedLocationTypeFilter.value)
  })

  return {
    locationTypes,
    getSavedLocations,
    getLocationTypes,
    toggleConnectionTestLoadingState,
    toggleDeviceFilesLoadingState,
    updateSavedLocation,
    fetchLocationDetails,
    filteredSavedLocations,
    selectedLocationTypeFilter,
    savedLocations,
  }
})
// interface ILocationState {
//   savedLocations: Array<SavedLocation>
//   locationTypes: Array<LocationType>
//   selectedLocationTypeFilter: string
// }

// export const useLocationStore = defineStore('locationStore', {
//   state: (): ILocationState => ({
//     savedLocations: [],
//     // savedLocations: ref<Array<SavedLocation>>([]),
//     locationTypes: [],
//     // locationTypes: ref<Array<LocationType>>([]),
//     selectedLocationTypeFilter: 'all'
//   }),
//   actions: {
//     async getLocationTypes(){
//       const { makeAuthenticatedRequest } = useAuthStore()
//       const {response} = await makeAuthenticatedRequest({ url: 'api/v1/settings/location-types'})
//       if(response?.data?.locationTypes) {
//         this.locationTypes = response.data.locationTypes
//       }
//     },

//     async getSavedLocations(){
//       return new Promise((resolve, reject) => {
//         const { makeAuthenticatedRequest } = useAuthStore()
//         makeAuthenticatedRequest({ url: 'api/v1/locations/sites'})
//         .then(result => {
//           const { data: {locations}} = result.response
//           this.savedLocations = locations.map((x: Omit<SavedLocation, 'connectionTestLoading' | 'deviceFilesLoading'>) => ({...x, connectionTestLoading: false, deviceFilesLoading: false}));
//           resolve(result)
//         }).catch(error => reject(error))
//       });
//     },

//     toggleConnectionTestLoadingState (locationId: string, loading = true) {
//       const loc = this.savedLocations.find(x => x.id === locationId);
//       console.log({loc, loading})
//       if(loc){
//         loc.connectionTestLoading = loading
//         console.log({updated: loc})
//       }
//     },

//     toggleDeviceFilesLoadingState (locationId: string, loading = true) {
//       const loc = this.savedLocations.find(x => x.id === locationId);
//       if(loc){
//         loc.deviceFilesLoading = Boolean(loading)
//       }
//     }
//   },
//   getters: {
//     filteredSavedLocations: (state) => {
//       if (state.selectedLocationTypeFilter === 'all') return state.savedLocations
//       return state.savedLocations.filter(l => l.locationType === state.selectedLocationTypeFilter)
//     }
//   }
// })