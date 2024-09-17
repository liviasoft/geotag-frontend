<script lang="ts" setup>
  import { ref } from 'vue';
  import type { SavedLocation } from '~/types/Locations.types';
  import { useDeviceStore } from '~/stores/devices';
  import { useAuthStore } from '~/stores/auth';
import { toast } from '@neoncoder/vuetify-sonner';

  const { restoreDefaultMeasurementParams } = useDeviceStore()
  const { makeAuthenticatedRequest } = useAuthStore()
  const { userRoles } = storeToRefs(useAuthStore())
  const { bandResolution, bandResolutionUnit, freqSweepTime, freqSweepTimeUnit, freqUnits, startFreq, startFreqUnit, stopFreq, stopFreqUnit, timeUnits, axisDwellTime, axisDwellTimeUnit, measurementTime, measurementTimeUnit} = storeToRefs(useDeviceStore())

  const props = defineProps({
    location: {
      type: Object as () => SavedLocation,
      required: true
    }
  })
  const emit = defineEmits(['start:measurement'])
  async function startMeasurement(){
    if(loading.value) return;
    try {
      loading.value = true;
      toast.toastOriginal.promise(makeAuthenticatedRequest({url: `api/v1/locations/sites/${props.location.id}`, method: 'PATCH', data: {isLocked: true}}, false), {
        loading: `${props.location.name}: Starting Capture Process...`,
        success: (data: any) => {
          console.log({data})
          toast.success(`${props.location.name}: Capture Process Started...`)
          emit('start:measurement', {background: backgroundProcess.value, locationId: props.location.id})
          dialog.value = false;
          return `${props.location.name}: Capture Process Started...`
        },
        error: (data: any) => {
          console.log({data})
          toast.error(`${props.location.name}: Error Starting Process...`)
          return `${props.location.name}: Error Starting Process...`
        }
      })
    } catch (error: any) {
      console.log({error});
    } finally {
      loading.value = false
    }
  }
  const dialog = ref(false)
  const showMeasurementParams = ref(false);
  const confirmMeasurementParams = ref(false);
  const backgroundProcess = ref(false);
  const loading = ref(false)
  watch(dialog, (value) => {
    if(!value){
      loading.value = false;
      confirmMeasurementParams.value = false
      showMeasurementParams.value = false
    }
  })
</script>

<template>
  <div class="text-center pa-0">
    <v-btn @click="dialog = true" tile density="comfortable" append-icon="mdi-broadcast" class="text-capitalize" variant="tonal" color="teal" >Start measurement
      <v-tooltip activator="parent"
        location="top">
        Begin Taking Measurements
      </v-tooltip>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="auto"
      persistent
    >
      <v-card
        tile
        width="500"
      >
        <v-card-title class="bg-teal d-flex align-center">
          <v-icon class="mr-2">mdi-alert</v-icon>
          Confirm Start
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon variant="tonal" size="x-small" ><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          This will lock the device temporarily until the measurement sequence is complete. Functionality & device access may be limited until complete.
          <div class="d-flex align-center mb-n2">
            <v-checkbox single-line v-model="confirmMeasurementParams" hide-details label="Confirm Measurement Parameters"></v-checkbox>
            <v-spacer></v-spacer>
            <v-btn class="mx-4 mb-0" tile @click="showMeasurementParams = !showMeasurementParams" :color="showMeasurementParams? 'blue': ''" icon variant="tonal" size="x-small">
              <v-icon  size="large">
                mdi-chevron-{{showMeasurementParams ? 'up' : 'down'}}
              </v-icon>
              <v-tooltip
                activator="parent"
                location="top"
              >{{showMeasurementParams ? 'Hide' : 'View'}} Measurement Parameters</v-tooltip>
            </v-btn>
          </div>
          <v-expand-transition>
            <div v-show="showMeasurementParams">
              <v-divider class="my-2"></v-divider>
              <p><span class="text-disabled">Start Frequency: </span> {{ startFreq }} {{ startFreqUnit }}</p>
              <p><span class="text-disabled">Stop Frequency: </span> {{ stopFreq }} {{ stopFreqUnit }}</p>
              <p><span class="text-disabled">Bandwidth Resolution: </span> {{ bandResolution }} {{ bandResolutionUnit }}</p>
              <p><span class="text-disabled">Frequency Sweep Time: </span> {{ freqSweepTime }} {{ freqSweepTimeUnit }}</p>
              <p><span class="text-disabled">Measurement Time: </span> {{ measurementTime }} {{ measurementTimeUnit }}</p>
              <p><span class="text-disabled">Axis Dwell Time: </span> {{ axisDwellTime }} {{ axisDwellTimeUnit }}</p>
              <v-btn @click="restoreDefaultMeasurementParams" block variant="tonal" color="purple" prepend-icon="mdi-history" text="Restore Default Parameters" class="text-capitalize"></v-btn>
            </div>
          </v-expand-transition>
          <v-alert class="mt-2 text-body-2" variant="tonal" type="warning" density="compact" prominent >
            Please do not close or refresh this page once measurement has started.
          </v-alert>
        </v-card-text>
        <v-divider></v-divider>

        <template v-slot:actions>
          <v-switch v-model="backgroundProcess" single-line hide-details color="primary" class="ml-4">
            <template v-slot:label>
              <div>
                Quietly
                <v-tooltip text="Run as a background process" location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">mdi-information-outline</v-icon>
                  </template>
                </v-tooltip>
              </div>
            </template>
          </v-switch>
          <v-spacer></v-spacer>
          <v-btn @click="startMeasurement" :loading="loading" :disabled="!confirmMeasurementParams" tile class="px-4 mx-2" prepend-icon="mdi-broadcast" variant="tonal" color="teal" text="Start"></v-btn>
          <v-btn
            tile
            class="ms-auto px-4 text-capitalize"
            text="Cancel"
            prepend-icon="mdi-close"
            @click="dialog = false"
          ></v-btn>
        </template>
        <v-overlay :model-value="loading" scrim="blue"
      class="align-center justify-center"
      contained :opacity='0.5'>
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-overlay>
      </v-card>
    </v-dialog>
  </div>
</template>