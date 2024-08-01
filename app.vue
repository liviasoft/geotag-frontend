<script lang="ts" setup>
  import { VSonner } from '@neoncoder/vuetify-sonner'
  import '@neoncoder/vuetify-sonner/style.css'
  import GlobalLoader from './components/Shared/GlobalLoader.vue';

  const authStore = useAuthStore()
  onBeforeMount(async () => {
    await authStore.getUserIfLoggedIn()
  })
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

<style>
@import './assets/css/styles.css';
.page-enter-active,
.page-leave-active {
  animation: coming 0.4s;
  animation-delay: 0.3s;
  /* transition: all 0.4s; */
  opacity: 0;
}
.page-enter-from,
.page-leave-to {
  animation: going 0.3s;
  /* opacity: 0;
  filter: blur(1rem); */
}
.router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: 0.3s;
  opacity: 0;
}

.router-anim-leave-active {
  animation: going 0.3s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>

