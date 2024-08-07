<script lang="ts" setup>
  import * as changeCase from 'change-case';
  import { CUSTOM_FIELD_TYPE, type DynamicCustomFieldType } from '~/types/Locations.types';
  import DynamicCustomField from './DynamicCustomField.vue';
  import { ref, defineModel, defineEmits } from 'vue';
  import { isNotEmpty } from '@neoncoder/validator-utils';
  import { toast } from '@neoncoder/vuetify-sonner';
  const dialog = ref(false);
  const props = defineProps({
    ipAddressError: {
      type: Boolean, 
      default: false,
    },
    portError: {
      type: Boolean,
      default: false,
    }
  })
  const ipAddress = defineModel('ipAddress');
  const port = defineModel('port');
  const additionalFields = ref<Array<{name: string, type: DynamicCustomFieldType}>>([])
  const addFieldName = ref('');
  const addFieldType = ref<DynamicCustomFieldType>('Text')
  function reset(){
    addFieldName.value = ''
    addFieldType.value = 'Text'
    dialog.value = false;
  }
  function addCustomField(){
    console.log({name: addFieldName.value, type: addFieldType.value});
    if(!isNotEmpty(addFieldName.value)){
      toast.error('Field Name is required')
      return;
    }
    if(additionalFields.value.some((el) => changeCase.camelCase(el.name) === changeCase.camelCase(addFieldName.value))){
      toast.error('This custom field already exists')
      return;
    }
    additionalFields.value.push({name: addFieldName.value, type: addFieldType.value})
    reset()
  }
  function deleteCustomField(e: any){
    console.log({e});
    additionalFields.value = additionalFields.value.filter(x => changeCase.camelCase(x.name) !== changeCase.camelCase(e.fieldName))
    emit('delete:customField', e)
  }
  const emit = defineEmits(['update:ipAddress', 'update:port', 'update:customField', 'delete:customField'])
</script>
<template>
  <div>
    <h4>Device Details</h4>
    <v-divider class="mb-2"></v-divider>
    <v-text-field v-model="ipAddress" :error="ipAddressError" @update:modelValue="(e: string) => emit('update:ipAddress', e)" class="mb-2" label="IP Address" variant="outlined" density="compact" hide-details></v-text-field>
    <v-text-field v-model="port" :error="portError" type="number" @update:modelValue="(e: number) => emit('update:port', e)" class="mb-2" label="Port" variant="outlined" density="compact" hide-details></v-text-field>
    <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title class="bg-primary text-white d-flex align-center"><p>Add Custom Field</p><v-spacer></v-spacer> <v-btn @click="reset" icon="mdi-close" size="small" variant="text"></v-btn></v-card-title>
        <v-card-text class="pb-0">
          <v-row>
            <v-col cols="8">
              <v-text-field @keyup.enter="addCustomField" v-model="addFieldName" variant="outlined" density="compact" autofocus hide-details placeholder="New Field">
                <template #label>
                  <p class="mb-0">
                    Field Name
                    <span class="text-error">*</span>
                  </p>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select variant="outlined" v-model="addFieldType" density="compact" hide-details :items="Object.keys(CUSTOM_FIELD_TYPE)">
                <template #label>
                  <p class="mb-0">
                    Field Type
                    <span class="text-error">*</span>
                  </p>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <small class="text-grey">* Data Preview. &nbsp;</small>
          <kbd>{ {{ changeCase.camelCase(addFieldName) }} : {{ addFieldType === 'Text' ? 'Text' : addFieldType === 'Number' ? 0 : true}} }</kbd>
        </v-card-text>

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
            @click="addCustomField"
            class="text-body-1 ml-4 pt-1"
            prepend-icon="mdi-plus"
            elevation-24
          >
            Add Field
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DynamicCustomField class="mb-2" v-for="(field, i) in additionalFields" :key="i" :field-type="field.type" :field-name="field.name" @update:field-value="(e) => emit('update:customField', e)" @delete:field-value="deleteCustomField"/>
    <v-btn @click="dialog = !dialog" prepend-icon="mdi-plus" size="small" color="warning" class="mb-2" variant="tonal" text="Add Extra Field"></v-btn>
    <!-- <v-divider class="mb-2"></v-divider> -->
  </div>
</template>
