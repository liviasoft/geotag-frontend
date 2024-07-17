<template>
  <v-img
    src="/images/HomeBannerBackground.webp"
    cover
    height="100vh"
    gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.6)"
  >
    <!-- Content centered vertically and horizontally -->
    <v-row
      class="fill-height ma-0"
      align="top"
      justify="center"
    >
      <v-col cols="12" sm="8" md="6">
        <!-- Title text -->
        <h1 class="text-h3 text-white text-center mb-4 mt-16">LiviaSoft EMF</h1>
        <!-- Search bar -->
        <v-card tile :loading="loading" class="pa-0 d-flex align-center text-center" height="48px" elevation-0>
          <!-- <pre>{{ items }}</pre> -->
          <v-card-text class="pa-0 d-flex align-center">
          <v-autocomplete
            appendInnerIcon="mdi-magnify"
            active
            prepend
            hideDetails
            autoSelectFirst
            flat
            density="comfortable"
            :menu="true"
            :menuProps="{persistent: true}"
            prependInnerIcon="mdi-map-marker"
            v-model:search="keyword"
            tile
            @update:modelValue="locationSelected"
            v-model="selectedLocation"
            @search="onInput"
            @input="onInput"
            returnObject
            :items="items"
            itemTitle="name"
            :loading="loading"
            @focus="() => query(keyword)"
            :close-on-content-click="false"
            itemValue="value"
            placeholder="Search cities, states, and countries"
            variant="solo"
            >
          <template v-slot:item="{ props, item }">
            <v-list-item
              density="compact"
              v-if="item"
              :disabled="!keyword"
              v-bind="props"
              :prepend-icon="getlocationTypeIcon(item.raw.type)"
              :subtitle="`${item.raw.type} &middot; ${item.raw.name}${item.raw.state ? ', ' + item.raw.state: ''}${item.raw.country? ', '+item.raw.country: ''}`"
              :title="`${item.raw.name} ${item.raw.count ? '('+item.raw.count+')': ''}`"
            ></v-list-item>
          </template>
        </v-autocomplete>
      </v-card-text>
          <v-alert v-if="error" type="error">{{ error }}</v-alert>
          
        </v-card>
      </v-col>
    </v-row>
  </v-img>
</template>
<script lang="ts" setup>
  import { useDebounceFn } from '@vueuse/core'
  // import { ServiceResponse } from '@neoncoder/typed-service-response'
  import { ref, watch } from 'vue';
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  type LocationSearchResult = {
    name: string,
    latitude: number,
    longitude: number,
  }
  const error = ref(null)
  const selectedLocation = ref<LocationSearchResult | null>(null);
  let controller = new AbortController();
  const keyword = ref('');
  const items = ref<any[]>([]);
  const loading = ref(false);
  const url = computed(() => {
    return new URL(`${apiBaseUrl}/api/v1/locations?q=${keyword.value}`).href
  })
  const query = async (_keyword: string) => {
    if (loading.value === true) controller.abort('Newer search parameters')
    const signal = controller.signal;
    loading.value = true;
    try {
      const res = await fetch(url.value, { signal })
      const data = await res.json()
      console.log({data})
      items.value = data as unknown as any[];
    } catch (error: any) {
      console.log({error});
    } finally {
      loading.value = false;
    }
  };

  const onInput = useDebounceFn(async () => {
    console.log(keyword.value)
    await query(keyword.value)
  }, 1000)
  function getlocationTypeIcon(locationType: string){
    switch (locationType) {
      case 'City':
        return 'mdi-city'
      case 'Country':
        return 'mdi-flag'
      case 'State': 
        return 'mdi-island'
      default:
        return 'mdi-map-marker'
    }
  }
  async function locationSelected(e: any){
    console.log({e})
    // await navigateTo({
    //   path: `/map?lat=${selectedLocation.value?.latitude}&lng=${selectedLocation.value?.longitude}`,
    //   query: {
    //     lat: selectedLocation.value?.latitude,
    //     lng: selectedLocation.value?.longitude,
    //   }
    // })
    await navigateTo(`/map?lat=${e.latitude}&lng=${e.longitude}`)
  }
// watch(keyword, (v) => {
//   // clearTimeout(timerId)
  
//     // useDebounceFn(() => {
//       useDebounceFn(() => query(v), 500);
//     // }, 1000)
 
// });
  // console.log({response: JSON.parse(data.value as unknown as string).data.results})
  // results.value = JSON.parse(data.value as unknown as string).data.results
  // if (data){
  //   const { data: { results: fetched}} = data.value as ServiceResponse<'results', Array<any>>
  //   results.value = fetched
  // }
  

</script>

