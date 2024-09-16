<script lang="ts" setup>
  import { toast } from '@neoncoder/vuetify-sonner';
  import type { SavedLocation } from '~/types/Locations.types';
  const { makeAuthenticatedRequest } = useAuthStore()
  const props = defineProps({
    location: {
      type: Object as () => SavedLocation,
      required: true
    }
  })
  const loadingCommand = ref(false)
  const loading = ref<Set<number>>(new Set([]))
  const playlist = ref([
    {command: '*IDN?', description: 'Check that the device is online', id: 1, timeout: 3000},
    {command: 'INST:SEL?', description: 'Ensure that SPA mode is active', id: 2, timeout: 3000},
    {command: 'INST:APPL:STAT HIPM, 0', description: 'If not SPA mode, configure SPA step 1', id: 3, timeout: 3000},
    {command: 'INST:APPL:STAT CAAUSB, 0', description: 'If not SPA mode, configure SPA step 2', id: 4, timeout: 3000},
    {command: 'INST:APPL:STAT SPA, 1', description: 'If not SPA mode, configure SPA step 3', id: 5, timeout: 3000},
    {command: 'INST:SEL SPA', description: 'If not SPA mode, switch to SPA mode', id: 6, timeout: 3000},
    {command: 'SYST:PRES', description: 'Preset Instrument', id: 7, timeout: 3000},
    {command: 'SYST:PRES:MODE', description: 'Preset Instrument Mode', id: 8, timeout: 3000},
    {command: 'SENS:FREQ:STAR 700 MHZ', description: 'Set Start Frequency to 700 MHz', id: 9, timeout: 3000},
    {command: 'SENS:FREQ:STAR?', description: 'Check Start Frequency', id: 32, timeout: 3000},
    {command: 'SENS:FREQ:STOP 4 GHZ', description: 'Set Stop Frequency to 4 GHZ', id: 10, timeout: 3000},
    {command: 'SENS:FREQ:STOP?', description: 'Check Stop Frequency', id: 33, timeout: 3000},
    {command: 'BAND:RES 100 KHz', description: 'Set bandwidth Resolution to 100KHz', id: 11, timeout: 3000},
    {command: 'SENS:FREQ:SWE:TIME 500 MS', description: 'Set Frequency Sweep Time', id: 12, timeout: 3000},
    {command: 'SENS:POW:RF:ATT:AUTO 1', description: 'Configure Automatic RF Signal Attenuation', id: 13, timeout: 3000},
    {command: 'SENS:POW:RF:GAIN:STAT 0', description: 'Configure RF Signal Power Gain status', id: 14, timeout: 3000},
    {command: 'SENS:EMF:STAT?', description: 'Check if EMF Mode is enabled', id: 15, timeout: 3000},
    {command: 'SENS:EMF:STAT 1', description: 'Switch to EMF Mode', id: 16, timeout: 3000},
    {command: 'SENS:EMF:LOG?', description: 'Check if Device Logging is Enabled', id: 17, timeout: 3000},
    {command: 'SENS:EMF:LOG 1', description: 'Enable Device Logging', id: 18, timeout: 3000},
    {command: 'UNIT:POW DBMV/M', description: 'Configure Measurement Units', id: 19, timeout: 3000},
    {command: 'DISP:WIND:TRAC:Y:SCAL:RLEV 50 DBMV/M', description: 'Set Device Display Window Trace Offset', id: 20, timeout: 3000},
    {command: 'DISP:WIND:TRAC:Y:SCAL:RLEV:OFF 0 DB', description: 'Set Device Display Window Trace', id: 21, timeout: 3000},
    {command: 'SENS:EMF:MEAS:TIME 10 MIN', description: 'Set Measurement Time (10 Minutes)', id: 22, timeout: 3000},
    {command: 'SENS:EMF:MEAS:TIME?', description: 'Check Measurement Time (in Milliseconds)', id: 23, timeout: 3000},
    {command: 'SENS:EMF:MEAS:COUN 1', description: 'Set Measurement Count', id: 24, timeout: 3000},
    {command: 'SENS:EMF:MEAS:COUN?', description: 'Check Measurement Count', id: 25, timeout: 3000},
    {command: 'SENS:EMF:AXIS:TIME 1 S', description: 'Set Axis Dwell Time', id: 26, timeout: 3000},
    {command: 'SENS:EMF:ICN?', description: 'Check if ICNIRP Limit Line is configured', id: 27, timeout: 3000},
    {command: 'SENS:EMF:ICN:STAT 1', description: 'Configure ICNIRP Limit Line if not configured', id: 28, timeout: 3000},
    {command: 'SENS:EMF:ICN:STAT?', description: 'Check status of updated ICNIRP config', id: 29, timeout: 3000},
    {command: 'SENS:EMF:RUN 1', description: 'Start Measurement', id: 30, timeout: 3000},
    {command: 'SENS:EMF:STAT 0', description: 'Disable EMF mode', id: 31, timeout: 3000},
  ])
  async function runCommand(command: {command: string, id: number, timeout: number}){
    if (loadingCommand.value) return;
    if(loading.value.has(command.id)) return;
    loading.value.add(command.id);
    try {
      toast.toastOriginal.promise(makeAuthenticatedRequest({ url: `api/v1/locations/sites/${props.location.id}/command`, method: 'POST', data: { command: command.command } }), {
        loading: `${props.location.name}: Sending Command - ${command.command}...`,
        success: (data: any) => {
          
          return data?.response?.message ? data.response.message : `Command Executed: ${props.location.name}`
        },
        error: (data: any) => {
          
          return data?.response?.message ? data.response.message : 'Error executing command'
        },
        finally: () => {
          loadingCommand.value = false
          loading.value.delete(command.id)
        }
      })
    } catch (error: any) {
      console.log({ error });
    }
  }
</script>

<template>
  <div>
    <v-card flat border tile class="my-2" :loading="loadingCommand">

      <v-list lines="two" density="compact">
        <v-list-item
        :disabled="loadingCommand"
        v-for="item in playlist"
        :title="item.command"
        :subtitle="item.description"
        :value="item.id"
        >
        <template v-slot:prepend>
          <v-btn :disabled="loadingCommand" :loading="loading.has(item.id)" icon @click="runCommand(item)"  size="small" class="mr-4">
            <v-icon size="36" >mdi-play</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
  </div>
</template>
