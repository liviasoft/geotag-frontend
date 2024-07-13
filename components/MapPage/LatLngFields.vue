<script lang="ts" setup>
const props = defineProps({
  location: {
    type: Object,
    default: () => ({
      lat: 0,
      lng: 0
    })
  }
})

const emit = defineEmits(['update:latlng'])
</script>

<template>
  <div>
    <v-text-field density="compact" type="number" v-model="location.lat" :step="1 / (10 ** 4)"
      @update:modelValue="(e: number) => emit('update:latlng', { lat: Number(e), lng: Number(location.lng) })" hideDetails
      label="latitude" variant="outlined" class="mb-2"></v-text-field>
    <v-text-field density="compact" type="number" v-model="location.lng" :step="1 / (10 ** 4)"
      @update:modelValue="(e: number) => emit('update:latlng', { lat: Number(location.lat), lng: Number(e) })" hideDetails
      label="longitude" variant="outlined" class="mb-2"></v-text-field>
  </div>
</template>
