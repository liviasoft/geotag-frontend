<script lang="ts" setup>
  import { ref } from 'vue';
  import AddDeviceCommandModal from './AddDeviceCommandModal.vue'
  import { useDeviceStore } from "~/stores/devices";
  import type { DeviceCommand } from '~/types/Locations.types';
  import { toast } from '@neoncoder/vuetify-sonner';

  const { getDeviceCommands, deleteDeviceCommand } = useDeviceStore()
  const { deviceCommands } = storeToRefs(useDeviceStore())

  const show = ref(false);
  const loading = ref(false);
  const update = ref(false);
  const showDialog = ref(false);
  const selectedCommand = ref<DeviceCommand | null>(null)
  async function query (){
    if(loading.value) return;
    try {
      await getDeviceCommands()
    } catch (error) {
      console.log({error});
    } finally {
      loading.value = false
    }
  }
  watch(show, (newValue) => {
    if(newValue) query()
  })
  function editCommand(){
    update.value = true;
    showDialog.value = true;
  }
  function deleteCommand(){
    if(loading.value) return;
    if(selectedCommand.value){
      loading.value = true
      toast.toastOriginal.promise(
        deleteDeviceCommand(selectedCommand.value.id), {
          loading: `Deleting Device Command...`,
          success: (data: any) => {
            console.log({data})
            selectedCommand.value = null
            update.value = false;
            query()
            return `Device Command deleted`
          },
          error: (data: any) => {
            console.log({data})
            const {response, error, message} = data
            return `Error: ${response ? data?.response?.message : error?.message ? error.message : message}`
          },
          finally: () => {
            loading.value = false
          }
        }
      )
    } else {
      toast.error('No device command selected')
    }
  }
</script>

<template>
  <div>
    <v-card tile elevation="0">
      <v-card-title @click="show = !show" class="bg-secondary text-white d-flex align-center">
        <v-icon size="20" class="mr-2">mdi-console</v-icon>
      Commands <v-spacer></v-spacer> <v-icon>mdi-chevron-{{show ? 'up': 'down'}}</v-icon>
      </v-card-title>
      <v-expand-transition>
        <v-card-text v-show="show" class="py-4"style="max-height: calc(98vh - 164px); overflow-y: scroll;">
          <v-autocomplete
            label="Command List"
            placeholder="Command List"
            :loading="loading"
            variant="solo"
            density="compact"
            single-line
            hide-details
            v-model="selectedCommand"
            return-object
            clearable
            class="mb-2"
            :items="deviceCommands"
          >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            db;dsx
        </v-autocomplete>
          <v-expand-transition>
            <v-card v-show="Boolean(selectedCommand)" class="pa-2 my-0" color="primary" variant="tonal">
              <p class="font-weight-bold">{{ selectedCommand?.command }}</p>
              <v-divider></v-divider>
              <div class="d-flex align-center">

                <v-chip class="my-2 mr-2" label :color="selectedCommand?.commandType === 'Query' ? 'purple' : 'warning'">{{ selectedCommand?.commandType.charAt(0)
                      }}</v-chip>
              <p>{{ selectedCommand?.title }}</p>
            </div>
              <v-divider></v-divider>
              <div style="max-height: 100px; overflow-y: scroll;">
                <p class="text-caption text-black">{{ selectedCommand?.description }}</p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center mt-2">
                <v-btn @click="deleteCommand" prepend-icon="mdi-delete" class="px-0" variant="text" color="error" size="small">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="editCommand" prepend-icon="mdi-refresh" variant="tonal" color="secondary" size="small">Update</v-btn>
              </div>
            </v-card>
          </v-expand-transition>
          <AddDeviceCommandModal v-model:dialog="showDialog" v-model:update="update"  @update:command-updated="getDeviceCommands" @update:command-added="getDeviceCommands" :selected-device-command="selectedCommand" />
        </v-card-text>
      </v-expand-transition>
    </v-card>
  </div>
</template>
