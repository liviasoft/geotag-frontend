<script lang="ts" setup>
import type { SavedLocation } from '../../types/Locations.types'
import * as changeCase from "change-case";
import { useUIStore } from '~/stores/ui';
import { GOLDEN_RATION } from '~/types/constants';
const { connectionStatusColor, connectionStatusIcon } = useUIStore()
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
const connectionStatus = props.location.connectionStatus ? props.location.connectionStatus : ref<'PENDING' | 'OK' | 'ERROR'>('PENDING')
const height = ref(122)
const width = computed(() => height.value * GOLDEN_RATION)
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
        <v-chip class="my-2 mx-1" size="small" label :color="connectionStatusColor(connectionStatus)" variant="tonal">
          <v-icon :icon="connectionStatusIcon(connectionStatus)" start></v-icon>
          {{ connectionStatus }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn @click.stop="() => {}" icon="mdi-restore" size="x-small" variant="text"></v-btn>
      </div>
      <!-- <v-scale-transition>
        <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
      </v-scale-transition> -->
    </div>
  </v-card>
</template>
