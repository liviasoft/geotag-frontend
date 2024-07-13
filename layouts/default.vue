<script setup>
  import { useSideNavStore } from '~/stores/sidenav';
  import { storeToRefs } from 'pinia';
  import { useDisplay } from 'vuetify';
  const {mobile} = useDisplay();
  const navStore = useSideNavStore()
  const { mainNav } = storeToRefs(navStore)
  const { toggle } = navStore
</script>

<template>
  <v-app>
    <v-navigation-drawer :disable-resize-watcher="true" :disable-route-watcher="true" v-model="mainNav">
       <!--  -->
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="toggle('mainNav')"></v-app-bar-nav-icon>
      <v-spacer v-if="mobile" ></v-spacer>
      <v-app-bar-title>Liviasoft App</v-app-bar-title>
      <v-spacer></v-spacer>
      <p v-if="!mobile">API Base URL: {{ $config.public.API_BASE_URL }}</p>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
