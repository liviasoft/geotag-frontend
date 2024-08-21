<script lang="ts" setup>
import { dateFormatter } from '@neoncoder/validator-utils';
import { toast } from '@neoncoder/vuetify-sonner';
import { ref } from 'vue';
import type { MeasurementFile, SavedLocation } from '~/types/Locations.types';
import FileChartModal from './FileChartModal.vue';

const { makeAuthenticatedRequest } = useAuthStore();
const props = defineProps({
  location: {
    type: Object as () => SavedLocation,
    required: true
  },
  isFullscreen: {
    type: Boolean,
    default: false,
  }
})
const headers = ref([
  {align: 'start', 
    key: 'id',
    sortable: true,
    title: 'File ID'
  },
  {
    align: 'start',
    key: 'fileName',
    sortable: false,
    title: 'File Name',
  },
  { key: 'timeStamp', sortable: true, title: 'Date Captured' },
  { align: 'center', key: 'actions', title: 'Actions' }
  // { key: 'fat', title: 'Fat (g)' },
  // { key: 'carbs', title: 'Carbs (g)' },
  // { key: 'protein', title: 'Protein (g)' },
  // { key: 'iron', title: 'Iron (%)' },
])
const files = ref<MeasurementFile[]>([])
const loading = ref<Set<string>>(new Set([]))
const search = ref('')
const loadingList = ref(false)
async function getStoredMeasurementFiles() {
  if (loadingList.value) return;
  try {
    loadingList.value = true;
    const url = `api/v1/files/locations/${props.location.id}/measurement-files`
    const { response, error } = await makeAuthenticatedRequest({ url })
    console.log({ response, error })
    if (response.success) {
      files.value = response.data.measurementFiles
    }
  } catch (error: any) {
    console.log({ error })
    if(error.response){
      toast.error(error.response.message)
    } else {
      toast.error(error.message)
    }
  } finally {
    loadingList.value = false;
  }
}

async function processFile(fileId: string){
  if(loading.value.has(fileId)) return;
  console.log({fileId});
  loading.value.add(fileId)
  toast.toastOriginal.promise(makeAuthenticatedRequest({ url: `api/v1/files/locations/${props.location.id}/measurement-files/${fileId}`}), {
    loading: `${props.location.name}: Processing File...`,
    success: (data: any) => {
      console.log({data})
      toast.success(data.response.message);
      return `${data.response.message ? data.response.message : props.location.name + ': Done processing file'}`
    },
    error: (data: any) => {
      console.log({data})
      toast.error(data.response.message);
      const {response, error, message} = data
      return `Error: ${response ? data?.response?.message : error?.message ? error.message : message}`
    },
    finally: () => {
      loading.value.delete(fileId)
    }
  })
}

function downloadFile(file: any){
  const link = document.createElement('a')
  link.href = file.fileUrl
  link.download = file.fileName
  link.target = '_blank'
  link.click()
}
onMounted(() => {
  getStoredMeasurementFiles()
})
</script>

<template>
  <div>
    <div class="d-flex align-center mb-2 px-2">
      <p class="mb-0 font-weight-bold">Device Measurement Files</p>
      <v-spacer></v-spacer>
      <v-btn @click="getStoredMeasurementFiles" :loading="loadingList" variant="tonal" size="small">Refresh <v-icon>mdi-refresh</v-icon></v-btn>
    </div>
    <v-divider></v-divider>
    <v-data-table :loading="loadingList" loading-text="Fetching Files... Please wait" density="compact"
      :headers="headers" :items="files" :search="search">
      <template v-slot:header.fileName>
        <div class="text-start font-weight-bold">File Name</div>
      </template>
      <template v-slot:header.timeStamp>
        <div class="text-start font-weight-bold">Date Captured</div>
      </template>
      <template v-slot:header.actions>
        <div class="text-end font-weight-bold mr-8">Actions</div>
      </template>
      <template v-slot:item.timeStamp="{ item }">
        <span :class="{ 'text-truncate': !isFullscreen }" :title="dateFormatter({ dateLike: String(item.timeStamp) }) ?? ''"
          class="d-inline-block text-truncate" :style="{ maxWidth: isFullscreen ? 'auto' : '100px' }">{{
            dateFormatter({ dateLike: String(item.timeStamp)}) }}</span>
      </template>
      <template v-slot:item.fileName="{ item }">
        <p :title="item.fileName" :class="{ 'text-truncate': !isFullscreen }" class="d-inline-block mb-0"
          :style="{ maxWidth: isFullscreen ? 'auto' : '200px' }">{{ item.fileName }}</p>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-center justify-end my-n1">
          <v-tooltip text="View File Contents" location="top">
            <template v-slot:activator="{ props }">
              <v-btn @click="navigateTo(item.fileDeviceUrl, {
                external: true,
                open: {
                  target: '_blank',
                },
              })" v-bind="props" icon variant="text" size="small"><v-icon>mdi-open-in-new</v-icon></v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Download File" location="top">
            <template v-slot:activator="{ props }">
              <v-btn @click="downloadFile(item)" v-bind="props" icon variant="text" size="small"><v-icon>mdi-download</v-icon></v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Process File" location="top">
            <template v-slot:activator="{ props }">
              <v-btn v-if="!item._count.traces" :loading="loading.has(item.id)" :disabled="loading.has(item.id)" @click="processFile(item.id)" v-bind="props" icon variant="text" size="small"><v-icon>mdi-progress-wrench</v-icon> </v-btn>
              <v-btn v-else :loading="loading.has(item.id)" :disabled="loading.has(item.id)" color="success" @click="processFile(item.id)" v-bind="props" icon variant="text" size="small"><v-icon>mdi-progress-check</v-icon> </v-btn>
            </template>
          </v-tooltip>
          <FileChartModal :file="item" :location="location" />
          <!-- <v-tooltip text="View Measurement Chart" location="top">
            <template v-slot:activator="{ props }">

              <v-btn @click="" v-bind="props" icon variant="text" size="small"><v-icon>mdi-chart-bell-curve-cumulative</v-icon></v-btn>
            </template>
          </v-tooltip> -->
        </div>
      </template>
    </v-data-table>
  </div>
</template>
