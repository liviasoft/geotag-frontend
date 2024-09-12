<script lang="ts" setup>
  import { defineModel } from 'vue';
  import type { DynamicCustomFieldType } from '~/types/Locations.types';
  import { CUSTOM_FIELD_TYPE } from '~/types/Locations.types';
  const fieldValue = defineModel('fieldValue');
  const props = defineProps({
    fieldName: {
      type: String,
      required: true
    },
    fieldType: {
      type: String as () => DynamicCustomFieldType,
      default: CUSTOM_FIELD_TYPE.Text
    },
    startValue: {
      type: [String, Boolean, Number],
      default: null,
    }
  })
  const emit = defineEmits([`update:fieldValue`, 'delete:fieldValue'])
  onMounted(() => {
    console.log({fieldName: props.fieldName, fieldType: props.fieldType, startValue: props.startValue})
    if(props.startValue){
      emit('update:fieldValue', {fieldName: props.fieldName, value: props.startValue})
      // fieldValue.value = props.startValue
    }
  })
</script>

<template>
  <div class="d-flex align-center">
    <v-text-field tile :value="startValue" variant="outlined" density="compact" hide-details v-if="fieldType === 'Text'" :label="props.fieldName" @update:modelValue="(e: string) => emit('update:fieldValue', {fieldName, value: e})"></v-text-field>
    <v-text-field tile :value="startValue" variant="outlined" density="compact" hide-details type="number" v-else-if="fieldType === 'Number'" :label="props.fieldName" @update:modelValue="(e: number) => emit('update:fieldValue', {fieldName, value: e})"></v-text-field>
    <v-switch
      density="compact"
      color="primary"
      v-else-if="fieldType === 'Switch'"
      :value="startValue"
      :label="`Switch: ${fieldName.toString()}`"
      @update:modelValue="(e: boolean) => emit('update:fieldValue', {fieldName, value: e})"
      hide-details
      inset
    ></v-switch>
    <v-tooltip location="left" text="Delete Field">
      <template #activator="{ props }">
        <v-btn v-bind="props" icon="mdi-close" variant="text" size="small" @click="() => emit('delete:fieldValue', {fieldName})">
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

