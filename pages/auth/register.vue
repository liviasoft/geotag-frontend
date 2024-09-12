<script lang="ts" setup>
  import {ref, computed} from 'vue'
  import PhoneCodeSelect from '../../components/MapPage/PhoneCodeSelect.vue'
  import { isValidEmail } from '@neoncoder/validator-utils';
  import type { CountryCode } from '~/types/Locations.types';
  import { toast } from '@neoncoder/vuetify-sonner';

  const config = useRuntimeConfig();
  const dialog = ref(false);
  const apiBaseUrl = config.public.API_BASE_URL;

  const items = ref<Array<string>>(['Email', 'Phone'])
  const tab = ref('Email')
  const countryCode = ref<CountryCode | undefined>(undefined)
  const phoneCode = computed(() => {
    return countryCode.value ? countryCode.value.iso2 : ''
  })
  const email = ref('')
  const phone = ref('')
  const username = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const loading = ref(false)
  const errors = ref({
    email: '',
    phone: '',
    username: '',
    password: '',
    phoneCode: ''
  })
  function reset(){
    email.value = ''
    phone.value = ''
    username.value = ''
    password.value = ''
    showPassword.value = false
  }
  const successMessages = ref<Array<string>>([])
  function clearMessages(){
    setTimeout(() => {
      errors.value = {
        email: '',
        phone: '',
        username: '',
        password: '',
        phoneCode: ''
      }
      successMessages.value = []
    }, 5000);
  }
  async function signup(){
    if(loading.value) return;
    const data = {
      phoneCode: phoneCode.value,
      email: email.value,
      username: username.value,
      password: password.value,
      phone: phone.value
    }
    ;
    const invalidPassword = !data.password
    const invalidUsername = !data.username
    const invalidEmail = (!data.email || !isValidEmail(data.email)) && tab.value === 'Email'
    const invalidPhone = !data.phone && tab.value === 'Phone'

    if(invalidPassword)  errors.value.password = 'Invalid Password';
    if(invalidUsername) errors.value.username = 'Invalid Username';
    if(invalidEmail) errors.value.email = 'Invalid Email';
    if(invalidPhone) errors.value.phone = 'Phone Number is required';
    console.log({errors})
    if(invalidUsername || invalidPassword || (invalidEmail && tab.value === 'EMAIL') || (invalidPhone && tab.value === 'PHONE')) {
      toast.error('Invalid Signup data')
      return;
    }
    try {
      loading.value = true
      let url: string = ''
      if(tab.value === 'Email') {
        url = new URL(`${apiBaseUrl}/api/v1/auth/signup/email`).href
      } else {
        url = new URL(`${apiBaseUrl}/api/v1/auth/signup/phone`).href
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await res.json()
      if(response.success){
        toast.success(response.message)
        successMessages.value.push('Signup Successful - Please sign in')
        await navigateTo(`/auth/login?new=true&method=${tab.value}`)
        reset()
        clearMessages()
      } else {
        toast.error(response.message)
        if(response.error){
          errors.value.email = response.error.email
          errors.value.phone = response.error.phone
          errors.value.username = response.error.username
          errors.value.phoneCode = response.error.phoneCode
        }
      }
    } catch (error: any) {
      console.log({error});
      const {response} = error
      if(response){
        toast.error(response.message)
        if(response.error){
          errors.value.email = response.error.email
          errors.value.phone = response.error.phone
          errors.value.username = response.error.username
          errors.value.phoneCode = response.error.phoneCode
        }
      } else {
        toast.error(error.message)
      }
    } finally {
      loading.value = false
      console.log({ errors: errors.value})
    }
  }
</script>

<template>
  <div>
    <p class="text-center text-h6 my-8">Sign up for an account</p>
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
            <v-text-field tile v-model="email" @keyup.enter="signup" :error="Boolean(errors.email)" @focus="errors.email = ''" placeholder="your.email@example.com" density="compact" prependInnerIcon="mdi-email" label="Email" variant="outlined" class="pt-4"></v-text-field>
          </div>
          <div v-else>
            <v-row class="pa-0 pt-4">
              <v-col cols="4" class="flex-grow-1 flex-shrink-0 pr-0 pb-0">
                <!-- @update:selected-country-code="countryCodeSelected" :selected-country-code="countryCode" -->
                <PhoneCodeSelect v-model:selected-country-code="countryCode" />
              </v-col>
              <v-col cols="8" class="flex-shrink-1 flex-grow-0 pb-0">
                <v-text-field tile v-model="phone" @keyup.enter="signup" :error="Boolean(errors.phone)" @focus="errors.phone = ''" placeholder="08012345678" type="text" class="mb-2" label="Phone Number" variant="outlined" density="compact"></v-text-field>
              </v-col>
              <!-- v-model="phone" @keydown.enter="addNewContact" -->
            </v-row>
          </div>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
    <v-text-field tile v-model="username" @keyup.enter="signup" :error="Boolean(errors.username)" @focus="errors.username = ''" placeholder="your.username" density="compact" prependInnerIcon="mdi-account" label="Username" type="text" variant="outlined"></v-text-field>
    <v-text-field tile v-model="password" @keyup.enter="signup" :error="Boolean(errors.password)" @focus="errors.password = ''" placeholder="S5cReT_pA$$w0Rd" density="compact" prependInnerIcon="mdi-lock" label="Password" :type="showPassword ? 'text': 'password'" variant="outlined">
      <template v-slot:append-inner>
        <v-icon style="cursor: pointer" @click="() => showPassword = !showPassword">mdi-eye{{ !showPassword ? '': '-off'  }}</v-icon>
      </template>
    </v-text-field>
    <v-btn tile block color="secondary" @click="signup" :loading="loading" prepend-icon="mdi-account-plus" >Sign up</v-btn>
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
      <v-btn tile block color="primary" class="mt-4" prepend-icon="mdi-login">Sign In</v-btn>
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