<script lang="ts" setup>
  import { toast } from '@neoncoder/vuetify-sonner';
  const config = useRuntimeConfig()
  const props = defineProps({
    locationId: {
      type: String,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    }
  })
  const emit = defineEmits(['update:image'])
  const dialog = ref(false)
  const loading = ref(false)
  const image = ref<File | undefined>(undefined)
  const { $pb } = useNuxtApp();
  async function uploadImage(remove = false){
    if(loading.value) return;
    if(!image.value) {
      if(!remove) {
        toast.error('Please select an image');
        return;
      }
    }
    loading.value = true;
    const data = new FormData();
    data.append('image', image.value!);
    try {
      // TODO: Make sure user has right permissions
      await $pb.admins.authWithPassword(config.public.PB_ADMIN_EMAIL, config.public.PB_ADMIN_PASSWORD);
      toast.toastOriginal.promise($pb.collection('locations').update(props.locationId, remove ? {image: null} : data), {
        loading: `${props.locationName}: ${remove ? 'removing' : 'updating'} image...`,
        success: (data: any) => {
          
          emit('update:image', data.id)
          toast.success(`${props.locationName}: Image ${remove ? 'removed': 'updated'}`)
          image.value = undefined
          dialog.value = false
          return `${props.locationName}: Image ${remove ? 'removed': 'updated'}`
        },
        error: (data: any) => {
          
          toast.error(`${props.locationName}: Error ${remove ? 'removing': 'updating'} Image`)
          return `Error ${remove? 'removing': 'updating'} Image`
        },
        finally: () => {
          loading.value = false;
          $pb.authStore.clear();
        }
      })
    } catch (error: any) {
      console.log({error})
    } finally {
      loading.value = false;
    }
  }
  async function cancel(){
    loading.value = false;
    image.value = undefined;
    dialog.value = false;
  }
</script>

<template>
  <div class="text-center pa-0">
    <v-btn tile @click="dialog = true" prepend-icon="mdi-camera" variant="tonal" color="green" class="text-capitalize mx-4">Update Image</v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        tile
        width="400"
      >
        <v-card-title class="d-flex align-center bg-primary">
          <v-icon>mdi-camera</v-icon> &nbsp; Update Image
          <v-spacer></v-spacer>
          <v-btn @click="cancel" icon variant="tonal" size="x-small"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-file-input
            tile
            label="Select Image"
            prepend-inner-icon="mdi-camera"
            density="compact"
            variant="outlined"
            accept="image/png, image/jpeg, image/bmp"
            v-model="image"
            clearable
            show-size
          ></v-file-input>
        </v-card-text>
        <v-divider></v-divider>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn tile class="px-4 text-capitalize" color="error" text="Remove" prepend-icon="mdi-cancel" variant="tonal" @click="uploadImage(true)"></v-btn>
          <v-btn tile class="px-4 text-capitalize mr-2" color="primary" prepend-icon="mdi-content-save" text="save" variant="tonal" @click="uploadImage(false)"></v-btn>
          <v-btn
            tile
            class="ms-auto text-capitalize px-4"
            text="Close"
            prepend-icon="mdi-close"
            variant="text"
            @click="cancel"
          ></v-btn>
        </template>
        <v-overlay
          :model-value="loading"
          scrim="blue"
          class="align-center justify-center"
          contained
          >
          <v-progress-circular
          color="primary"
          size="64"
          indeterminate
          ></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-dialog>
  </div>
</template>
