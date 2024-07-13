<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  const { globalLoader } = storeToRefs(useSideNavStore())
  const emit = defineEmits(['update:dialog'])
  // const props = defineProps({
  //   dialog: {
  //     type: Boolean,
  //     default: false,
  //   }
  // })
</script>

<template>
  <div class="pa-4 text-center">
    <v-btn
      :disabled="globalLoader"
      color="primary"
      icon="mdi-refresh"
      text="Start loading"
      @click="globalLoader = !globalLoader"
    ></v-btn>

    <v-dialog
      v-model="globalLoader"
      max-width="320"
      persistent
    >
      <v-list
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
      >
        <v-list-item
          prepend-icon="$vuetify-outline"
          title="Reloading Application..."
        >
          <template v-slot:prepend>
            <div class="pe-4">
              <v-icon color="primary" size="x-large"></v-icon>
            </div>
          </template>

          <template v-slot:append>
            <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
            ></v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-dialog>
  </div>
</template>
