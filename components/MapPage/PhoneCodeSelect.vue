<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import type { CountryCode } from '../../types/Locations.types'
  import CustomSkeletonLoaders from './CustomSkeletonLoaders.vue'
  // const selectedCountryCode = defineModel<CountryCode, 'selectedCountryCode'>('selectedCountryCode', {default: []})
  // const selectedCountryCode = ref<Array<CountryCode>>([])
  const previewSelectedCountryCode = ref<CountryCode | undefined>(undefined)
  const props = defineProps({
    selectedCountryCode: {
      type: Object as () => CountryCode | undefined,
      default: undefined
    },
    modalTitle: {
      type: String,
      default: 'Select Phone Code'
    }
  })
  const searchTerm = ref('')
  const config = useRuntimeConfig();
  const dialog = ref(false);
  const apiBaseUrl = config.public.API_BASE_URL;
  const loading = ref(false);
  const url = computed(() => {
    return new URL(`${apiBaseUrl}/api/v1/settings/country-codes`).href
  })
  const filteredCountryCodes = computed(() => {
    if (!searchTerm.value) return countryCodes.value
    return countryCodes.value.filter(x => x.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
  })
  const emit = defineEmits(['update:selectedCountryCode'])
  const countryCodes = ref<Array<CountryCode>>([])
  async function query(){
    if (loading.value) return;
    loading.value = true;
    try {
      const res = await fetch(url.value);
      const {data: {data}} = await res.json();
      countryCodes.value = data
      console.log({count: countryCodes.value.length})
      if(props.selectedCountryCode?.id) {
        previewSelectedCountryCode.value = countryCodes.value.find(({id}) => id === props.selectedCountryCode?.id)
      }
    } catch (error: any) {
      console.log({error});
    } finally {
      loading.value = false;
    }
  }
  watchDebounced(dialog, (newVal) => {
    console.log({newVal})
    if(newVal && !countryCodes.value.length) {
      query()
    } else {
      searchTerm.value = ''
      countryCodes.value = []
    }
  }, {debounce: 500})
  function selectCountryCode(cc: CountryCode){
    console.log({cc})
    previewSelectedCountryCode.value = cc
  }
  function confirmSelectedCountryCode(){
    emit('update:selectedCountryCode', previewSelectedCountryCode.value)
    dialog.value = false
  }
  // onMounted(() => {
  //   query();
  // })
</script>

<template>
    <v-dialog
      v-model="dialog"
      width="auto"
      scrollable
      persistent
    >
    <template v-slot:activator="{ props: activatorProps }">
      <!-- prepend-icon="mdi-check" -->
      <v-chip
        v-bind="activatorProps"
        class="mx-0 mt-1"
        link
        label
        append-icon="mdi-chevron-down"
      >
        <v-avatar start size="32px" tile>
          <v-img v-if="selectedCountryCode" :src="`/icons/flags/32x32/${selectedCountryCode?.iso2.toLowerCase()}.png`"></v-img>
          <v-icon left v-else>mdi-phone</v-icon>
        </v-avatar>

        <span v-if="selectedCountryCode">{{ selectedCountryCode?.iso3 }} ({{ selectedCountryCode?.phone_code?.charAt(0) === '+' ? '': '+' }}{{ selectedCountryCode?.phone_code }})</span>
        <span v-else> Phone Code</span>
      </v-chip>
    </template>
    <v-card
      width="400"
      min-height="500"
      max-height="500"
    >
      <v-card-title class="d-flex align-center bg-primary text-white">
        <v-icon size="small" class="mr-2">mdi-earth</v-icon> {{props.modalTitle}}
        <v-spacer></v-spacer>
        <v-btn size="small" @click="dialog = false" variant="tonal" icon="mdi-close"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title class="py-0 pt-0">
        <v-text-field v-model="searchTerm" :loading="loading" :disabled="loading" class="mt-n4"hide-details variant="plain" style="font-size: 64px;" single-line :placeholder="loading ? 'Loading. Please wait...' : 'Search'" autofocus prepend-inner-icon="mdi-magnify" clearable></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <div v-if="loading">
          <CustomSkeletonLoaders />
        </div>
        <div v-else>
          <div v-for="(cc) in filteredCountryCodes" :key="cc.id">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <div @click="selectCountryCode(cc)" bind="props" class="d-flex align-center px-6" :class="{'bg-red-lighten-5': isHovering}" style="cursor: pointer; transition: all 0.5s ease-in-out">
                  <v-avatar tile size="56px">
                    <v-img cover :aspect-ratio="1" :src="`/icons/flags/64x64/${cc.iso2.toLowerCase()}.png`">
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular
                            color="grey-lighten-4"
                            indeterminate
                          ></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                  </v-avatar>
                  <div class="px-4">
                    <p class="mb-n3 d-inline-block text-truncate" style="max-width: 250px;">{{ cc.name }} ({{ cc.phone_code.charAt(0) === '+' ? '': '+' }}{{ cc.phone_code }})</p><br/>
                    <small class="d-inline-block text-truncate text-disabled"
                      style="max-width: 250px;">{{ cc.iso3 }}, {{ cc.currency_name }} ({{ cc.currency_symbol }} - {{ cc.currency }})</small>
                  </div>
                </div>
              </template>
            </v-hover>
            <v-divider></v-divider>
          </div>
        </div>
        </v-card-text>
        
        <v-divider></v-divider>
        <v-card-actions class="px-4">
          <v-chip
            v-if="previewSelectedCountryCode?.iso2 && previewSelectedCountryCode.iso3 && previewSelectedCountryCode.phone_code"
            color="primary"
            label
          >
            <v-avatar start tile>
              <v-img v-if="previewSelectedCountryCode?.iso2 && previewSelectedCountryCode.iso3 && previewSelectedCountryCode.phone_code" :src="`/icons/flags/32x32/${previewSelectedCountryCode?.iso2.toLowerCase()}.png`"></v-img>
              <!-- <v-icon v-else>mdi-help</v-icon> -->
            </v-avatar>

            {{ previewSelectedCountryCode?.iso3 }} ({{ previewSelectedCountryCode?.phone_code?.charAt(0) === '+' ? '': '+' }}{{ previewSelectedCountryCode?.phone_code }})
          </v-chip>
          
          <v-spacer></v-spacer>
          <v-btn color="primary"
            variant="elevated"
            class="text-body-1 ml-4 pt-1"
            elevation-24 @click="confirmSelectedCountryCode">OK</v-btn>
        </v-card-actions>
        <!-- <v-overlay scrim="primary" :model-value="loading" class="align-center justify-center"
    contained>
    <v-progress-circular
    color="primary"
    size="64"
    indeterminate
    ></v-progress-circular>
        </v-overlay> -->
      </v-card>
    </v-dialog>
    <!-- <v-btn @click="dialog = !dialog"></v-btn> -->
</template>
