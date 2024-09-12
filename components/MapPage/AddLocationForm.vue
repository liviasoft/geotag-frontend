<script lang="ts" setup>
  import { ref } from 'vue';
  import * as changeCase from 'change-case';
  import LatLngFields from './LatLngFields.vue';
  import LocationTypeSelect from './LocationTypeSelect.vue';
  import ClosestCitySelect from './ClosestCitySelect.vue';
  import DeviceDetailsForm from './DeviceDetailsForm.vue';
  import type { LocationContact, NearbyCity } from '~/types/Locations.types';
  import ContactDetailsSelect from './ContactDetailsSelect.vue';
  import { toast } from '@neoncoder/vuetify-sonner';
  import { isValidUrl } from '@neoncoder/validator-utils';

  const authStore = useAuthStore();

  const props = defineProps({
    locationType: {
      type: Object,
      // default: () => ({})
    },
    location: {
      type: Object,
      default: () => ({
        lat: 0,
        lng: 0
      })
    }
  })
  const port = ref<number>(9001)
  const ipAddress = ref<string>('192.168.1.1')
  const useRemoteConnection = ref(false)
  const remoteHTTPUrl = ref('')
  const remoteTCPUrl = ref('')
  const deviceData = ref<{[key:string]: string | number | boolean}>({})
  watch([port, ipAddress], ([newPort, newIpAddress]) => {
    if(errors.value.port && newPort) errors.value.port = false
    if(errors.value.ipAddress && newIpAddress) errors.value.ipAddress = false
  })
  const nearbyCity = ref<NearbyCity | undefined>(undefined)
  const name = ref('')
  const address = ref('')
  const description = ref('')
  const errors = ref({
    name: false,
    locationType: false,
    ipAddress: false,
    port: false,
    remoteHTTPUrl: '',
    remoteTCPUrl: '',
  })
  const selectedContacts = ref<Array<LocationContact>>([])
  const contacts = computed(() => selectedContacts.value.map(x => x.id));
  const locationIsDevice = computed(() => {
    if(!props.locationType) return false;
    if(!props.locationType.name) return false;
    if (props.locationType.name.includes('DEVICE')) return true;
    return false;
  })
  function latlngUpdate(e: {lat: number, lng: number}){
    emit('update:location', e)
    console.log({e});
  }
  function locationTypeUpdate(e: any){
    emit('update:locationType', e)
    errors.value.locationType = false;
    console.log({e});
  }
  function updateDeviceCustomField(e: {[key: string]: string | number | boolean}){
    console.log({e})
    const field = changeCase.camelCase(e.fieldName as string)
    deviceData.value[field] = e.value
  }
  function deleteDeviceCustomField(e: {fieldName: string}){
    const field = changeCase.camelCase(e.fieldName as string)
    delete deviceData.value[field];
  }
  const emit = defineEmits(['update:location', 'update:locationType', 'update:locationCreated', 'cancel'])
  const loading = ref(false);
  function reset(){
    name.value = ''
    address.value = ''
    port.value = 9001
    ipAddress.value = '192.168.1.1'
    description.value = ''
    deviceData.value = {}
    selectedContacts.value = []
    emit('update:locationType', undefined)
  }
  async function addLocation(){
    if(loading.value) return;
    
    const {lat: latitude, lng: longitude} = props.location
    const locationType = props.locationType?.id
    if(locationIsDevice.value){
      deviceData.value.ipAddress = ipAddress.value;
      deviceData.value.port = port.value;
    }
    const data = {
      latitude,
      longitude,
      locationType,
      name: name.value,
      description: description.value,
      city: nearbyCity.value,
      contacts: contacts.value,
      deviceData: locationIsDevice.value ? deviceData.value : undefined,
      connectionStatus: locationIsDevice.value ? 'PENDING' : undefined,
      useRemoteConnection: useRemoteConnection.value,
      remoteHTTPUrl: remoteHTTPUrl.value,
      remoteTCPUrl: remoteTCPUrl.value,
    }
    
    if(!locationType){
      toast.error('Location Type is required');
      errors.value.locationType = true;
      return;
    }
    if(!name.value){
      toast.error('Location Name is required');
      errors.value.name = true;
    }
    if(locationIsDevice.value){
      if(!ipAddress.value){
        toast.error('Device IP address is required');
        errors.value.ipAddress = true
      }
      if(!port.value){
        toast.error('Device Port is required');
        errors.value.port = true
      }
    }
    if (useRemoteConnection.value){
      if(!isValidUrl(remoteHTTPUrl.value)){
        toast.error('Invalid Remote HTTP Url');
        errors.value.remoteHTTPUrl = 'Invalid URL'
      }
      if(!isValidUrl(remoteTCPUrl.value)){
        toast.error('Invalid Remote TCP Url');
        errors.value.remoteTCPUrl = 'Invalid URL'
      }
    }
    if (Object.values(errors.value).some(Boolean)){
      return;
    }
    try {
      loading.value = true;
      const {response} = await authStore.makeAuthenticatedRequest({url: 'api/v1/locations/sites', method: 'POST', data})
      const {success} = response
      if(success){
        reset()
        emit('update:locationCreated')
      }
    } catch (error: any) {
      console.log({error})
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <v-card tile elevation=0 max-height="100%">
    <v-card-title class="bg-primary text-white d-flex align-center">
      <v-icon size="20" class="mr-2">mdi-map-marker</v-icon>
      Add New Location
      <v-spacer></v-spacer>
      <v-btn size="x-small" class="ml-4" @click="emit('cancel')" icon variant="text"><v-icon>mdi-close</v-icon></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="max-height: calc(98vh - 164px); overflow-y: scroll; min-height: calc(80vh - 164px);">
      <h4>Location info</h4>
      <v-divider class="mb-3"></v-divider>
      <LocationTypeSelect @update:selectedLocationType="locationTypeUpdate" :error="errors.locationType" :selected-location-type="locationType" />
      <LatLngFields :location="location" @update:latlng="latlngUpdate"/>
      <h4>Basic Details</h4>
      <v-divider class="mb-3"></v-divider>
      <v-text-field tile hint="Name should end with an alphabet" :error="errors.name" v-model.trim="name" @keydown.enter="addLocation" @input="() => { if (errors.name) errors.name = false }" autofocus placeholder="e.g. Site 001-ABC" density="compact" variant="outlined" hide-details class="mb-2">
        <template #label>
          <p class="mb-0">Name <span class="text-error">*</span></p>
        </template>
      </v-text-field>
      <ClosestCitySelect :lat="location.lat" :lng="location.lng" v-model:selectedNearbyCity="nearbyCity"/>
      <v-text-field tile v-model="address" @keydown.enter="addLocation" hide-details class="mb-2" density="compact" placeholder="House No, Street, District" variant="outlined" :rows="1">
        <template #label>
          <p class="mb-0">Address <small>(optional)</small></p>
        </template>
      </v-text-field>
      <v-text-field tile v-model="description" @keydown.enter="addLocation" hide-details class="mb-2" density="compact" placeholder="Any additional details" variant="outlined" :rows="1">
        <template #label>
          <p class="mb-0">Description <small>(optional)</small></p>
        </template>
      </v-text-field>
      <v-expand-transition>
        <div v-show="locationIsDevice">
          <DeviceDetailsForm v-model:ip-address="ipAddress" v-model:port="port" @update:custom-field="updateDeviceCustomField" @delete:custom-field="deleteDeviceCustomField" :ip-address-error="errors.ipAddress" :port-error="errors.port" />
          <v-switch v-model="useRemoteConnection" color="primary" hide-details label="Use Remote URLs"></v-switch>
          <v-text-field tile v-model="remoteHTTPUrl" @keydown.enter="addLocation" class="mb-2" hide-details :error="Boolean(errors.remoteHTTPUrl)" @focus="errors.remoteHTTPUrl = ''" variant="outlined" density="compact" label="Remote HTTP" placeholder="http://device-domain.com"></v-text-field>
          <v-text-field tile v-model="remoteTCPUrl" @keydown.enter="addLocation" hide-details :error="Boolean(errors.remoteTCPUrl)" @focus="errors.remoteTCPUrl = ''" variant="outlined" density="compact" label="Remote TCP" placeholder="tcp://device-tcp:port"></v-text-field>
        </div>
      </v-expand-transition>
      <ContactDetailsSelect v-model:selected-contacts="selectedContacts" />
    </v-card-text>
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
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn tile :loading="loading" :disabled="loading" block variant="elevated" color="primary" @click="addLocation"><v-icon left class="mr-2">mdi-content-save</v-icon> Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
