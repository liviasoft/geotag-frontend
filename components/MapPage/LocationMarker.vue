<script lang="ts" setup>
import L from 'leaflet';
import { ref } from 'vue';
import type { SavedLocation } from '~/types/Locations.types';
import { useAuthStore } from '~/stores/auth';
import { useUIStore } from '~/stores/ui';
import { toast } from '@neoncoder/vuetify-sonner';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
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
const connectionTestLoading = ref(false)
function openDialog() {
  dialog.value = true
}
const tab = ref('basic')
const connectionStatus = ref<'PENDING' | 'OK' | 'ERROR'>('PENDING')
function createMarkerIcon({ url, type }: { url?: string, type?: string }) {
  return L.icon({
    iconUrl: url ? url : `icon/${type}.png`,
    iconSize: props.highlight ? [42, 42] : [32, 32],
    className: `base ${props.highlight ? 'highlight' : ''} ${props.excluded ? 'excluded' : ''}`,
  })
}
async function testDeviceConnection() {
  if (connectionTestLoading.value) return;
  try {
    connectionStatus.value = 'PENDING'
    connectionTestLoading.value = true
    const url = `api/v1/locations/sites/${props.location.id}/test-connection`
    const { error, response } = await makeAuthenticatedRequest({ method: 'GET', url, type: 'JSON', data: null })
    console.log({ error, response })
    if (!error) {
      toast.success(response.message)
      connectionStatus.value = 'OK'
    } else {
      toast.error(response.message)
      connectionStatus.value = 'ERROR'
    }
  } catch (error: any) {
    console.log({ error });
  } finally {
    connectionTestLoading.value = false
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

    <v-dialog v-model="dialog" width="500" scrollable>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title class="d-flex align-center bg-primary">
            <p class="mb-0 d-inline-block text-truncate" :title="location.name" style="max-width: 400px;">{{
              location.name }}</p>
            <v-spacer></v-spacer>
            <v-btn @click="isActive.value = false" variant="tonal" size="small" icon><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title class="pa-0">
            <v-tabs v-model="tab" fixed-tabs>
              <!-- bg-color="primary" -->
              <v-tab value="basic">Basic Info</v-tab>
              <v-tab value="device" v-if="location.deviceData">Device</v-tab>
              <v-tab value="notes">Notes</v-tab>
            </v-tabs>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0" style="height: 205px;">

            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="basic">
                <pre>{{ location }}</pre>
              </v-tabs-window-item>

              <v-tabs-window-item value="device" v-if="location.deviceData">
                <div class="pa-2">
                  <div class="d-flex align-start px-4">
                    <div>
                      <p><span class="text-medium-emphasis">IP Address:</span> <span class="font-weight-bold"> {{
                        location.deviceData?.ipAddress }}</span> </p>
                      <p><span class="text-medium-emphasis">Port:</span> <span class="font-weight-bold"> {{
                          location.deviceData?.port }}</span> </p>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn v-if="!mobile" :loading="connectionTestLoading" variant="text" class="text-none"
                      @click="testDeviceConnection">
                      <v-icon start>mdi-wifi-marker</v-icon>
                      Test Connection</v-btn>
                  </div>
                  <div class="d-flex align-center px-4">
                    <p class="text-medium-emphasis">Connection Status:</p>
                    <v-spacer></v-spacer>
                    <v-chip label :color="connectionStatusColor(connectionStatus)" variant="tonal">
                      <v-icon :icon="connectionStatusIcon(connectionStatus)" start></v-icon>
                      {{ connectionStatus }}
                    </v-chip>
                  </div>
                  <div class="pa-2">
                    <v-btn v-if="mobile" block :loading="connectionTestLoading" variant="tonal" class="text-none"
                      @click="testDeviceConnection">
                      <v-icon start>mdi-wifi-marker</v-icon>
                      Test Connection</v-btn>
                  </div>
                </div>
                <!-- {{ location.deviceData }} -->
              </v-tabs-window-item>

              <v-tabs-window-item value="notes">
                Three
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
  border: 3px solid black !important;
}

.base {
  transition: all 0.3s ease;
  border-radius: 50%;
}

.excluded {
  filter: grayscale(1);
  opacity: 0.6;
}
</style>
