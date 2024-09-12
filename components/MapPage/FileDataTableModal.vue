<script lang="ts" setup>
import type { Trace } from '~/types/Locations.types';

  const dialog = ref(false)
  const props = defineProps({
    trace: {
      type: Object as () => Trace,
      required: true,
    }
  })
</script>

<template>
  <div class="text-center pa-0">
    <!-- <v-btn tile @click="dialog = true" prepend-icon="mdi-camera" variant="tonal" color="green" class="text-capitalize mx-4">Update Image</v-btn> -->
    <v-btn @click.stop="dialog = true" icon variant="text" size="small"><v-icon>mdi-table</v-icon></v-btn>
    <v-dialog
      v-model="dialog"
      width="auto"
      scrollable
    >
      <v-card
        width="60vw"
        tile
        
      >
        <v-card-title class="bg-primary d-flex align-center">
          <v-icon class="mr-4">mdi-table</v-icon>
          Trace Data - <strong>{{ trace.name }}</strong>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false" variant="tonal" size="x-small"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table density="compact" :items="trace.points"></v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
