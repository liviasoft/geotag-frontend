<script lang="ts" setup>
import L from 'leaflet';
import { ref } from 'vue';
import type { SavedLocation, DeviceCommand } from '~/types/Locations.types';
import { useAuthStore } from '~/stores/auth';
import { useLocationStore } from '~/stores/locations';
import { useUIStore } from '~/stores/ui';
import { toast } from '@neoncoder/vuetify-sonner';
import { useDisplay } from 'vuetify';
import { dateFormatter, maskWithChar } from '@neoncoder/validator-utils';
import DeviceMeasurementsDataTable from './DeviceMeasurementsDataTable.vue';
import EditDeviceDataModal from './EditDeviceDataModal.vue'
import LocationNotes from './LocationNotes.vue'
import LocationNoteForm from './LocationNoteForm.vue'
import DeviceCommandSelectMenu from './DeviceCommandSelectMenu.vue'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'
import LocationMarkerBasicInfo from './LocationMarkerBasicInfo.vue'
import MeasurementParamsModal from './MeasurementParamsModal.vue'
import MeasurementPlaylist from './MeasurementPlaylist.vue'
import MeasurementProcessInfoModal from './MeasurementProcessInfoModal.vue'
import ConfirmStartMeasurementModal from './ConfirmStartMeasurementModal.vue'

