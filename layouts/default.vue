<script setup>
  import { useSideNavStore } from '~/stores/sidenav';
  import { storeToRefs } from 'pinia';
  import { useDisplay } from 'vuetify';
  const {mobile} = useDisplay();
  const navStore = useSideNavStore()
  const { user } = storeToRefs(useAuthStore());
  const { mainNav } = storeToRefs(navStore)
  const { toggle } = navStore
  const items = ref([
    { title: 'Account Settings', value: 1, icon: 'mdi-account-cog', appendIcon: 'mdi-open-in-new'},
    // { title: 'Another Title', value: 2, icon: 'mdi-account'},
    // { title: 'The third', value: 3, icon: 'mdi-account'},
    // { title: 'The fourth', value: 4, icon: 'mdi-account'},
  ])
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
      <v-btn v-if="user" class="mx-2" icon><v-icon>mdi-bell</v-icon></v-btn>
      <NuxtLink v-if="!user"to="/auth/login" style="text-decoration: none;">
        <v-btn
        class="text-none mx-2 mr-4"
        color="medium-emphasis"
        variant="outlined"
        rounded
        >
        <v-icon size="large" class="ml-n2 mr-1">mdi-account-circle-outline</v-icon>
        Sign In
      </v-btn>
    </NuxtLink>
    <v-menu
      offset-x="0"
      offset-y="0"
      v-else
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="mr-4" icon><v-avatar :image="user?.avatarUrl ? user.avatarUrl : '/images/default.jpeg'"></v-avatar></v-btn>
      </template>
      <v-card rounded="lg" class="mx-auto" min-width="250">
        <v-list>
          <v-list-item
            :prepend-avatar="user?.avatarUrl ? user.avatarUrl : '/images/default.jpeg'"
            
            :subtitle="`${user.email ? user.email : user.phone}`"
            :title="user.username"
          >
            <template v-slot:append>
              <!-- :class="fav ? 'text-red' : ''" -->
              <v-btn
                icon="mdi-cog"
                variant="text"
                @click="fav = !fav"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <!-- <v-card-title>
          Content
        </v-card-title> -->
        <v-card-text class="pa-0">
          <v-list class="py-0">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :prepend-icon="item.icon"
              :title="item.title"
              :value="item.value"
              :append-icon="item.appendIcon"
            >
          
          </v-list-item>
            <!-- <v-list :items="items">
            
            </v-list> -->
          </v-list>
          <!-- <pre>{{ items }}</pre> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="text-none" large block><v-icon>mdi-logout</v-icon> Logout</v-btn>
        </v-card-actions>
      </v-card> 
      <!-- <p v-if="!mobile">API Base URL: {{ $config.public.API_BASE_URL }}</p> -->
    </v-menu>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
