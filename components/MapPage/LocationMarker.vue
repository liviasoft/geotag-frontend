<script lang="ts" setup>
import L from 'leaflet';
import { ref } from 'vue';
import * as changeCase from "change-case";
import type { SavedLocation, DeviceCommand } from '~/types/Locations.types';
import { useAuthStore } from '~/stores/auth';
import { useLocationStore } from '~/stores/locations';
import { useUIStore } from '~/stores/ui';
import { toast } from '@neoncoder/vuetify-sonner';
import { useDisplay } from 'vuetify';
import { dateFormatter } from '@neoncoder/validator-utils';
import DeviceMeasurementsDataTable from './DeviceMeasurementsDataTable.vue';
import EditDeviceDataModal from './EditDeviceDataModal.vue'
import LocationNotes from './LocationNotes.vue'
import LocationNoteForm from './LocationNoteForm.vue'
import DeviceCommandSelectMenu from './DeviceCommandSelectMenu.vue'

const { mobile } = useDisplay();
const fullscreen = ref(false);
const { $pb } = useNuxtApp();
const { toggleConnectionTestLoadingState, updateSavedLocation } = useLocationStore();
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
const { connectionStatusColor, connectionStatusIcon } = useUIStore()
const dialog = ref(false)
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
      console.log({ data })
      toast.success(data?.response?.message ? data.response.message : 'Connection Test successful')
      toggleConnectionTestLoadingState(props.location.id, false)
      return `Connection Test Successful`
    },
    error: (data: any) => {
      toast.error(data?.response?.message ? data.response.message : 'Connection Test failed')
      console.log({ data })
      toggleConnectionTestLoadingState(props.location.id, false)
      return `Error: ${data?.response?.message}`
    }
  })
}
watch([dialog, fullscreen], ([newValue, newFullscreen], [oldValue, oldFullscreen]) => {
  console.log({ newValue })
  if (newFullscreen !== oldFullscreen) componentKey.value++
  if (newValue !== oldValue) {
    tab.value = 'basic'
    commandSelectMenu.value = false;
    $pb.collection('locations').subscribe(props.location.id, function (e) {
      console.log(e.action);
      console.log(e.record);
      updateSavedLocation(props.location.id, e.record)
    }, { /* other options like expand, custom headers, etc. */ });
  } else {
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
async function sendCommand() {
  if (loadingCommand.value) return;
  try {
    toast.toastOriginal.promise(makeAuthenticatedRequest({ url: `api/v1/locations/sites/${props.location.id}/command`, method: 'POST', data: { command: commandInput.value } }), {
      loading: `${props.location.name}: Sending Command - ${commandInput.value}...`,
      success: (data: any) => {
        console.log({ data })
        return data?.response?.message ? data.response.message : `Command Executed: ${props.location.name}`
      },
      error: (data: any) => {
        console.log({ data })
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
            <v-text-field v-model="commandInput" @keydown.enter.exact="sendCommand"
              :readonly="loadingCommand || location.connectionStatus !== 'OK' || location.connectionTestLoading"
              placeholder="Send Device Command" prepend-inner-icon="mdi-console" hide-details variant="solo"
              density="compact" single-line></v-text-field>
            <v-tooltip text="Send Command">
              <template v-slot:activator="{ props }">
                <v-btn :loading="loadingCommand" :disabled="loadingCommand || location.connectionStatus !== 'OK'"
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
                <v-container>
                  <v-row align="start" justify="center">
                    <v-col cols="10">
                      <v-card class="elevated" variant="text">
                        <v-img :aspect-ratio="1.618" cover
                          :src="location.imageUrl ? location.imageUrl : '/images/no-image.png'"></v-img>
                      </v-card>
                    </v-col>
                    <v-col cols="10">
                      <div>
                        <div class="d-flex align-center mt-0 mb-4">
                          <v-chip color="primary" label size="large">
                            <v-avatar :image="location.locationTypeData?.iconUrl" start tile></v-avatar>
                            {{ changeCase.capitalCase(location.locationTypeData?.name || '') }}
                          </v-chip>
                          <v-chip v-if="location.connectionStatus" class="mx-4" label
                            :color="connectionStatusColor(location.connectionTestLoading ? 'PENDING' : location.connectionStatus)"
                            variant="tonal" size="large">
                            <v-icon
                              :icon="connectionStatusIcon(location.connectionTestLoading ? 'PENDING' : location.connectionStatus)"
                              start></v-icon>
                            {{ location.connectionTestLoading ? 'PENDING' : location.connectionStatus }}
                          </v-chip>
                        </div>
                        <p class="text-h5"><span class="text-disabled">Site:</span> {{ location.name }}</p>
                        <v-divider class="my-2"></v-divider>
                        <p class="text-h6 my-1"><span class="text-disabled">Address:</span> {{ location.address }}</p>
                        <p class="text-h6 my-1"><span class="text-disabled">Details:</span> {{ location.description }}
                        </p>
                        <p class="text-h6 my-1"><span class="text-disabled">latitude:</span> {{ location.latitude }}</p>
                        <p class="text-h6 my-1"><span class="text-disabled">longitude:</span> {{ location.longitude }}
                        </p>
                        <p class="text-h6 my-1"><span class="text-disabled">Added On:</span> {{ dateFormatter({
                          dateLike:
                          location.created}) }}</p>
                        <p class="text-h6 my-1"><span class="text-disabled">Last updated:</span> {{
                          dateFormatter({
                            dateLike:
                          location.updated}) }}</p>
                        <p class="text-h6 my-1"><span class="text-disabled">Added By:</span> {{ location.addedByData ?
                          location.addedByData.username : '' }}</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                <pre>{{ location }}</pre>
                <v-btn v-if="mobile" block :loading="props.location.connectionTestLoading" variant="tonal"
                  class="text-none" @click="testDeviceConnection">
                  <v-icon start>mdi-wifi-marker</v-icon>
                  Test Connection</v-btn>
              </v-tabs-window-item>

              <v-tabs-window-item value="device" v-if="location.deviceData">

                <v-divider></v-divider>
                <div class="pa-2">
                  <div class="d-flex align-start px-4">
                    <EditDeviceDataModal :location="location" />
                    <div>
                      <p><span class="text-medium-emphasis">IP Address:</span> <span class="font-weight-bold"> {{
                        location.deviceData?.ipAddress }}</span> </p>
                      <p><span class="text-medium-emphasis">Port:</span> <span class="font-weight-bold"> {{
                        location.deviceData?.port }}</span> </p>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn v-if="!mobile" :disabled="props.location.connectionTestLoading"
                      :loading="props.location.connectionTestLoading" variant="tonal" class="text-none"
                      @click="testDeviceConnection">
                      <v-icon start>mdi-wifi-marker</v-icon>
                      Test Connection</v-btn>
                  </div>
                  <div class="d-flex align-center px-4">
                    <p class="text-medium-emphasis">Connection Status:</p>
                    <v-spacer></v-spacer>
                    <v-chip v-if="location.connectionStatus" label
                      :color="connectionStatusColor(location.connectionTestLoading ? 'PENDING' : location.connectionStatus)"
                      variant="tonal">
                      <v-icon
                        :icon="connectionStatusIcon(location.connectionTestLoading ? 'PENDING' : location.connectionStatus)"
                        start></v-icon>
                      {{ location.connectionTestLoading ? 'PENDING' : location.connectionStatus }}
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
                    <v-btn v-if="mobile" block :loading="location.connectionTestLoading" variant="tonal"
                      class="text-none" @click="testDeviceConnection">
                      <v-icon start>mdi-wifi-marker</v-icon>
                      Test Connection</v-btn>
                  </div>
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
            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
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
