<script lang="ts" setup>
  import LazyPhoneCodeSelect from './PhoneCodeSelect.vue';
  import {ref, computed} from 'vue';
  import type { CountryCode } from '~/types/Locations.types';

  const authStore = useAuthStore();

  const countryCode = ref<CountryCode | undefined>(undefined)
  const dialog = ref(false);
  const loading = ref(false);
  const address = ref('')
  const name = ref('');
  const email = ref('');
  const phoneCode = computed(() => {
    return countryCode.value ? countryCode.value.iso2 : ''
  })
  const phone = ref('');
  const emit = defineEmits(['update:contactCreated'])
  const errors = ref({
    email: '',
    phone: '',
  })
  function reset(){
      address.value = ''
      name.value = ''
      email.value = ''
      phone.value = ''
      dialog.value = false;
      countryCode.value = undefined
      errors.value = {
        email: '',
        phone: ''
      }
  }
  async function addNewContact(){
    if(loading.value) return;
    console.log({address, name, email, phoneCode, dialog, phone});
    const data = {
      address: address.value,
      email: email.value,
      phone: phone.value,
      name: name.value,
      phoneCode: phoneCode.value,
    }
    console.log({data})
    try {
      loading.value = true;
      const {response} = await authStore.makeAuthenticatedRequest({url: 'api/v1/settings/contacts', method: 'POST', data})
      console.log({response});
      if(!response.success) {
        if (response.error?.email) errors.value.email = response.error.email
        if (response.error?.phone) errors.value.phone = response.error.phone
      } else {
        reset()
        emit('update:contactCreated')
        dialog.value = false;
      }
    } catch (error: any) {
      console.log({error});
    } finally {
      loading.value = false
    }
  }

  function countryCodeSelected(e: any){
    countryCode.value = e;
    console.log({e});
  }
</script>

<template>
  <v-dialog max-width="500" v-model="dialog">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn v-bind="activatorProps" text="Add New Contact"
      variant="tonal" prepend-icon="mdi-plus" size="small" color="warning" class="mb-2"></v-btn>
   
  </template>

  <template v-slot:default>
    <v-card>
      <v-card-title class="bg-primary text-white d-flex align-center"><v-icon class="mr-2">mdi-account-box</v-icon><p>Add New Contact</p><v-spacer></v-spacer> <v-btn @click="reset" icon="mdi-close" size="small" variant="text"></v-btn></v-card-title>
      <v-card-text class="pb-0">
        <v-text-field @keydown.enter="addNewContact" v-model="name" autofocus placeholder="John Doe" class="mb-2" label="Contact Name" variant="outlined" density="compact" hide-details></v-text-field>
        <v-text-field @keydown.enter="addNewContact" :error="Boolean(errors.email)" @focus="errors.email = ''" v-model="email" placeholder="personorcompany@example.com" type="email" class="mb-2" label="Email" variant="outlined" density="compact" hide-details></v-text-field>
        <v-text-field @keydown.enter="addNewContact" v-model="address" placeholder="Floor No, Building No, Street, District" type="text" class="mb-2" label="Street Address" variant="outlined" density="compact" hide-details></v-text-field>
        <v-row>
          <v-col cols="4" class="flex-grow-1 flex-shrink-0 pr-0">
            <LazyPhoneCodeSelect @update:selected-country-code="countryCodeSelected" :selected-country-code="countryCode" />
          </v-col>
          <v-col cols="8" class="flex-shrink-1 flex-grow-0">
            <v-text-field v-model="phone" :error="Boolean(errors.phone)" @focus="errors.phone=''" @keydown.enter="addNewContact" placeholder="08012345678" type="text" class="mb-2" label="Phone Number" variant="outlined" density="compact" hide-details></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="error"
            variant="text"
            class="text-body-1 pt-1"
            @click="reset"
            prepend-icon="mdi-close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="addNewContact"
            class="text-body-1 ml-4 pt-1"
            prepend-icon="mdi-plus"
            elevation-24
          >
            Add Contact
          </v-btn>
      </v-card-actions>
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
    </v-card>
  </template>
</v-dialog>
</template>
