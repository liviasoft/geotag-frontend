<script lang="ts" setup>
import { toast } from '@neoncoder/vuetify-sonner';
import type { DeviceCommand } from '~/types/Locations.types';
import { useDeviceStore } from '~/stores/devices'
  const { addDeviceCommand, updateDeviceCommand, getDeviceCommands } = useDeviceStore()
  const emit = defineEmits(['update:commandAdded', 'update:commandUpdated', 'update:update', 'update:dialog'])
  const props = defineProps({
    selectedDeviceCommand: {
      type: Object as () => DeviceCommand | null,
      default: null
    },
  })
  const dialog = defineModel('dialog', {default: false})
  const update = defineModel('update', {default: false})
  const modalTitle = computed(() => {
    if(update.value) return 'Update Command'
    return 'Add Command'
  })
  const commandType = ref('Command')
  const description = ref('')
  const command = ref('')
  const title = ref('')
  const parameters = ref<string | null | undefined>('')
  const queryReturn = ref<string | null | undefined>('')
  const defaultUnit = ref<string | null | undefined>('')
  const defaultValue = ref<string | null | undefined>('')
  const range = ref<string | null | undefined>('')
  const loading = ref(false)
  const keep = ref(false)
  const errors = ref({
    commandType: '',
    description: '',
    command: '',
    title: '',
  })
  watch(dialog, (newValue) => {
    if(newValue && update.value && props.selectedDeviceCommand){
      commandType.value = props.selectedDeviceCommand.commandType
      description.value = props.selectedDeviceCommand.description
      command.value = props.selectedDeviceCommand.command
      title.value = props.selectedDeviceCommand.title
      parameters.value = props.selectedDeviceCommand.parameters
      queryReturn.value = props.selectedDeviceCommand.queryReturn
      defaultUnit.value = props.selectedDeviceCommand.defaultUnit
      defaultValue.value = props.selectedDeviceCommand.defaultValue
      range.value = props.selectedDeviceCommand.range
    }
  })
  function reset(){
    commandType.value = 'Command'
    description.value = ''
    command.value = ''
    title.value = ''
    parameters.value = ''
    queryReturn.value = ''
    defaultUnit.value =''
    defaultValue.value = ''
    range.value = ''
    errors.value = {
      commandType: '',
      description: '',
      command: '',
      title: '',
    }
  }

  function save(){
    if(loading.value) return;
    const sendData = {
      commandType : commandType.value,
      description : description.value,
      command : command.value,
      title : title.value,
      parameters : parameters.value,
      queryReturn : queryReturn.value,
      defaultUnit : defaultUnit.value,
      defaultValue : defaultValue.value,
      range : range.value,
    }
    loading.value = true;
    toast.toastOriginal.promise(update.value ? updateDeviceCommand({id: props.selectedDeviceCommand?.id, ...sendData}) : addDeviceCommand(sendData), {
      loading: `${update.value ? 'Updating': 'Adding'} Device Command...`,
      success: (data: any) => {
        
        if(!update.value && !keep.value) {
          reset()
        }
        if(update.value){
          emit('update:commandUpdated')
        } else {
          emit('update:commandAdded')
        }
        return `Device Command ${update.value ? 'Updated': 'Added'}`
      },
      error: (data: any) => {
        
        const {response, error, message} = data
        if(response?.error){
          errors.value.command = response.error.command
          errors.value.commandType = response.error.commandType
          errors.value.title = response.error.title
          errors.value.description = response.error.description
        }
        return `Error: ${response ? data?.response?.message : error?.message ? error.message : message}`
      },
      finally: () => {
        loading.value = false
      }
    })
  }

  function openNew(){
    if(update.value) {
      emit('update:update', false)
    }
    emit('update:dialog', true)
  }
  function close(){
    reset();
    emit('update:dialog', false)
  }
</script>
<template>
  <v-btn @click="openNew"
    tile
    block
    prepend-icon="mdi-plus"
    color="warning"
    size="small"
    class="mt-2"
    text="Add Command"
    variant="tonal"
  >
    
  </v-btn>
  <v-dialog scrollable
  persistent max-width="500" v-model="dialog" @keydown.esc="close">

  <template v-slot:default>
    <v-card max-height="600">
      <v-card-title class="bg-primary d-flex align-center">
        <p class="mb-0">{{ modalTitle }}</p>
        <v-spacer></v-spacer>
        <v-btn @click="close" variant="tonal" size="small" icon="mdi-close"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field tile label="Command"
            v-model="command"
            @keydown.enter="save"
            :error="Boolean(errors.command)"
            @focus="errors.command = ''"
            density="compact" variant="outlined" prepend-inner-icon="mdi-console-line"></v-text-field>
            <v-text-field tile label="Title" 
            v-model="title"
            @keydown.enter="save"
            :error="Boolean(errors.title)"
            @focus="errors.title = ''"
            density="compact" variant="outlined" prepend-inner-icon="mdi-pen">
            </v-text-field>
            <v-textarea hide-details
            v-model="description"
            @keydown.enter.exact.prevent="save"
            :error="Boolean(errors.description)"
            @focus="errors.description = ''"
            density="compact" label="Description"
            variant="outlined"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-select v-model="commandType"
            @keydown.enter="save"
            :error="Boolean(errors.commandType)"
            @focus="errors.commandType = ''"
            density="compact" 
            hide-details variant="outlined" label="Type" :items="['Command', 'Query']"></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field tile v-model="parameters" density="compact" 
            hide-details
            @keydown.enter="save"
            variant="outlined" label="Parameters"
            >
            </v-text-field>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="6" class="py-2">
            <v-text-field tile label="Query Return" density="compact" 
            v-model="queryReturn"
            @keydown.enter="save"
            hide-details
            variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-2">
            <v-text-field tile label="Default Value" density="compact"
            v-model="defaultValue" 
            @keydown.enter="save"
            hide-details
            variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field tile label="Default Unit" density="compact"
            v-model="defaultUnit"
            @keydown.enter="save"
            hide-details
            variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field tile label="Range" density="compact"
            v-model="range"
            @keydown.enter="save"
            hide-details
            variant="outlined"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="py-0 pl-4">
        <v-switch label="keep" inset color="success" hide-details v-model="keep"></v-switch>
        <v-spacer></v-spacer>
        <v-btn 
        tile
        @click="close"
        prepend-icon="mdi-close" color="error" variant="text" class="px-4">Cancel</v-btn>
        <v-btn
          tile
          text="Save"
          class="px-4"
          color="primary"
          variant="tonal"
          @click="save"
          prepend-icon="mdi-content-save"
        ></v-btn>
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
