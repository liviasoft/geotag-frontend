import type { LocationNote } from "~/types/Locations.types"

export const useLocationNoteStore = defineStore('locationNotes', () => {
  const locationNotes = ref<Array<LocationNote>>([])

  const { makeAuthenticatedRequest } = useAuthStore()

  const getLocationNotes = async (locationId: string) => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: `api/v1/files/locations/${locationId}/notes`})
      .then(result => {
        const {data: {locationNotes: fetchedNotes}} = result.response
        locationNotes.value = fetchedNotes
        resolve(result)
      }).catch(error => reject(error))
    })
  }

  const locationNoteAdded = (newLocationNote: LocationNote) => {
    locationNotes.value.unshift(newLocationNote);
  }

  const locationNoteUpdated = (updatedLocationNote: LocationNote) => {
    let alteredNote = locationNotes.value.find(({id}) => id === updatedLocationNote.id);
    if(alteredNote) {
      alteredNote = {
        ...updatedLocationNote
      }
    }
  }

  const locationNoteDeleted = (deletedId: string) => {
    locationNotes.value = locationNotes.value.filter(({id}) => id !== deletedId)
  }

  const addLocationNote = async(locationId: string, data: Omit<LocationNote, 'id'>) => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: `api/v1/files/locations/${locationId}/notes`, method: 'POST', data})
      .then(resolve).catch(error => reject(error))
    });
  }

  const updateLocationNote = async(locationId: string, data: Partial<LocationNote>) => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: `api/v1/files/locations/${locationId}/notes/${data.id}`, method: 'PATCH', data})
      .then(resolve).catch(error => reject(error))
    });
  }

  const deleteLocationNote = async(locationId: string, id: string) => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: `api/v1/files/locations/${locationId}/notes/${id}`, method: 'DELETE'})
      .then(resolve).catch(error => reject(error))
    });
  }

  return {
    locationNotes,
    getLocationNotes,
    addLocationNote,
    locationNoteAdded,
    updateLocationNote,
    locationNoteUpdated,
    deleteLocationNote,
    locationNoteDeleted,
  }
})