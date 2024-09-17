<script lang="ts" setup>
  import { ref } from 'vue';
  import { toast } from '@neoncoder/vuetify-sonner';
  import type { SavedLocation } from '~/types/Locations.types';

  const props = defineProps({
    location: {
      type: Object as () => SavedLocation,
      required: true,
    }
  })

  const { addLocationNote } = useLocationNoteStore()
  const authStore = useAuthStore()
  const { user, userRoles } = storeToRefs(authStore);

  const loading = ref(false)
  const note = ref('')

  async function saveNote(){
    const data = {
      note: note.value,
      type: 'MESSAGE',
      location: props.location.id,
      author: user.value?.id,
      isSystemNote: false,
    }
    toast.toastOriginal.promise(addLocationNote(props.location.id, data), {
      loading: `${props.location.name}: Adding Note...`,
      success: (data: any) => {
        
        reset()
        return `${props.location.name}: Note Added`
      },
      error: (data: any) => {
        
        return `Error: ${data?.response?.message}`
      },
      finally: () => {
        loading.value = false
      }
    })
    
  }

  function reset(){
    note.value = ''
  }
</script>

<template>
  <v-container class="py-0" style="max-width: 600px;">
    <v-timeline density="compact" side="end">
      <v-timeline-item class="ma-0 no-line" dot-color="orange" size="large" fill-dot>
        <template v-slot:icon>
          <v-avatar :image="user?.avatarUrl || '/images/default.jpeg'"></v-avatar>
        </template>

        <div class="d-flex" style="width: 100%;">

          <v-text-field :readonly="!(userRoles?.includes('ADMIN') || userRoles?.includes('USER'))" tile :loading="loading" @keydown.enter.exact="saveNote" v-model="note"density="compact" hide-details placeholder="Add a note about this location">
            <template v-slot:append>
              <v-btn :disabled="!(userRoles?.includes('ADMIN') || userRoles?.includes('USER'))" tile @click="saveNote" :loading="loading" class="mx-0" variant="tonal" color="primary" appendIcon="mdi-send">
                Send
              </v-btn>
            </template>
          </v-text-field>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>
