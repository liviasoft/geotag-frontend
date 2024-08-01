<script lang="ts" setup>
  import LocationSettings from './LocationSettings.vue';
  const emit = defineEmits(['update:selectedCity', 'update:selectedState', 'update:selectedCountry'])
</script>

<template>
  <v-card tile elevation=0 max-height="100%">
    <v-card-title class="bg-secondary text-white d-flex align-center">
      <v-icon size="20" class="mr-2">mdi-cog</v-icon>
      Settings</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <LocationSettings
        @update:selected-city="(e) => emit('update:selectedCity', e)"
        @update:selected-state="(e) => emit('update:selectedState', e)"
        @update:selected-country="(e) => emit('update:selectedCountry', e)" 
      />
    </v-card-text>
    <div>
      <!-- <h2>Map Settings</h2> -->
    </div>
  </v-card>
</template>
