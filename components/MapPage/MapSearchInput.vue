<script lang="ts" setup>
    import { isNotEmpty } from '@neoncoder/validator-utils';
import { useDebounceFn } from '@vueuse/core'
  // import { ServiceResponse } from '@neoncoder/typed-service-response'
  import { ref, watch } from 'vue';
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  type LocationSearchResult = {
    name: string,
    latitude: number,
    longitude: number,
    type: string,
    value: string,
  }
  const emit = defineEmits(['update:search', 'clear:search'])
  const componentKey = ref(0);
  const selectedLocation = ref<LocationSearchResult | null>(null);
  let controller = new AbortController();
  const keyword = ref('');
  const items = ref<any[]>([]);
  const loading = ref(false);
  const url = (_keyword?: string) => {
    return new URL(`${apiBaseUrl}/api/v1/locations?q=${_keyword ?? keyword.value.trim()}`).href
  }
  const query = async (_keyword?: string) => {
    if (loading.value === true) controller.abort('Newer search parameters')
    const signal = controller.signal;
    loading.value = true;
    try {
      const res = await fetch(url(_keyword ?? keyword.value), { signal })
      const data = await res.json()
      
      items.value = data as unknown as any[];
    } catch (error: any) {
      console.log({error, controller});
    } finally {
      loading.value = false;
      controller = new AbortController()
      console.log({ controller })
      componentKey.value++
    }
  };

  const onSearch = useDebounceFn(async () => {
    
    await query(keyword.value)
    if(typeof selectedLocation.value === 'object'){
      emit('update:search', selectedLocation.value)
      // await navigateTo(`/map?lat=${selectedLocation.value?.latitude}&lng=${selectedLocation.value?.longitude}${selectedLocation.value?.type === 'Location' ? '&location='+selectedLocation.value?.value:''}`)
    }
  }, 1000)

  const onInput = useDebounceFn(async () => {
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

  onMounted(async () => {
    await query(keyword.value)
  })

</script>
<!-- @update:search="onSearch"
    @input="onInput" -->
<template>
  <v-combobox
    
    active
    prepend
    hideDetails
    flat
    density="comfortable"
    :menu="false"
    :menuProps="{persistent: true}"
    prependInnerIcon="mdi-map-marker"
    v-model:search="keyword"
    :key="componentKey"
    tile
    v-model="selectedLocation"
    @update:search="onSearch"
    returnObject
    :items="items"
    @keydown.enter="query(keyword)"
    itemTitle="name"
    :loading="loading"
    :close-on-content-click="false"
    itemValue="value"
    clearable
    :readonly="loading"
    placeholder="Search cities, states, and countries"
    variant="solo"
    @click:clear="() => {
      query('')
      emit('clear:search')
    }"
    >
    <!-- @focus="() => query(keyword)" -->
    <template v-slot:item="{ props, item }">
      <v-list-item
        density="compact"
        v-if="item"
        :disabled="!isNotEmpty(keyword)"
        v-bind="props"
        :prepend-icon="getlocationTypeIcon(item.raw.type)"
        :subtitle="`${item.raw.type} &middot; ${item.raw.name}${item.raw.state ? ', ' + item.raw.state: ''}${item.raw.country? ', '+item.raw.country: ''}`"
        :title="`${item.raw.name} ${item.raw.count ? '('+item.raw.count+')': ''}`"
      ></v-list-item>
    </template>
  </v-combobox>
  <v-btn @click="query(keyword)" :loading="loading" :disabled="loading" stacked style="height: 48px;" tile color="primary"><v-icon>mdi-magnify</v-icon></v-btn>
</template>
