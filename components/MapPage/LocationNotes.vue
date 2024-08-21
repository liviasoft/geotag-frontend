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
        console.log({data})
        locationNoteAdded(data)
      })
      $fileio.on('LOCATIONNOTE_UPDATED', (data) => {
        console.log({data})
        locationNoteUpdated(data)
      })
      $fileio.on('LOCATIONNOTE_DELETED', (data) => {
        console.log({data})
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
    $fileio.emit('LOCATION_CONNECTED', {locationId: props.location.id})
    toast.toastOriginal.promise(getLocationNotes(props.location.id), {
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
    query()
  })
</script>
<template>
  <v-container class="py-0" style="max-width: 600px;">
    <v-timeline
      density="compact"
      side="end"
    >
      <!-- <v-timeline-item
        class="mb-12"
        dot-color="orange"
        size="large"
        fill-dot
      >
        <template v-slot:icon>
          <span>JL</span>
        </template>
        <v-text-field
          v-model="input"
          density="compact"
          label="Leave a comment..."
          hide-details
          @keydown.enter="comment"
        >
          <template v-slot:append>
            <v-btn
              class="mx-0"
              variant="text"
              @click="comment"
            >
              Post
            </v-btn>
          </template>
        </v-text-field>
      </v-timeline-item> -->

      <v-slide-y-transition group>
        <v-timeline-item
          v-for="event in locationNotes"
          :key="event.id"
          class="mt-0"
          :icon="messageTypeIcon(event.type || '')"
          :dot-color="messageTypeColor(event.type || '')"
          size="small"
        >
          <div class="d-flex">
            <div class="mb-n4 mt-2 pt-1 justify-space-between flex-grow-1">
              <v-chip
                class="mr-2 mb-1"
                :color="messageTypeColor(event.type || '')"
                size="small"
                label
              >
              {{event.type}}
              </v-chip>
              <span class="inline">{{ event.note }}</span>
              <div class="d-flex align-center">
                <p class="text-disabled text-caption font-italic">@{{ event.isSystemNote ? 'System-Logs' : event.authorData?.username }} <v-btn v-if="user?.id === event.author" @click="deleteNote(event.id)" size="small" variant="plain" class="text-red text-capitalize mx-2">delete</v-btn></p>

                <v-spacer></v-spacer>
                <p class="text-disabled text-caption">{{ dateFormatter({ dateLike: String(event.created)}) }}</p>
              </div>
            </div>
            <div class="flex-shrink-0 mt-3 ml-4"><v-avatar tile color="grey-lighten-2"><v-icon v-if="event.isSystemNote">mdi-cog</v-icon><v-img v-else :src="event.authorData?.avatarUrl || '/images/default.jpeg'"></v-img></v-avatar></div>
          </div>
        </v-timeline-item>
      </v-slide-y-transition>

      <!-- <v-timeline-item
        class="mb-6"
        hide-dot
      >
        <span>TODAY</span>
      </v-timeline-item>

      <v-timeline-item
        class="mb-4"
        dot-color="grey"
        size="small"
      >
        <div class="d-flex justify-space-between flex-grow-1">
          <div>
            This order was archived.
          </div>
          <div class="flex-shrink-0">
            15:26 EDT
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item
        class="mb-4"
        dot-color="primary"
        size="small"
      >
        <div class="d-flex justify-space-between flex-grow-1">
          <div>
            <v-chip
              class="ms-0"
              color="purple"
              size="small"
              label
            >
              APP
            </v-chip>
            Digital Downloads fulfilled 1 item.
          </div>
          <div class="flex-shrink-0">
            15:25 EDT
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item
        class="mb-4"
        dot-color="grey"
        size="small"
      >
        <div class="d-flex justify-space-between flex-grow-1">
          <div>
            Order confirmation email was sent to John Leider (john@google.com).
          </div>
          <div class="flex-shrink-0">
            15:25 EDT
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item
        class="mb-4"
        hide-dot
      >
        <v-btn
          variant="outlined"
        >
          Resend Email
        </v-btn>
      </v-timeline-item>

      <v-timeline-item
        class="mb-4"
        dot-color="grey"
        size="small"
      >
        <div class="d-flex justify-space-between flex-grow-1">
          <div>
            A $15.00 USD payment was processed on PayPal Express Checkout
          </div>
          <div class="flex-shrink-0">
            15:25 EDT
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item
        dot-color="grey"
        size="small"
      >
        <div class="d-flex justify-space-between flex-grow-1">
          <div>
            John Leider placed this order on Online Store (checkout #1937432132572).
          </div>
          <div class="flex-shrink-0">
            15:25 EDT
          </div>
        </div>
      </v-timeline-item> -->
    </v-timeline>
  </v-container>
</template>
