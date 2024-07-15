<script lang="ts" setup>
  import {ref, computed} from 'vue'
  import PhoneCodeSelect from '../../components/MapPage/PhoneCodeSelect.vue'
  import type { CountryCode } from '~/types/Locations.types';
  const items = ref<Array<string>>(['Email', 'Phone'])
  const tab = ref('Email')
  const countryCode = ref<CountryCode | undefined>(undefined)
  const phoneCode = computed(() => {
    return countryCode.value ? countryCode.value.phone_code : ''
  })
</script>

<template>
  <div>
    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
        :text="item"
        :value="item"
      ></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="item in items"
        :key="item"
        :value="item"
      >
        <v-card
          color="basil"
          flat
        >
          <!-- <v-card-text>{{ text }}{{ item }}</v-card-text> -->
          <div v-if="item=== 'Email'">
            <v-text-field density="compact" prependInnerIcon="mdi-email" label="Email" variant="outlined" class="pt-4"></v-text-field>
            
          </div>
          <div v-else>
            <v-row class="pa-0 pt-4">
              <v-col cols="4" class="flex-grow-1 flex-shrink-0 pr-0 pb-0">
                <!-- @update:selected-country-code="countryCodeSelected" :selected-country-code="countryCode" -->
                <PhoneCodeSelect v-model:selected-country-code="countryCode" />
              </v-col>
              <v-col cols="8" class="flex-shrink-1 flex-grow-0 pb-0">
                <v-text-field placeholder="08012345678" type="text" class="mb-2" label="Phone Number" variant="outlined" density="compact"></v-text-field>
              </v-col>
              <!-- v-model="phone" @keydown.enter="addNewContact" -->
            </v-row>
          </div>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
    <v-text-field density="compact" prependInnerIcon="mdi-account" label="Username" type="text" variant="outlined"></v-text-field>
    <v-text-field density="compact" prependInnerIcon="mdi-lock" label="Password" type="password" variant="outlined"></v-text-field>
    <v-btn block color="secondary">Sign up</v-btn>
    <!-- <div class="d-flex align-center mt-3">
      <p class="font-weight-bold text-primary"><v-icon size="small">mdi-arrow-left-drop-circle</v-icon> Back</p>
      <v-spacer></v-spacer>
      <NuxtLink to="/auth/forgot-password" style="text-decoration: none;">
        <p class="font-weight-bold text-primary">Forgot Password</p>
      </NuxtLink>
    </div> -->
    <div class="d-flex align-center my-3">
      <v-divider></v-divider>
      <p class="px-4">OR</p>
      <v-divider></v-divider>
    </div>
    <NuxtLink to="/auth/login" style="text-decoration: none;">
      <v-btn block color="primary" class="mt-4">Sign In</v-btn>
    </NuxtLink>
  </div>
</template>