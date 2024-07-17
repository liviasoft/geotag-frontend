<script lang="ts" setup>
  import {ref, computed} from 'vue'
  import PhoneCodeSelect from '../../components/MapPage/PhoneCodeSelect.vue'
  import type { CountryCode } from '~/types/Locations.types';
  import { toast } from '@neoncoder/vuetify-sonner';
  import { isValidEmail } from '@neoncoder/validator-utils';
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  const items = ref<Array<string>>(['Email', 'Phone'])
  const tab = ref('Email')
  const successMessages = ref<Array<string>>([])
  const errors = ref({
    emailOrUsername: '',
    password: '',
    phone: '',
  })
  const {query} = useRoute()
  console.log({query})
  if(query.new){
    toast.success('Signup Successful, please login')
    successMessages.value.push('Signup Successful, please login')
    clearMessages(5000)
    if(query.method) {
      tab.value = query.method as string
    }
  }
  const countryCode = ref<CountryCode | undefined>(undefined)
  const phoneCode = computed(() => {
    return countryCode.value ? countryCode.value.phone_code : ''
  })
  const emailOrUsername = ref('')
  const password = ref('')
  const phone = ref('')
  const showPassword = ref(false)
  const loading = ref(false)
  function reset(){
    emailOrUsername.value = ''
    phone.value = ''
    password.value = ''
    showPassword.value = false
  }
  function clearMessages(timeout = 5000){
    setTimeout(() => {
      errors.value = {
        emailOrUsername: '',
        phone: '',
        password: ''
      }
      successMessages.value = []
      countryCode.value = undefined
    }, timeout);
  }
  async function signin(){
    if(loading.value) return;
    const data = {
      email: emailOrUsername.value,
      username: emailOrUsername.value,
      phone: phone.value,
      phoneCode: phoneCode.value,
      password: password.value
    }
    let url = ''
    if (tab.value === 'Email') {
      if(isValidEmail(data.email)){
        url = new URL(`${apiBaseUrl}/api/v1/auth/login/email`).href
      } else {
        url = new URL(`${apiBaseUrl}/api/v1/auth/login/username`).href
      }
    } else {
      url = new URL(`${apiBaseUrl}/api/v1/auth/login/phone`).href
    }
    console.log({data})
    try {
      loading.value = true;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await res.json()
      console.log({response});
      if(response.success){
        toast.success(response.message)
        successMessages.value.push('Login Successful - Welcome back')
        // await navigateTo('/auth/login?new=true')
        reset()
        clearMessages()
      } else {
        toast.error(response.message)
        if(response.error){
          errors.value.emailOrUsername = response.error.email
          errors.value.phone = response.error.phone
          errors.value.emailOrUsername = response.error.username
          errors.value.password = response.error.password
        }
      }
    } catch (error: any) {
      console.log({error});
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div>
    <p class="text-center text-h6 my-8">Sign in to your account</p>
    <v-expand-transition group>
      <div v-for="(value, key, index) in errors" class="mt-2" :key="index">
        <v-alert v-if="value" type="error" variant="tonal" density="compact" border="start" ><span class="text-capitalize font-weight-bold">{{ key }}:</span> {{ value }}</v-alert>
      </div>
    </v-expand-transition>
    <v-expand-transition group>
      <div v-for="(message, i) in successMessages" class="mt-2" :key="i">
        <v-alert v-if="message" type="success" variant="tonal" density="compact" border="start" ><span class="text-capitalize font-weight-bold">Success :</span> {{ message }}</v-alert>
      </div>
    </v-expand-transition>
    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
        :text="item === 'Email' ? 'Email / Username': item"
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
            <v-text-field v-model="emailOrUsername" @keyup.enter="signin" :error="Boolean(errors.emailOrUsername)" @focus="errors.emailOrUsername = ''" placeholder="your.email@example.com" density="compact" prependInnerIcon="mdi-account" label="Email or Username" variant="outlined" class="pt-4"></v-text-field>
          </div>
          <div v-else>
            <v-row class="pa-0 pt-4">
              <v-col cols="4" class="flex-grow-1 flex-shrink-0 pr-0 pb-0">
                <!-- @update:selected-country-code="countryCodeSelected" :selected-country-code="countryCode" -->
                <PhoneCodeSelect v-model:selected-country-code="countryCode" />
              </v-col>
              <v-col cols="8" class="flex-shrink-1 flex-grow-0 pb-0">
                <v-text-field v-model="phone" @keyup.enter="signin" :error="Boolean(errors.phone)" @focus="errors.phone = ''" placeholder="08012345678" type="text" class="mb-2" label="Phone Number" variant="outlined" density="compact"></v-text-field>
              </v-col>
              <!-- v-model="phone" @keydown.enter="addNewContact" -->
            </v-row>
          </div>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
    <v-text-field v-model="password" @keyup.enter="signin" :error="Boolean(errors.password)" @focus="errors.password = ''" placeholder="S5cReT_pA$$w0Rd" density="compact" prependInnerIcon="mdi-lock" label="Password" :type="showPassword ? 'text': 'password'" variant="outlined">
      <template v-slot:append-inner>
        <v-icon style="cursor: pointer" @click="() => showPassword = !showPassword">mdi-eye{{ !showPassword ? '': '-off'  }}</v-icon>
      </template>
    </v-text-field>
    <v-btn block color="primary" @click="signin" :loading="loading" prependIcon="mdi-login">Sign In</v-btn>
    <div class="d-flex align-center mt-3">
      <p class="font-weight-bold text-primary"><v-icon size="small">mdi-arrow-left-drop-circle</v-icon> Back</p>
      <v-spacer></v-spacer>
      <NuxtLink to="/auth/forgot-password" style="text-decoration: none;">
        <p class="font-weight-bold text-primary">Forgot Password</p>
      </NuxtLink>
    </div>
    <div class="d-flex align-center my-3">
      <v-divider></v-divider>
      <p class="px-4">OR</p>
      <v-divider></v-divider>
    </div>
    <NuxtLink to="/auth/register" style="text-decoration: none;">
      <v-btn block color="secondary" class="mt-4" prepend-icon="mdi-account-plus" >Create An Account</v-btn>
    </NuxtLink>
    <v-overlay
    :model-value="loading"
    scrim="blue"
    class="align-center justify-center"
    contained
    >
      <v-progress-circular
      color="primary"
      size="64"
      indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>