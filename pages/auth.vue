<script setup>
  import { useDisplay } from 'vuetify';
  definePageMeta({
    layout: 'blank'
  })
  const {smAndDown} = useDisplay();
</script>

<template>
  <div>
    <div style="width: 100vw; height: 100vh; display: flex">
      <div v-if="!smAndDown"style="flex: 7; z-index: 1; background-color: white;">
        <v-parallax height="100vh" src="/images/HomeBannerBackground.webp"></v-parallax>
      </div>
      <div style="flex: 4; border-left: 1px solid grey; z-index: 0;">
        <ClientOnly>
          <v-card height="100vh">
            <v-container>
              <v-row>
                <v-col cols="12" class="px-10">
                  <div class="d-flex justify-center text-center mt-4 pt-16 mb-4" style="width: 100%;">
                    <v-img max-width="250px" src="/images/liviasoftfulllogo.png"></v-img>
                  </div>
                  <NuxtPage />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>