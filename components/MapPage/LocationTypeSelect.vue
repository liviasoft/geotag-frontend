<script lang="ts" setup>
  import * as changeCase from "change-case";
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  const locationTypeOptions = ref([])
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
  const emit = defineEmits(['update:selectedLocationType'])
  fetch(`${apiBaseUrl}/api/v1/settings/location-types`)
    .then(response => response.json())
    .then(json => {
      console.log({json})
      const {data: {locationTypes: lTypes}} = json
      locationTypeOptions.value = lTypes
      // console.log({lTypes})
      // emit('update:locationTypes', lTypes)
    })

</script>

<template>
  <div>
    <v-select :error="error" :items="locationTypeOptions" clearable return-object @update:modelValue="(e: string) => emit('update:selectedLocationType', e)" item-value="id" label="Location Type" variant="solo" single-line density="compact" hide-details class="mb-2">
      <template #item="{ props, item }">
        <v-list-item v-bind="props" :title="changeCase.capitalCase(item.raw.name)">
          <template #prepend>
            <v-avatar :image="item.raw.iconUrl" size="24px"></v-avatar>
          </template>
        </v-list-item>
      </template>
      <template #selection="{props, item}">
        <v-list-item v-bind="props" :title="changeCase.capitalCase(item.raw.name)">
          <template #prepend>
            <v-avatar :image="item.raw.iconUrl" size="24px" class="ml-n4 mr-n2"></v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-select>
  </div>
</template>
