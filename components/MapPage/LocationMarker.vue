<script lang="ts" setup>
  import L from 'leaflet';
import { ref } from 'vue';
import type { SavedLocation } from '~/types/Locations.types';
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
    }
  })
  const dialog = ref(false)
  function openDialog(){
    dialog.value = true
  }
  function createMarkerIcon({url, type}: {url?: string, type?: string}) {
    return L.icon({
      iconUrl: url ? url : `icon/${type}.png`,
      iconSize: [32, 32],
    })
  }
</script>
<template>
  <div>
    <LMarker @click="openDialog" :icon="createMarkerIcon({url: location.locationTypeData?.iconUrl})" :lat-lng="[lat, lng]">
      <LTooltip> {{ location.name }} </LTooltip>
    </LMarker>
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:default="{ isActive }">
        <v-card title="Dialog">
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn
            text="Close Dialog"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
      </template>
    </v-dialog>
  </div>
</template>