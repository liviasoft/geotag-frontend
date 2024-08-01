<script lang="ts" setup>
  import * as changeCase from "change-case";
  import { watch } from "vue";
  import { useLocationStore } from '~/stores/locations'
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  const {locationTypes} = storeToRefs(useLocationStore())
  const locationTypeOptions = ref([])
  const locationTypeSelectInput = ref<any>(null)
  const compProps = defineProps({
    selectedLocationType: {
      type: Object,
      default: () => {}
    },
    error: {
      type: Boolean,
      default: false
    }
  })
  watch(() => compProps.selectedLocationType, (newValue) => {
    console.log('changed', newValue)
    if(!newValue) {
      locationTypeSelectInput.value.reset()
    }
  })
  const emit = defineEmits(['update:selectedLocationType'])
  // fetch(`${apiBaseUrl}/api/v1/settings/location-types`)
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log({json})
  //     const {data: {locationTypes: lTypes}} = json
  //     locationTypeOptions.value = lTypes
  //     // console.log({lTypes})
  //     // emit('update:locationTypes', lTypes)
  //   })

</script>

<template>
  <div>
    <v-select ref="locationTypeSelectInput" :error="error" placeholder="Select Location Type" :items="locationTypes" :value="compProps.selectedLocationType?.id" clearable return-object @update:modelValue="(e: string) => emit('update:selectedLocationType', e)" item-value="id" label="Location Type" variant="solo" single-line density="compact" hide-details class="mb-3">
      <template #item="{ props, item }">
        <v-list-item v-bind="props" :title="changeCase.capitalCase(item.raw.name)">
          <template #prepend>
            <v-avatar :image="item.raw.iconUrl" size="24px"></v-avatar>
          </template>
        </v-list-item>
      </template>
      <template #selection="{props, item}">
        <v-list-item density="compact" v-bind="props" :title="changeCase.capitalCase(item.raw.name)">
          <template #prepend>
            <v-avatar :image="item.raw.iconUrl" size="24px" class="ml-n4 mr-n2"></v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-select>
  </div>
</template>
