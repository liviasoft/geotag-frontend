<script lang="ts" setup>
  import { ref } from 'vue' ;
  import { useDeviceStore } from '~/stores/devices';
  import { useAuthStore } from '~/stores/auth';

  const { userRoles } = storeToRefs(useAuthStore())

  const {restoreDefaultMeasurementParams} = useDeviceStore()
  const { bandResolution, bandResolutionUnit, freqSweepTime, freqSweepTimeUnit, freqUnits, startFreq, startFreqUnit, stopFreq, stopFreqUnit, timeUnits, axisDwellTime, axisDwellTimeUnit, measurementTime, measurementTimeUnit} = storeToRefs(useDeviceStore())
  const dialog = ref(false)
</script>


<template>
  <div class="text-center pa-0">
    <v-btn @click="dialog = true" class="mx-4" density="compact" icon tile variant="tonal"><v-icon>mdi-tune-vertical</v-icon>
      <v-tooltip activator="parent"
        location="top">
        Configure Parameters
      </v-tooltip>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        tile
        width="600"
      >
      <v-card-title class="bg-primary d-flex align-center">
        <v-icon class="mr-2">mdi-tune-vertical</v-icon>
         EMF Measurement Parameters
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" icon variant="tonal" size="x-small"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="pt-4">
          <v-col cols="6" class="py-0">
            <v-text-field :readonly="!userRoles?.includes('ADMIN')" prepend-icon="mdi-sine-wave" label="Start Frequency" type="number" v-model="startFreq" variant="outlined" density="compact" tile ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select :readonly="!userRoles?.includes('ADMIN')" label="Start Freq Units" :items="freqUnits" v-model="startFreqUnit" variant="outlined" density="compact" tile ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field :readonly="!userRoles?.includes('ADMIN')" prepend-icon="mdi-sine-wave" label="Stop Frequency" type="number" v-model="stopFreq" variant="outlined" density="compact" tile ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select :readonly="!userRoles?.includes('ADMIN')" label="Stop Freq Units" :items="freqUnits" v-model="stopFreqUnit" variant="outlined" density="compact" tile ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field :readonly="!userRoles?.includes('ADMIN')" prepend-icon="mdi-relation-many-to-many" label="Bandwidth Resolution" type="number" v-model="bandResolution" variant="outlined" density="compact" tile ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select :readonly="!userRoles?.includes('ADMIN')" label="Bandwidth Rez Units" :items="freqUnits" v-model="bandResolutionUnit" variant="outlined" density="compact" tile ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field :readonly="!userRoles?.includes('ADMIN')" prepend-icon="mdi-timer-check-outline" label="Freq Sweep Time" type="number" v-model="freqSweepTime" variant="outlined" density="compact" tile ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select :readonly="!userRoles?.includes('ADMIN')" label="Freq Sweep Time Units" :items="timeUnits" v-model="freqSweepTimeUnit" variant="outlined" density="compact" tile ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field :readonly="!userRoles?.includes('ADMIN')" prepend-icon="mdi-timer-10" label="Measurement Time" type="number" v-model="measurementTime" variant="outlined" density="compact" tile ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select :readonly="!userRoles?.includes('ADMIN')" label="Measurement Time Units" :items="timeUnits" v-model="measurementTimeUnit" variant="outlined" density="compact" tile ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field :readonly="!userRoles?.includes('ADMIN')" prepend-icon="mdi-timer-sand" label="Axis Dwell Time" type="number" v-model="axisDwellTime" variant="outlined" density="compact" tile ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select :readonly="!userRoles?.includes('ADMIN')" label="Axis Dwell Time Units" :items="timeUnits" v-model="axisDwellTimeUnit" variant="outlined" density="compact" tile ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!userRoles?.includes('ADMIN')" tile @click="restoreDefaultMeasurementParams" class="text-capitalize px-4 mx-2" variant="tonal" color="purple" text="Restore Defaults" prepend-icon="mdi-restore">
          </v-btn>
          <v-btn
            tile
            class="ms-auto text-capitalize px-4"
            variant="tonal"
            color="primary"
            prepend-icon="mdi-check"
            text="OK"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>