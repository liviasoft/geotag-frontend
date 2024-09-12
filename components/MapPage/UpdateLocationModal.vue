<script lang="ts" setup>
  import type { City, LocationContact, SavedLocation } from '~/types/Locations.types';
  import ClosestCitySelect from './ClosestCitySelect.vue';
  import ContactDetailsSelect from './ContactDetailsSelect.vue';
  import L from 'leaflet';
  import { toast } from '@neoncoder/vuetify-sonner';
  import { isNotEmpty } from '@neoncoder/validator-utils';
  import { useAuthStore } from '~/stores/auth';
  const props = defineProps({
    location: {
      type: Object as () => SavedLocation,
      required: true,
    }
  })
  const emit = defineEmits(['update:details'])
  const { makeAuthenticatedRequest } = useAuthStore()
  const dialog = ref(false)
  const loading = ref(false)
  const name = ref(props.location.name)
  const address = ref(props.location.address)
  const latitude = ref(props.location.latitude)
  const longitude = ref(props.location.longitude)
  const description = ref(props.location.description)
  const selectedContacts = ref<Array<LocationContact>>(props.location.contacts || [])
  const contacts = computed(() => selectedContacts.value.map(x => x.id));
  const nearbyCity = ref<City | undefined>(props.location.city || undefined)
  function createMarkerIcon({ url, type }: { url?: string, type?: string }) {
    return L.icon({
      iconUrl: url ? url : `icon/${type}.png`,
      iconSize: [32, 32],
    })
  }
  function mapClick({latlng}: {latlng: { lat: number, lng: number }}){
    // console.log({e});
    const {lat, lng} = latlng;
    latitude.value = lat
    longitude.value = lng
  }
  const errors = ref({
    name: false,
    latitude: false,
    longitude: false,
  })
  function reset(){
    loading.value = false
    name.value = props.location.name
    address.value = props.location.address
    latitude.value = props.location.latitude
    longitude.value = props.location.longitude
    description.value = props.location.description
    selectedContacts.value = props.location.contacts || []
    nearbyCity.value = props.location.city || undefined
    errors.value = {
      name: false,
      latitude: false,
      longitude: false,
    }
  }

  async function updateLocationDetails(){
    if(loading.value) return;
    if(!isNotEmpty(name.value)){
      toast.error('Location Name is required');
      errors.value.name = true;
    }
    if (Object.values(errors.value).some(Boolean)){
      return;
    }
    const data = {
      latitude: latitude.value,
      longitude: longitude.value,
      address: address.value,
      name: name.value,
      description: description.value,
      city: nearbyCity.value,
      contacts: contacts.value,
    }
    loading.value = true;
    toast.toastOriginal.promise(makeAuthenticatedRequest({ url: `api/v1/locations/sites/${props.location.id}`, method: 'PATCH', data }), {
      loading: `${props.location.name}: Updating Location...`,
      success: (data: any) => {
        
        emit('update:details', data.response.data.location.id);
        dialog.value = false;
        return data?.response?.message ? data.response.message : `${props.location.name}: Location Updated`
      },
      error: (data: any) => {
        
        return data?.response?.message ? data.response.message : 'Error updating location'
      },
      finally: () => {
        loading.value = false
      }
    })
  }
</script>

<template>
  <div class="text-center pa-0">
    <v-btn @click="dialog = true" tile prepend-icon="mdi-pencil" variant="tonal" color="info" class="text-capitalize">Update Details</v-btn>
    <v-dialog
      v-model="dialog"
      width="auto"
      persistent
    >
     <v-card>
      <div class="d-flex align-start" tile>
      <div style="width: 400px; height: 400px">
        <!-- :zoom="mapZoom" @mouseMove="mouseMove" :style="{ 'z-index': 1, position: 'relative', cursor: 'inherit' }" -->
        <!-- ref="map" @ready="onMapReady" :center="mapCenter" @contextmenu="show" @click="mapClick" -->
        <LMap @click="mapClick" :zoom="15" :center="[latitude, longitude]" >
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base" name="OpenStreetMap" />
            <LMarker :lat-lng="[latitude, longitude]" :icon="createMarkerIcon({ url: location.locationTypeData?.iconUrl })">
              <LTooltip> {{ name }} </LTooltip>
            </LMarker>
        </LMap>
      </div>
      <v-card
        width="400"
        height="400"
        tile
      >
      <v-card-title class="d-flex align-center bg-primary">
        <v-icon class="mr-2" size="small">mdi-update</v-icon>
        Update Location Details
        <v-spacer></v-spacer>
        <v-btn @click="() => {
          reset()
          dialog = false
        }" icon="mdi-close" variant="tonal" size="x-small"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="max-height: 298px; overflow-y: scroll;">
        <v-text-field v-model="name" class="mb-2" tile variant="outlined" hide-details density="compact"  label="Name"></v-text-field>
        <v-text-field v-model="address" class="mb-2" tile variant="outlined" hide-details density="compact"  label="Address"></v-text-field>
        <v-text-field v-model="latitude" type="number" class="mb-2" tile variant="outlined" hide-details density="compact"  label="Latitude"></v-text-field>
        <v-text-field v-model="longitude" type="number" class="mb-2" tile variant="outlined" hide-details density="compact"  label="Longitude"></v-text-field>
        <v-textarea v-model="description" class="mb-2" rows="2" tile variant="outlined" hide-details density="compact"  label="Description"></v-textarea>
        <ClosestCitySelect :lat="Number(latitude)" :lng="Number(longitude)" v-model:selectedNearbyCity="nearbyCity"/>
        <ContactDetailsSelect v-model:selected-contacts="selectedContacts" />
      </v-card-text>
      <v-divider></v-divider>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn tile @click="updateLocationDetails" class="px-4 mx-2 text-capitalize" color="primary" text="save" prepend-icon="mdi-content-save" variant="tonal"></v-btn>
          <v-btn
            tile
            prepend-icon="mdi-close"
            class="ms-auto text-capitalize px-4"
            text="Cancel"
            variant="text"
            @click="() => {
              reset()
              dialog = false
            }"
          ></v-btn>
        </template>
      </v-card>
      </div>
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
