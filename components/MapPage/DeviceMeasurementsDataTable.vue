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
const dateSearchMode = ref(false)
const timePeriodMode = ref('timePeriod')
const searchParameters = ref('')
const last = ref(2)
const period = ref('Weeks')
const fromDate = ref()
const fromTime = ref('00:00')
const fromDateMenu = ref(false)
const toDate = ref()
const toDateMenu = ref(false)
const toTime = ref('00:00')
const loadingList = ref(false)
const timePeriods = ref(['Minutes', 'Hours', 'Days', 'Weeks', 'Months'])

async function fetchSearchResults(){
  if(loadingList.value) return;
  console.log({dateSearchMode: dateSearchMode.value, timePeriodMode: timePeriodMode.value, last: last.value, period: period.value, fromDate: fromDate.value, fromTime: fromTime.value, toDate: toDate.value, toTime: toTime.value})
  const value = last.value
  const timePeriod = period.value.toLowerCase()
  const useTimePeriod = timePeriodMode.value === 'timePeriod'
  const from = fromDate.value ? new Date(`${new Date(fromDate.value).toISOString().split('T')[0]} ${fromTime.value}`).toISOString() : null
  const to = toDate.value ? new Date(`${new Date(toDate.value).toISOString().split('T')[0]} ${toTime.value}`).toISOString() : null
  let query = useTimePeriod ? `value=${value}&timePeriod=${timePeriod}&useTimePeriod=${useTimePeriod}` 
  : `from=${from}${to ? '&to='+to: ''}`
  console.log({query, from, to})
  if(!fromDate.value && !useTimePeriod){
    toast.error('Please add a start date')
    return;
  }
  try {
    loadingList.value = true;
    const url = `api/v1/files/locations/${props.location.id}/measurement-files/search?${query}`
    const { response, error } = await makeAuthenticatedRequest({ url })
    if (response.success) {
      files.value = response.data.measurementFiles
    }
    searchParameters.value = useTimePeriod ? `Last ${last.value} ${period.value}` : `From ${dateFormatter({dateLike: (`${new Date(fromDate.value).toISOString().split('T')[0]}T${fromTime.value}`)})} ${toDate.value ? '- To '+ dateFormatter({dateLike: (`${new Date(toDate.value).toISOString().split('T')[0]}T${fromTime.value}`)}): ''}`
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
  const toastId = toast.toastOriginal.promise(makeAuthenticatedRequest({ url: `api/v1/files/locations/${props.location.id}/measurement-files/${fileId}`}), {
    loading: `${props.location.name}: Processing File...`,
    success: (data: any) => {
      
      toast.success(data.response.message);
      return `${data.response.message ? data.response.message : props.location.name + ': Done processing file'}`
    },
    error: (data: any) => {
      
      toast.error(data.response.message);
      const {response, error, message} = data
      return `Error: ${response ? data?.response?.message : error?.message ? error.message : message}`
    },
    finally: () => {
      loading.value.delete(fileId)
    },
    // action: {
    //   label: 'Dismiss',
    //   onClick: () => toast.dismiss(toastId)
    // }
  })
}

function downloadFile(file: any){
  const link = document.createElement('a')
  link.href = file.fileUrl
  link.download = file.fileName
  link.target = '_blank'
  link.click()
}

function computeFileDeviceUrl(deviceUrl: string){
  if(props.location.useRemoteConnection){
    return `${props.location.remoteHTTPUrl}/internal${deviceUrl.split('internal')[1]}`
  }
  return `http://${props.location.deviceData?.ipAddress}/internal${deviceUrl.split('internal')[1]}`
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
      <v-btn tile class="text-capitalize mx-2" @click="getStoredMeasurementFiles" :loading="loadingList" variant="tonal" size="small">Refresh <v-icon>mdi-refresh</v-icon></v-btn>
      <v-btn tile class="text-capitalize" @click="dateSearchMode = !dateSearchMode" size="small" :color="dateSearchMode ? 'primary': ''" variant="tonal" prepend-icon="mdi-magnify" text="Search" :append-icon="dateSearchMode ? 'mdi-arrow-up-drop-circle' : 'mdi-arrow-down-drop-circle'"></v-btn>
    </div>
    <v-expand-transition>
      <div v-show="dateSearchMode">
        <div class="d-flex align-center mb-2">
          <div class="d-flex mr-4" v-if="timePeriodMode === 'timePeriod'">
            <v-text-field v-model="last" style="flex: 1" type="number" hide-details prefix="Last" variant="outlined" tile single-line density="compact"></v-text-field>
            <v-select v-model="period" style="flex: 1" variant="outlined" tile single-line density="compact" hide-details label="Period" :items="timePeriods"></v-select>
          </div>
          <div class="d-flex align-center" v-else>
            <span v-if="isFullscreen">
              From:
            </span>
            <v-text-field
              v-model="fromDate"
              :active="fromDateMenu"
              :focus="fromDateMenu"
              variant="outlined"
              density="compact"
              single-line
              hide-details
              label="Date"
              tile
              class="ml-2"
              prepend-inner-icon="mdi-calendar"
              readonly
            >
              <v-menu
                v-model="fromDateMenu"
                :close-on-content-click="false"
                activator="parent"
                transition="scale-transition"
              >
                <v-date-picker
                  color="primary"
                  v-if="fromDateMenu"
                  v-model="fromDate"
                ></v-date-picker>
              </v-menu>
            </v-text-field>
            <v-text-field
              v-model="fromTime"
              
              variant="outlined"
              density="compact"
              single-line
              hide-details
              type="time"
              tile
              class="mr-4"
              label="Time"
              
              >
              <!-- readonly -->
              <!-- <v-menu
                v-model="fromTimeMenu"
                :close-on-content-click="false"
                activator="parent"
                transition="scale-transition"
              >
                <v-time-picker
                  v-if="fromTimeMenu"
                  v-model="fromTime"
                  full-width
                ></v-time-picker>
              </v-menu> -->
            </v-text-field>
            <span v-if="isFullscreen">
              To:
            </span>
            <v-text-field
              v-model="toDate"
              :active="toDateMenu"
              :focus="toDateMenu"
              variant="outlined"
              density="compact"
              single-line
              hide-details
              label="Date"
              tile
              class="ml-2"
              prepend-inner-icon="mdi-calendar"
              readonly
            >
              <v-menu
                v-model="toDateMenu"
                :close-on-content-click="false"
                activator="parent"
                transition="scale-transition"
              >
                <v-date-picker
                  color="primary"
                  v-if="toDateMenu"
                  v-model="toDate"
                ></v-date-picker>
              </v-menu>
            </v-text-field>
            <v-text-field
              v-model="toTime"
              
              variant="outlined"
              density="compact"
              single-line
              hide-details
              tile
              label="Time"
              type="time"
              
              >
              <!-- readonly -->
              <!-- <v-menu
                v-model="toTimeMenu"
                :close-on-content-click="false"
                activator="parent"
                transition="scale-transition"
              >
                <v-time-picker
                  v-if="toTimeMenu"
                  v-model="toTime"
                  full-width
                ></v-time-picker>
              </v-menu>
              -->
            </v-text-field> 
          </div>
          <v-spacer></v-spacer>
          <v-btn-toggle
            v-model="timePeriodMode"
            size="small"
            color="primary"
            variant="tonal"
            density="compact"
            class="text-capitalize py-0"
          >
            <v-btn class="text-capitalize py-0" value="timePeriod" size="small">
              <!-- <span class="hidden-sm-and-down">Time Period</span> -->

              <v-icon>
                mdi-clock-time-five-outline
              </v-icon>
            </v-btn>

            <v-btn class="text-capitalize py-0" value="fromTo" size="small">
              <!-- <span class="hidden-sm-and-down">Start - End</span> -->

              <v-icon>
                mdi-calendar
              </v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-btn @click="fetchSearchResults" variant="tonal" class="mx-2" color="primary" tile>
            <v-icon size="large">mdi-magnify</v-icon>
            <v-tooltip
              activator="parent"
              location="top"
            >Search</v-tooltip>
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
    <v-expand-transition>
      <div v-show="Boolean(searchParameters)">
        <div class="d-flex align-center mb-2">
          <p class="mb-0">Search results:</p>
          <v-chip v-if="Boolean(searchParameters)" class="ml-2" label closable @click:close="async () => {
            dateSearchMode = false;
            searchParameters = ''
            await getStoredMeasurementFiles();
          }">{{ searchParameters }}</v-chip>
      </div>
    </div>
    </v-expand-transition>
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
              <v-btn @click="navigateTo(computeFileDeviceUrl(item.fileDeviceUrl), {
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
