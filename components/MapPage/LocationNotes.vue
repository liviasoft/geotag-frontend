<script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { toast } from '@neoncoder/vuetify-sonner';
  import { Socket } from 'socket.io-client'
  import type { LocationNote, SavedLocation } from '~/types/Locations.types';
  import { dateFormatter } from '@neoncoder/validator-utils';

  const { $fileio } : { $fileio: Socket} = useNuxtApp();
  const authStore = useAuthStore()
  const { makeAuthenticatedRequest } = useAuthStore()
  const { user } = storeToRefs(authStore);
  const connected = ref(false)
  onMounted(() => {
    if($fileio){
      
      $fileio.on('connect', () => {
        connected.value = $fileio.connected
        $fileio.emit('LOCATION_CONNECTED', {locationId: props.location.id})
      });
      $fileio.on('disconnect', () => {
        connected.value = $fileio.connected
      });
      $fileio.on('LOCATIONNOTE_CREATED', (data) => {
        
        locationNoteAdded(data)
      })
      $fileio.on('LOCATIONNOTE_UPDATED', (data) => {
        
        locationNoteUpdated(data)
      })
      $fileio.on('LOCATIONNOTE_DELETED', (data) => {
        
        locationNoteDeleted(data)
      })
    }
  })

  onUnmounted(() => {
    $fileio.emit('LOCATION_DISCONNECTED', {locationId: props.location.id})
  });

  const props = defineProps({
    location: {
      type: Object as () => SavedLocation,
      required: true,
    }
  })

  // const noteStore = useLocationNoteStore()
  // const { locationNotes } = storeToRefs(noteStore);
  const locationNotes = ref<Array<LocationNote>>([])
  const page = ref(1)
  const pages = ref(1);
  const next = ref(null)
  const total = ref(0);
  
  const getLocationNotes = async (locationId: string, fetchpage = 1) => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: `api/v1/files/locations/${locationId}/notes?page=${fetchpage}`})
      .then(result => {
        const {data: {locationNotes: fetchedNotes, meta: {total: ftotal, pages: fpages, next: fnext, page: fpage}}, } = result.response
        locationNotes.value = locationNotes.value.concat(fetchedNotes)
        total.value = ftotal;
        pages.value = fpages;
        next.value = fnext;
        page.value = fpage;
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

  function messageTypeColor(messageType: string){
    switch (messageType) {
      case 'INFO':
        return 'info'
      case 'ERROR':
        return 'error'
      case 'SUCCESS':
        return 'success'
      case 'WARNING':
        return 'warning'
      case 'MESSAGE':
        return 'purple'
      default:
        return 'purple'
    }
  }

  function messageTypeIcon(messageType: string){
    switch (messageType) {
      case 'INFO':
        return 'mdi-information-outline'
      case 'ERROR':
        return 'mdi-alert-octagon-outline'
      case 'SUCCESS':
        return 'mdi-check-circle-outline'
      case 'WARNING':
        return 'mdi-alert-rhombus-outline'
      case 'MESSAGE':
        return 'mdi-message-bookmark-outline'
      default:
        return 'mdi-circle-small'
    }
  }

  // export default {
  //   data: () => ({
  //     events: [],
  //     input: null,
  //     nonce: 0,
  //   }),

  //   computed: {
  //     timeline () {
  //       return this.events.slice().reverse()
  //     },
  //   },

  //   methods: {
  //     comment () {
  //       const time = (new Date()).toTimeString()
  //       this.events.push({
  //         id: this.nonce++,
  //         text: this.input,
  //         time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
  //           return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
  //         }),
  //       })

  //       this.input = null
  //     },
  //   },
  // }
  const loading = ref(false)

  async function query(){
    if(loading.value) return;
    loading.value = true
    toast.toastOriginal.promise(getLocationNotes(props.location.id, next.value ? next.value : 1), {
      loading: `Loading Location Notes...`,
      success: (data: any) => {
        return `Fetched Location Notes`
      },
      error: (data: any) => {
        const {response, error, message} = data
        return `Error: ${response ? data?.response?.message : error?.message ? error.message : message}`
      },
      finally: () => {
        loading.value = false
      }
    })
  }

  async function deleteNote(id: string){
    toast.toastOriginal.promise(deleteLocationNote(props.location.id, id), {
      loading: `Deleting Location Note...`,
      success: (data: any) => {
        return `Location Note Deleted`
      },
      error: (data: any) => {
        const {response, error, message} = data
        return `Error: ${response ? data?.response?.message : error?.message ? error.message : message}`
      },
      finally: () => {
        loading.value = false
      }
    })
  }
  onMounted(() => {
    $fileio.emit('LOCATION_CONNECTED', {locationId: props.location.id})
    query()
  })
</script>
<template>
  <v-container class="py-0" style="max-width: 600px;">
    <v-row v-if="!loading && !locationNotes.length">
      <v-col cols="12">
        <v-alert type="info" prominent variant="tonal" class="my-4" >
          <p>No Notes on this location</p>
        </v-alert>
      </v-col>
    </v-row>
    <v-timeline
      density="compact"
      side="end"
      >
      <v-slide-y-transition group>
        <v-timeline-item
          v-for="event in locationNotes"
          :key="event.id"
          class="mt-0"
          :icon="messageTypeIcon(event.type || '')"
          :dot-color="messageTypeColor(event.type || '')"
          size="small"
        >
          <div>
            <v-list-item three-line class="pa-0">
              <v-list-item-title>
                <v-chip
                  class="mr-2 mb-1"
                  :color="messageTypeColor(event.type || '')"
                  size="small"
                  label
                  tile
                >
                {{event.type}}
                </v-chip>
                <span>{{ event.note }}</span>
              </v-list-item-title>
              <v-list-item-subtitle><span>{{ event.note }}</span></v-list-item-subtitle>
              <template v-slot:append>
                <v-avatar tile color="grey-lighten-2">
                  <v-icon v-if="event.isSystemNote">mdi-cog</v-icon>
                  <v-img v-else :src="event.authorData?.avatarUrl || '/images/default.jpeg'"></v-img>
                </v-avatar>
              </template>
              <v-list-item-subtitle>
                <div class="d-flex align-center">
                  <p class="text-disabled text-caption font-italic">@{{ event.isSystemNote ? 'System-Logs' : event.authorData?.username }} <v-btn v-if="user?.id === event.author" @click="deleteNote(event.id)" size="small" variant="plain" class="text-red text-capitalize mx-2">delete</v-btn></p>

                  <v-spacer></v-spacer>
                  <p class="text-disabled text-caption">{{ dateFormatter({ dateLike: String(event.created)}) }}</p>
                </div>
              </v-list-item-subtitle>
            </v-list-item>
            <!-- <div class="d-flex">            
              <div class="mb-n4 mt-2 pt-1 justify-space-between flex-grow-1">
                <v-chip
                  class="mr-2 mb-1"
                  :color="messageTypeColor(event.type || '')"
                  size="small"
                  label
                  tile
                >
                {{event.type}}
                </v-chip>
                <span class="inline d-inline-block text-truncate" style="max-width: 350px;">{{ event.note }}</span>
                <div class="d-flex align-center">
                  <p class="text-disabled text-caption font-italic">@{{ event.isSystemNote ? 'System-Logs' : event.authorData?.username }} <v-btn v-if="user?.id === event.author" @click="deleteNote(event.id)" size="small" variant="plain" class="text-red text-capitalize mx-2">delete</v-btn></p>

                  <v-spacer></v-spacer>
                  <p class="text-disabled text-caption">{{ dateFormatter({ dateLike: String(event.created)}) }}</p>
                </div>
              </div>
              <div class="flex-shrink-0 mt-3 ml-4">
                <v-avatar tile color="grey-lighten-2">
                  <v-icon v-if="event.isSystemNote">mdi-cog</v-icon>
                  <v-img v-else :src="event.authorData?.avatarUrl || '/images/default.jpeg'"></v-img>
                </v-avatar>
              </div>
            </div> -->
          </div>
        </v-timeline-item>
      </v-slide-y-transition>
    </v-timeline>
    <v-skeleton-loader type="list-item-avatar" v-if="loading"></v-skeleton-loader>
    <v-row align-center v-if="next">
      <v-col cols="12">
        <div class="d-flex align-center justify-center py-2 mb-8" style="width: 100%">
          <v-btn tile @click="query" :loading="loading">Load More ({{ pages - page }})</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
