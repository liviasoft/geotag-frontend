<script setup>
  import { ref } from 'vue'

  const drawer = ref(false)
</script>

<template>
  <v-app>
    <!-- <v-navigation-drawer :disable-resize-watcher="true" :disable-route-watcher="true" v-model="drawer">
      
    </v-navigation-drawer> -->
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Liviasoft App</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer location="right" :disable-resize-watcher="true" :disable-route-watcher="true" v-model="drawer">
      <!--  -->
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
