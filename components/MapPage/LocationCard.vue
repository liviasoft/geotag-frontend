<script lang="ts" setup>
import { toast } from '@neoncoder/vuetify-sonner';
import type { SavedLocation } from '../../types/Locations.types'
import * as changeCase from "change-case";
import { useUIStore } from '~/stores/ui';
import { useLocationStore } from '~/stores/locations';
import { useAuthStore } from '~/stores/auth';
import { GOLDEN_RATION } from '~/types/constants';
const { connectionStatusColor, connectionStatusIcon } = useUIStore()
const {toggleConnectionTestLoadingState} = useLocationStore()
const {makeAuthenticatedRequest} = useAuthStore()
const props = defineProps({
  isSelected: {
    type: Boolean,
    required: true,
  },
  location: {
    type: Object as () => SavedLocation,
    required: true
  }
})
const height = ref(122)
const width = computed(() => height.value * GOLDEN_RATION)
async function testDeviceConnection(){
  if (props.location.connectionTestLoading) return;
  toggleConnectionTestLoadingState(props.location.id, true)
  const url = `api/v1/locations/sites/${props.location.id}/test-connection`
  toast.toastOriginal.promise(makeAuthenticatedRequest({ url }), {
    loading: `${props.location.name}: Testing Device Connection...`,
    success: (data: any) => {
      console.log({data})
      toast.success(data?.response?.message ? data.response.message : 'Connection Test successful')
      toggleConnectionTestLoadingState(props.location.id, false)
      return `Connection Test Successful`
    },
    error: (data: any) => {
      toast.error(data?.response?.message ? data.response.message : 'Connection Test failed')
      console.log({data})
      toggleConnectionTestLoadingState(props.location.id, false)
      return `Error: ${data?.response?.message}`
    }
  })
}
</script>
<template>
  <v-card border
    :style="{ transition: 'all 0.3s ease', transform: isSelected ? 'scale(1.05)' : 'scale(1)', borderColor: isSelected ? 'steelblue' : '' }"
    class="mx-2 my-0 d-flex align-start" :class="isSelected ? 'elevated-light': ''" :flat="!isSelected" :height="height" :width="width + height">
    <div :style="{ width: `${height}px`, borderRight: '1px solid #eee' }">
      <v-img :width="height" aspect-ratio="1" cover :src="location.imageUrl ? location.imageUrl : '/images/no-image.png'"></v-img>
    </div>
    <div :style="{ borderLeft: `1px solid ${isSelected ? 'steelblue' : 'lightgrey'}`, height: '100%', width: '100%' }">
      <div class="px-2 pt-1 pb-1">
        <p :title="location.name" class="d-inline-block text-truncate font-weight-medium pb-0 mb-n2"
          :style="{ maxWidth: `${width - 20}px` }">{{ location.name }}</p>
        <v-card-subtitle :title="`${location.city?.name}, ${location.city?.state_name}`"
          class="pa-0 text-truncate text-caption" :style="{ maxWidth: `${width - 20}px` }">{{ location.city?.name }}, {{
            location.city?.state_name }}</v-card-subtitle>
      </div>
      <v-divider :color="isSelected ? 'primary': ''"></v-divider>
      <v-chip class="mx-2 mt-2" :color="isSelected ? 'primary' : ''" label size="small">
        <v-avatar :image="location.locationTypeData?.iconUrl" start></v-avatar>
        {{ changeCase.capitalCase(location.locationTypeData?.name || '') }}
      </v-chip>
      <div class="d-flex align-center px-2" v-if="location.deviceData">
        <span class="text-medium-emphasis">
          Status 
        </span> 
        <v-chip v-if="location.connectionStatus" class="my-2 mx-1" size="small" label :color="connectionStatusColor(location.connectionTestLoading ? 'PENDING': location.connectionStatus)" variant="tonal">
          <v-icon :icon="connectionStatusIcon(location.connectionTestLoading ? 'PENDING': location.connectionStatus)" start></v-icon>
          {{ location.connectionTestLoading ? 'PENDING': location.connectionStatus }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-tooltip text="Run Connection Test">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :loading="location.connectionTestLoading" @click.stop="testDeviceConnection" icon="mdi-restore" size="x-small" variant="text"></v-btn>
          </template>
        </v-tooltip>
      </div>
      <!-- <v-scale-transition>
        <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
      </v-scale-transition> -->
    </div>
  </v-card>
</template>
