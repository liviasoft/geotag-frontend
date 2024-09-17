<script lang="ts" setup>
import * as changeCase from "change-case";
import { useDisplay } from 'vuetify';
import type { SavedLocation } from '~/types/Locations.types';
import { dateFormatter } from '@neoncoder/validator-utils';
import { useUIStore } from "~/stores/ui";
import { useLocationStore } from "~/stores/locations";
import UpdateLocationModal from "./UpdateLocationModal.vue";
import UpdateImageModal from "./UpdateImageModal.vue";
const { connectionStatusColor, connectionStatusIcon } = useUIStore()
const {fetchLocationDetails, updateSavedLocation} = useLocationStore()
const props = defineProps({
  location: {
    type: Object as () => SavedLocation,
    required: true,
  },
  isFullscreen: {
    type: Boolean,
    default: false,
  }
})
const componentKey = ref(0)
const { mdAndUp } = useDisplay();
const emit = defineEmits(['updated:basic-info'])
const updateLocationDetails = async (e: any) => {
  
  try {
    const {response} = await fetchLocationDetails(e)
    const {data: {location}} = response
    console.log({ location });
    updateSavedLocation(location.id, location)
    emit('updated:basic-info')
    componentKey.value++
  } catch (error: any) {
    console.log({error});
  }
}
</script>

<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col :cols="mdAndUp && isFullscreen ? 6 : 10" >
        <v-card class="elevated" variant="text">
          <v-img :aspect-ratio="1.618" cover
            :src="location.imageUrl ? location.imageUrl : '/images/no-image.png'"></v-img>
        </v-card>
      </v-col>
      <v-col :cols="mdAndUp && isFullscreen ? 6 : 10">
        <div>
          <div class="d-flex align-center mt-0 mb-4">
            <v-chip tile color="primary" label size="large">
              <v-avatar :image="location.locationTypeData?.iconUrl" start tile></v-avatar>
              {{ changeCase.capitalCase(location.locationTypeData?.name || '') }}
            </v-chip>
            <v-chip tile v-if="location.connectionStatus" class="mx-4" label
              :color="connectionStatusColor(location.connectionTestLoading ? 'PENDING' : location.connectionStatus)"
              variant="tonal" size="large">
              <v-icon
                :icon="connectionStatusIcon(location.connectionTestLoading ? 'PENDING' : location.connectionStatus)"
                start></v-icon>
              {{ location.connectionTestLoading ? 'PENDING' : location.connectionStatus === 'ERROR' ? 'OFFLINE' : location.connectionStatus }}
            </v-chip>
          </div>
          <p class="text-h5"><span class="text-disabled">Site:</span> {{ location.name }}</p>
          <v-divider class="my-2"></v-divider>
          <p class="text-h6 my-1"><span class="text-disabled">Address:</span> {{ location.address }}</p>
          <p class="text-h6 my-1"><span class="text-disabled">Description:</span> {{ location.description }}
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
          <div v-if="location.city">
            <p class="text-h6 my-1"><span class="text-disabled">City:</span> {{ location.city.name }}</p>
            <p class="text-h6 my-1"><span class="text-disabled">State:</span> {{ location.city.state_name }}</p>
            <p class="text-h6 my-1"><span class="text-disabled">Country:</span> {{ location.city.country_name }}</p>
          </div>
          <p class="text-h6 my-1"><span class="text-disabled">Added By:</span></p>
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center bg-grey-lighten-3">
              <v-icon size="x-small">mdi-account</v-icon>
              <p v-if="location.addedByData?.username" class="text-body-2">{{ location.addedByData.username }}</p>
              <p v-if="location.addedByData?.email" class="text-body-2 text-disabled">&nbsp;- {{ location.addedByData.email }}</p>
              <p v-if="location.addedByData?.phone" class="text-body-2 text-disabled">&nbsp;- {{ location.addedByData.phone }}</p>
            </v-card-title>
          </v-card>
          <div>
            <p><span class="text-h6 text-disabled">Contact Information:</span></p>
            <div v-if="location.contacts?.length" :key="componentKey">
              <v-card v-for="contact in location.contacts" :key="contact.id" class="my-2">
                <v-card-title class="d-flex align-center bg-grey-lighten-3">
                  <v-icon size="x-small">mdi-account</v-icon>
                  <p v-if="contact.name" class="text-body-2">{{ contact.name }}</p>
                  <p v-if="contact.email" class="text-body-2 text-disabled">&nbsp;- {{ contact.email }}</p>
                  <p v-if="contact.phone" class="text-body-2 text-disabled">&nbsp;- {{ contact.phone }}</p>
                </v-card-title>
              </v-card>
            </div>
            <v-alert v-else type="info" variant="tonal">
              No Contacts related to this location
            </v-alert>
          </div>
        </div>
        <v-divider class="mt-4"></v-divider>
        <div class="d-flex align-center mt-4">
          <v-spacer></v-spacer>
          <UpdateImageModal @update:image="updateLocationDetails" :location-id="location.id" :location-name="location.name" />
          <UpdateLocationModal @update:details="updateLocationDetails" :location="location" />
          <!-- <v-btn tile prepend-icon="mdi-pencil" variant="tonal" color="info" class="text-capitalize">Update Details</v-btn> -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
