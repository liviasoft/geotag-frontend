<script lang="ts" setup>
import type { SavedLocation } from '~/types/Locations.types';
import DeviceDetailsForm from './DeviceDetailsForm.vue';
import * as changeCase from 'change-case';
import { toast } from '@neoncoder/vuetify-sonner';

  const {makeAuthenticatedRequest} = useAuthStore();
  const emit = defineEmits(['update:dialog'])
  const props = defineProps({
    location: {
      type: Object as () => SavedLocation,
      required: true
    }
  })
  const dialog = ref(false)
  const loading = ref(false)
  const port = ref<number>(props.location.deviceData?.port || 9001)
  const ipAddress = ref<string>(props.location.deviceData?.ipAddress || '192.168.1.1')
  const deviceData = ref<{[key:string]: string | number | boolean}>({})
  watch([port, ipAddress], ([newPort, newIpAddress]) => {
    if(errors.value.port && newPort) errors.value.port = false
    if(errors.value.ipAddress && newIpAddress) errors.value.ipAddress = false
  })
  const errors = ref({
    ipAddress: false,
    port: false,
  })
  function updateDeviceCustomField(e: {[key: string]: string | number | boolean}){
    console.log({e})
    const field = changeCase.camelCase(e.fieldName as string)
    deviceData.value[field] = e.value
  }
  function deleteDeviceCustomField(e: {fieldName: string}){
    const field = changeCase.camelCase(e.fieldName as string)
    delete deviceData.value[field];
  }
  async function updateDeviceData(){
    if(!ipAddress.value){
      toast.error('Device IP address is required');
      errors.value.ipAddress = true
    }
    if(!port.value){
      toast.error('Device Port is required');
      errors.value.port = true
    }
    if (Object.values(errors.value).some(Boolean)){
      return;
    }
    const data = {
      deviceData: {
        ipAddress: ipAddress.value,
        port: port.value,
        ...deviceData.value,
      }
    }
    loading.value = true;
    toast.toastOriginal.promise(makeAuthenticatedRequest({url: `api/v1/locations/sites/${props.location.id}`, method: 'PATCH', data }), {
      loading: `${props.location.name}: Updating Device Data...`,
      success: (data: any) => {
        console.log({data})
        toast.success(data?.response?.message ? data.response.message : `Device updated successfully: ${props.location.name}`)
        return `Device updated successfully: ${props.location.name}`
      },
      error: (data: any) => {
        console.log({data})
        toast.error(data?.response?.message ? data.response.message : 'Connection Test failed')
        return `Error: ${data?.response?.message}`
      },
      finally: () => {
        loading.value = false
      }
    })
  }
  // async function reset(){

  // }
</script>

<template>
  <v-btn @click="dialog = true" tile variant="tonal" class="mr-2" icon><v-icon>mdi-pencil</v-icon></v-btn>
  <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        width="400"
      >
        <v-card-title class="d-flex align-center bg-primary">
          <p class="mb-0 d-inline-block text-truncate" :title="location.name" style="max-width: 400px;">{{
              location.name }}</p>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" variant="tonal" size="small" icon><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pb-2">
          <DeviceDetailsForm v-model:ip-address="ipAddress" v-model:port="port" @update:custom-field="updateDeviceCustomField" @delete:custom-field="deleteDeviceCustomField" :ip-address-error="errors.ipAddress" :port-error="errors.port" :device-data="location.deviceData || {}"  />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ms-auto px-4"
            :loading="loading"
            prepend-icon="mdi-content-save"
            text="Save"
            variant="tonal"
            color="primary"
            @click="updateDeviceData"
          ></v-btn>
        </v-card-actions>
        <v-overlay :model-value="loading"
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
</template>