const { mobile } = useDisplay();
const fullscreen = ref(false);
const { $pb } = useNuxtApp();
const { toggleConnectionTestLoadingState, updateSavedLocation } = useLocationStore();
const { startDeviceMeasurement, toggleLocationLock } = useDeviceStore();
const props = defineProps({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  location: {
    type: Object as () => SavedLocation,
    required: true
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  excluded: {
    type: Boolean,
    default: false,
  }
})

const { makeAuthenticatedRequest } = useAuthStore()
const { userRoles } = storeToRefs(useAuthStore())
const { connectionStatusColor, connectionStatusIcon } = useUIStore()
const dialog = ref(false)
const totalLoading = ref(false)
const viewMeasurementPlaylist = ref(false)
function openDialog() {
  dialog.value = true
}
const tab = ref('basic')
const commandSelectMenu = ref(false);
const componentKey = ref(0)
function createMarkerIcon({ url, type }: { url?: string, type?: string }) {
  return L.icon({
    iconUrl: url ? url : `icon/${type}.png`,
    iconSize: props.highlight ? [42, 42] : [32, 32],
    className: `base ${props.highlight ? 'highlight' : ''} ${props.excluded ? 'excluded' : ''} ${dialog.value ? 'active' : ''}`,
  })
}
async function testDeviceConnection() {
  if (props.location.connectionTestLoading) return;
  toggleConnectionTestLoadingState(props.location.id, true)
  const url = `api/v1/locations/sites/${props.location.id}/test-connection`
  toast.toastOriginal.promise(makeAuthenticatedRequest({ url }), {
    loading: `${props.location.name}: Testing Device Connection...`,
    success: (data: any) => {
      
      toast.success(data?.response?.message ? data.response.message : 'Connection Test successful')
      toggleConnectionTestLoadingState(props.location.id, false)
      return `Connection Test Successful`
    },
    error: (data: any) => {
      toast.error(data?.response?.message ? data.response.message : 'Connection Test failed')
      
      toggleConnectionTestLoadingState(props.location.id, false)
      return `Error: ${data?.response?.message}`
    }
  })
}

async function inspectForNewFiles(){
  try {
    totalLoading.value = true
    toast.toastOriginal.promise(makeAuthenticatedRequest({ url: `api/v1/files/locations/${props.location.id}/device/new-files?process=true`}), {
      loading: `${props.location.name}: Inspecting for new measurement files...`,
      success: (data: any) => {
        toast.success(`${data?.response?.message ? data.response.message : 'OK'}`)
        return data?.response?.message ? data.response.message : `New Files: ${props.location.name}`
      },
      error: (data: any) => {
        toast.error(`${data?.response?.message ? data.response.message : 'Error'}`)
        return data?.response?.message ? data.response.message : 'Error getting Device New Files'
      },
      finally: () => {
        totalLoading.value = false
      }
    })
    console.log({ locationId: props.location.id })
  } catch (error: any) {
    console.log({ error });
  }
}
watch([dialog, fullscreen], ([newValue, newFullscreen], [oldValue, oldFullscreen]) => {
  if (newFullscreen !== oldFullscreen) componentKey.value++
  if (dialog.value && newValue !== oldValue) {
    $pb.collection('locations').subscribe(props.location.id, function (e) {
      console.log(e.action);
      console.log(e.record);
      if(e.action === 'update'){
        delete e.record.contacts
        delete e.record.addedBy
        delete e.record.locationType
        updateSavedLocation(props.location.id, e.record)
      }
    }, { /* other options like expand, custom headers, etc. */ });
    componentKey.value++
  }
  if(!dialog.value) {
    tab.value = 'basic'
    commandSelectMenu.value = false;
    $pb.collection('locations').unsubscribe(props.location.id);
  }
})

const commandInput = ref('')

function selectCommand(e: DeviceCommand) {
  commandSelectMenu.value = false
  commandInput.value = e.command
}
const loadingCommand = ref(false)
const emit = defineEmits(['location:deleted', 'location:updated'])
async function deleteMarker(){
  if(loadingCommand.value) {
    toast.warning('Device is busy');
    return;
  }
  if(totalLoading.value) return;
  try {
    totalLoading.value = true
    toast.toastOriginal.promise(makeAuthenticatedRequest({ url: `api/v1/locations/sites/${props.location.id}`, method: 'DELETE'}), {
      loading: `${props.location.name}: Deleting Location...`,
      success: (data: any) => {
        
        emit('location:deleted');
        dialog.value = false;
        return data?.response?.message ? data.response.message : `Location Deleted: ${props.location.name}`
      },
      error: (data: any) => {
        
        return data?.response?.message ? data.response.message : 'Error deleting location'
      },
      finally: () => {
        totalLoading.value = false
      }
    })
    console.log({ locationId: props.location.id })
  } catch (error: any) {
    console.log({ error });
  }
}
async function sendCommand() {
  if (loadingCommand.value) return;
  try {
    toast.toastOriginal.promise(makeAuthenticatedRequest({ url: `api/v1/locations/sites/${props.location.id}/command`, method: 'POST', data: { command: commandInput.value } }), {
      loading: `${props.location.name}: Sending Command - ${commandInput.value}...`,
      success: (data: any) => {
        
        return data?.response?.message ? data.response.message : `Command Executed: ${props.location.name}`
      },
      error: (data: any) => {
        
        return data?.response?.message ? data.response.message : 'Error executing command'
      },
      finally: () => {
        loadingCommand.value = false
      }
    })
  } catch (error: any) {
    console.log({ error });
  }
}
async function startMeasurement(e: any){
  console.log({e});
  await startDeviceMeasurement({ deviceId: props.location.id, deviceName: props.location.name })
  await toggleLocationLock({lock: false, locationId: props.location.id})
}
</script>
<template>
  <div>
    <LMarker @click="openDialog" :icon="createMarkerIcon({ url: location.locationTypeData?.iconUrl })"
      :lat-lng="[lat, lng]">
      <LTooltip> {{ location.name }} </LTooltip>
      <!-- <LIcon :icon-size="[21, 21]">★</LIcon> -->
    </LMarker>

    <v-dialog v-model="dialog" :width="fullscreen ? '100vw' : 600" scrollable fullscreen :opacity="0.2">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title class="d-flex align-center bg-primary">
            <p class="mb-0 d-inline-block text-truncate" :title="location.name" style="max-width: 400px;">{{
              location.name }}</p>
            <v-spacer></v-spacer>
            <v-btn class="mx-2" @click="fullscreen = !fullscreen" variant="tonal" size="small"
              icon><v-icon>mdi-fullscreen</v-icon></v-btn>
            <v-btn @click="isActive.value = false" variant="tonal" size="small" icon><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title class="pa-0">
            <v-tabs v-model="tab" fixed-tabs>
              <v-tab prepend-icon="mdi-information" value="basic">Basic Info</v-tab>
              <v-tab prepend-icon="mdi-deskphone" value="device" v-if="location.deviceData">Device</v-tab>
              <v-tab prepend-icon="mdi-note" value="notes">Notes</v-tab>
            </v-tabs>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title class="d-flex align-center px-8" v-if="tab === 'device'">
            <v-btn id="menu-activator" :text="fullscreen ? 'Command List' : ''"
              :prepend-icon="fullscreen ? 'mdi-format-list-bulleted-square' : undefined"
              :icon="fullscreen ? undefined : 'mdi-format-list-bulleted-square'" tile class="mr-2">
            </v-btn>
            <v-menu v-model="commandSelectMenu" activator="#menu-activator" width="350" height="500" :close-on-content-click="false">
              <DeviceCommandSelectMenu @command:select="selectCommand" />
            </v-menu>
            <v-text-field tile v-model="commandInput" @keydown.enter.exact="sendCommand"
              clearable
              :readonly="loadingCommand || location.connectionStatus !== 'OK' || location.connectionTestLoading || !userRoles?.includes('ADMIN')"
              placeholder="Send Device Command" prepend-inner-icon="mdi-console" hide-details variant="solo"
              density="compact" single-line></v-text-field>
            <v-tooltip text="Send Command">
              <template v-slot:activator="{ props }">
                <v-btn :loading="loadingCommand" :disabled="loadingCommand || location.connectionStatus !== 'OK'"
                v-if="userRoles?.includes('ADMIN')"
                  :text="fullscreen ? 'Send Command' : ''" :prepend-icon="fullscreen ? 'mdi-console-line' : undefined"
                  :icon="fullscreen ? undefined : 'mdi-console-line'" @click="sendCommand" v-bind="props" color="primary"
                  variant="tonal" stack tile class="mx-2">
                </v-btn>
              </template>
            </v-tooltip>
          </v-card-title>
          <v-card-title v-if="tab === 'notes'" class="py-0 my-n4" :style="{ paddingLeft: fullscreen ? '2px' : '0' }">
            <LocationNoteForm :location="location" />
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0" style="height: 205px;">
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="basic">
                <LocationMarkerBasicInfo :location="location" :is-fullscreen="fullscreen" :key="componentKey" />
              </v-tabs-window-item>
              <v-tabs-window-item value="device" v-if="location.deviceData">
                <v-divider></v-divider>
                <div class="pa-2">
                  <div class="d-flex align-start px-4">
                    <EditDeviceDataModal :location="location" />
                    <div v-if="!location.useRemoteConnection">
                      <p><span class="text-medium-emphasis">IP Address:</span> <span class="font-weight-bold"> {{
                         !userRoles?.includes('ADMIN') ? maskWithChar({ str: location.deviceData?.ipAddress, num: 9}) : location.deviceData?.ipAddress }}</span> </p>
                      <p><span class="text-medium-emphasis">Port:</span> <span class="font-weight-bold"> {{
                         !userRoles?.includes('ADMIN') ? maskWithChar({ str: String(location?.deviceData?.port ?? ""), num: 9}) : location.deviceData?.port }}</span> </p>
                    </div>
                    <div v-else>
                      <p><span class="text-medium-emphasis">HTTP:</span> <span class="font-weight-bold"> {{
                         !userRoles?.includes('ADMIN') ? maskWithChar({ str: location.remoteHTTPUrl?? '', num: 11, reverse: true}) : location.remoteHTTPUrl }}</span> </p>
                      <p><span class="text-medium-emphasis">TCP:</span> <span class="font-weight-bold"> {{
                         !userRoles?.includes('ADMIN') ? maskWithChar({ str: location.remoteTCPUrl ?? '', num: 11, reverse: true}) : location.remoteTCPUrl }}</span> </p>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn tile v-if="!mobile" :disabled="props.location.connectionTestLoading"
                      :loading="props.location.connectionTestLoading" variant="tonal" class="text-none"
                      @click="testDeviceConnection">
                      <v-icon start>mdi-wifi-marker</v-icon>
                      Test</v-btn>
                  </div>
                  <div class="d-flex align-center px-4">
                    <p class="text-medium-emphasis">Connection Status:</p>
                    <v-spacer></v-spacer>
                    <v-chip tile v-if="location.connectionStatus" label
                      :color="connectionStatusColor(location.connectionTestLoading ? 'PENDING' : location.connectionStatus)"
                      variant="tonal">
                      <v-icon
                        :icon="connectionStatusIcon(location.connectionTestLoading ? 'PENDING' : location.connectionStatus)"
                        start></v-icon>
                      {{ location.connectionTestLoading ? 'PENDING' : location.connectionStatus === 'ERROR' ? 'OFFLINE' : location.connectionStatus }}
                    </v-chip>
                  </div>
                  <div class="d-flex align-center px-4 mt-2">
                    <p class="text-medium-emphasis">Last Connection Test:
                    </p>
                    <v-spacer></v-spacer>
                    <p>
                      <span v-if="location.lastConnectionStatusCheck">
                        {{ dateFormatter({ dateLike: String(location.lastConnectionStatusCheck) }) }}
                      </span><span v-else class="text-disabled">Not yet tested</span>
                    </p>
                  </div>
                  <div class="pa-2">
                    <v-btn tile v-if="mobile" block :loading="location.connectionTestLoading" variant="tonal"
                      class="text-none" @click="testDeviceConnection">
                      <v-icon start>mdi-wifi-marker</v-icon>
                      Test Connection</v-btn>
                  </div>
                  <div class="d-flex align-center px-4" v-if="userRoles?.includes('ADMIN')">
                    <v-btn @click="toggleLocationLock({ locationId: props.location.id, lock: !props.location.isLocked })" v-if="props.location.isLocked" density="comfortable" icon size="small" color="error" tile variant="plain" class="mr-2">
                      <v-icon>mdi-lock</v-icon>
                      <v-tooltip
                        activator="parent"
                        location="top"
                      >Device is Locked</v-tooltip>
                    </v-btn>
                    <ConfirmStartMeasurementModal :location="props.location" @start:measurement="startMeasurement" />
                    <MeasurementParamsModal />
                    <MeasurementProcessInfoModal />
                    <v-btn :disabled="!userRoles?.includes('ADMIN')" @click="viewMeasurementPlaylist = !viewMeasurementPlaylist" density="comfortable" icon size="small" :color="viewMeasurementPlaylist ? 'warning': 'primary'" tile variant="tonal" class="mx-4">
                      <v-icon>mdi-play-pause</v-icon>
                      <v-tooltip
                        activator="parent"
                        location="top"
                      >Measurement Playlist</v-tooltip>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!userRoles?.includes('ADMIN')" @click="inspectForNewFiles" class="text-capitalize" prepend-icon="mdi-magnify" variant="tonal" density="compact">
                      Inspect 
                      <v-tooltip
                        activator="parent"
                        location="top"
                      >Check Device for new Files</v-tooltip>
                    </v-btn>
                    
                  </div>
                  <v-expand-transition>
                    <div v-show="viewMeasurementPlaylist">
                      <MeasurementPlaylist :location="props.location" />
                    </div>
                  </v-expand-transition>
                </div>
                <div class="px-4 py-0">
                  <DeviceMeasurementsDataTable :key="componentKey" :isFullscreen="fullscreen"
                    :location="props.location" />
                </div>
              </v-tabs-window-item>

              <v-tabs-window-item value="notes">
                <LocationNotes :location="location" />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <ConfirmDeleteModal 
              modal-title="Confirm Delete?" 
              :btn-props="{ 
                text: 'Delete Location Marker', 
                variant: 'tonal', 
                color: 'error', 
                prependIcon: 'mdi-delete' 
              }" 
              @confirm="deleteMarker"
              modal-text="This would delete all records related to this location including <strong>Location Notes</strong>, any <strong>Device Data</strong>, <strong>Measurement Files and Data</strong>, and any other records related to this location." 
            />
            <!-- <v-btn prepend-icon="mdi-delete" class="text-capitalize px-3" color="error" text="Delete Location" @click="deleteMarker"></v-btn> -->
            <v-btn tile prepend-icon="mdi-close" class="text-capitalize px-4" text="Close" @click="isActive.value = false"></v-btn>
          </v-card-actions>
          <v-overlay
            :model-value="totalLoading"
            class="align-center justify-center"
            contained
            :opacity="0.5"
            scrim="white"
          >
            <v-progress-circular
              color="primary"
              size="64"
              indeterminate
              
            ></v-progress-circular>
          </v-overlay>
        </v-card>
      </template>
    </v-dialog>

  </div>
</template>

<style lang="css">
.highlight {
  background-color: rgba(255, 255, 255, 0.5);
  border: 3px solid #2a73c5;
}

.active {
  border: 3px solid #fb910a;
}

.base {
  transition: all 0.3s ease;
  border-radius: 50%;
}

.v-timeline-item__body {
  width: 100%;
}

.no-line .v-timeline-divider {
  --v-timeline-line-thickness: 0px;
}

.excluded {
  filter: grayscale(1);
  opacity: 0.6;
}
</style>
