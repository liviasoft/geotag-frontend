<script lang="ts" setup>
  import { VSonner } from '@neoncoder/vuetify-sonner'
  import '@neoncoder/vuetify-sonner/style.css'
  import GlobalLoader from './components/Shared/GlobalLoader.vue';
</script>

<template>
  <div>
    <VSonner position="bottom-left" :visible-toasts="5":expand="true" />
    <NuxtLayout>
      <NuxtPage />
      <!-- <NuxtWelcome /> -->
    </NuxtLayout>
    <GlobalLoader />
  </div>
</template>
