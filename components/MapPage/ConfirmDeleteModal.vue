<script lang="ts" setup>
  const props = defineProps({
    modalText: {
      type: String,
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    modalTitle: {
      type: String,
      default: 'Confirm'
    },
    btnProps: {
      type: Object,
      default: {
        text: 'Open Dialog',
        variant: 'tonal',
        color: 'error',
        prependIcon: 'mdi-delete',
        class: 'text-capitalize px-4'
      }
    }
  })
  const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <v-dialog max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      tile
      v-bind="activatorProps"
      :text="btnProps.text"
      :variant="btnProps.variant"
      :color="btnProps.color"
      :prepend-icon="btnProps.prependIcon"
      :class="btnProps.className ?? 'text-capitalize px-4'"
    ></v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card>
      <v-card-title class="bg-error d-flex align-center">
        <p class="mb-0">{{ modalTitle }}</p>
        <v-spacer></v-spacer>
        <v-btn tile @click="isActive.value = false" size="x-small" icon variant="tonal"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-html="modalText" class="py-2">
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          tile
          prepend-icon="mdi-check" 
          color="error" 
          variant="tonal" 
          class="text-capitalize px-4 mx-1" 
          text="Confirm" 
          @click="() => {
            emit('confirm');
            isActive.value = false
          }"
        ></v-btn>
        <v-btn
          tile
          prepend-icon="mdi-close"
          variant="text"
          class="text-capitalize px-4"
          text="Cancel"
          @click="() => {
            emit('cancel');
            isActive.value = false
          }
          "
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>
