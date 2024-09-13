<script lang="ts" setup>
  import { toast } from '@neoncoder/vuetify-sonner';
  import {ref} from 'vue';
  import type { SavedLocation, Trace, MeasurementFile, Point as SignalPoint } from '~/types/Locations.types';
  import { useAuthStore } from '~/stores/auth';
  import ChartBuilder from './ChartBuilder.vue';
  import FileDataTableModal from './FileDataTableModal.vue';
  import { dateFormatter } from '@neoncoder/validator-utils';

// #region

  import { Bar,  } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
type ChartDataset,
type Point,
  } from 'chart.js';
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );

  const labels = ref<Array<number>>([1, 2, 3, 4, 5])

  const traceLineColor = (line: keyof SignalPoint) => {
    switch (line) {
      case 'referenceEMFLimit':
        return '#2af638'
      case 'amplitude_DBMV':
        return '#a06eff'
      case 'exposureRatio':
        return '#ffb30a'
      case 'amplitude_VM':
        return '#3694ff'
      default:
        return '3694ff'
    }
  }
  // const chartData = ref({
  //   labels: [1, 2, 3, 4, 5],
  //   datasets: [
  //     {
  //       label: 'Data One',
  //       backgroundColor: '#f87979',
  //       data: [{x: 1, y:40}, {x: 2, y: 20}, {x: 3, y: 12}, {x: 4, y: 50}, {x: 5, y: 10}],
  //     },
  //   ],
  // });
  const responsive = ref(true)
  const maintainAspectRatio = ref(false)
  const plugins = ref({
    title: {
      display: true,
      text: `Data - Logarithmic`
    }
  })
  const scales = ref({
    x: {
        display: true,
        // type: 'time',
        title: {
          text: 'Frequency (in MHz)',
          display: true
        },
        suggestedMin: 700,
          suggestedMax: 3000,
        // min: 600,
        // max: 3000,
        ticks: {
          // forces step size to be 50 units
          stepSize: 50
        }
      },
      y: {
        display: true,
        type: 'logarithmic',
        min: 0,
        suggestedMax: 100
      }
  })
  // const chartOptions = ref({
  //   responsive: true,
  //   maintainAspectRatio: false,      
  //   plugins: {
  //     // tooltip: {
  //     //   callbacks: {
  //     //         // label: function(context) {
  //     //         //     let label = context.dataset.label || '';

  //     //         //     if (label) {
  //     //         //         label += ': ';
  //     //         //     }
  //     //         //     if (context.parsed.y !== null) {
  //     //         //         // label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
  //     //         //         label += " MHz";
  //     //         //     }
  //     //         //     return label;
  //     //         // }
  //     //         title: function(context: { label: any; }[]){
  //     //           let value = context[0].label
  //     //           // console.log({context});
  //     //           // let label = context.dataset.label || '';
  //     //           // if(context.parsed.y !== null){
  //     //           //   label += `${context.parsed.y} MHz`;
  //     //           // }
  //     //           return `${value} MHz`
  //     //         }
  //     //     }
  //     // },
  //     title: {
  //       display: true,
  //       text: `Data - Logarithmic`
  //     }
  //   },
  //   scales: {
  //     x: {
  //       display: true,
  //       // type: 'time',
  //       title: {
  //         text: 'Frequency (in MHz)',
  //         display: true
  //       },
  //       suggestedMin: 700,
  //         suggestedMax: 3000,
  //       // min: 600,
  //       // max: 3000,
  //       ticks: {
  //         // forces step size to be 50 units
  //         stepSize: 50
  //       }
  //     },
  //     y: {
  //       display: true,
  //       type: 'logarithmic',
  //       min: 0,
  //       suggestedMax: 1000
  //     }
  //   }
  // });

// #endregion

  const { makeAuthenticatedRequest } = useAuthStore()
  const dialog = ref(false)
  const loading = ref(false)
  const componentKey = ref(0);
  const traces = ref<Trace[]>([])
  const selectedTrace = ref(null)
  const showTraceList = ref(false)
  type DataSet = {
    id?: string, 
    label: string,
    backgroundColor: string,
    data: Array<number | Record<string, number>>, 
    pointRadius?: number
  }
  const datasets = ref([
    {
      id: 'qweuiro',
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [{x: 1, y:40}, {x: 2, y: 20}, {x: 3, y: 12}, {x: 4, y: 50}, {x: 5, y: 10}],
      pointRadius: 1,
    },
  ])

  const generate2DData = (points: SignalPoint[], yField: keyof SignalPoint, xField: keyof SignalPoint = 'frequency_MHz') => {
    const data: {x: number, y: number}[] = []
    points.forEach(p => {
      data.push({ x: p[xField] as number, y: p[yField] as number});
    })
    return data
  }

  // const generateData = (trace: Trace) => {
  //   const data: {id: string, label: string, backgroundColor: string, data: Array<number | Record<string, number>>, pointRadius: number}[] = []
  //   const ampDMBVData: {x: number, y: number}[] = []
  //   const traceVMData: {x: number, y: number}[] = []
  //   const refLimitData: {x: number, y: number}[] = []
  //   const exposureRatioData: {x: number, y: number}[] = []
  //   trace?.points.forEach(p => {
  //     ampDMBVData.push({y: p.amplitude_DBMV, x: p.frequency_MHz})
  //     traceVMData.push({x: p.frequency_MHz, y:p.amplitude_VM})
  //     refLimitData.push({x: p.frequency_MHz, y:p.referenceEMFLimit})
  //     exposureRatioData.push({x: p.frequency_MHz, y:p.exposureRatio})
  //   })
  //   datasets.value.push({
  //     id: trace.id,
  //     label: 'Exposure Ratio',
  //     backgroundColor: '#f87979',
  //     data: exposureRatioData,
  //     pointRadius: 1
  //   })
  //   datasets.value.push({
  //     id: trace.id,
  //     label: 'Trace (V/M)',
  //     backgroundColor: '#007BFF',
  //     data: traceVMData,
  //     pointRadius: 1
  //   })
  //   datasets.value.push({
  //     id: trace.id,
  //     label: 'Reference EMF Limit',
  //     backgroundColor: '#32cd32',
  //     data: refLimitData,
  //     pointRadius: 1
  //   })
  // }

  // const dataSet = computed(() => {
  //   const datasets: {label: string, backgroundColor: string, data: Array<number | Record<string, number>>, pointRadius: number}[] = []
  //   if(selectedTrace.value){
  //     const trace = traces.value.find(x => x.id === selectedTrace.value)
  //     const ampDMBVData: {x: number, y: number}[] = []
  //     const traceVMData: {x: number, y: number}[] = []
  //     const refLimitData: {x: number, y: number}[] = []
  //     const exposureRatioData: {x: number, y: number}[] = []
  //     const freqData: number[] = []
  //     trace?.points.forEach(p => {
  //       ampDMBVData.push({y: p.amplitude_DBMV, x: p.frequency_MHz})
  //       traceVMData.push({x: p.frequency_MHz, y:p.amplitude_VM})
  //       refLimitData.push({x: p.frequency_MHz, y:p.referenceEMFLimit})
  //       exposureRatioData.push({x: p.frequency_MHz, y:p.exposureRatio})
  //       freqData.push(p.frequency_MHz)
  //     })
  //     datasets.push({
  //       label: 'Exposure Ratio',
  //       backgroundColor: '#f87979',
  //       data: exposureRatioData,
  //       pointRadius: 1
  //     })
  //     datasets.push({
  //       label: 'Trace (V/M)',
  //       backgroundColor: '#007BFF',
  //       data: traceVMData,
  //       pointRadius: 1
  //     })
  //     datasets.push({
  //       label: 'Reference EMF Limit',
  //       backgroundColor: '#32cd32',
  //       data: refLimitData,
  //       pointRadius: 1
  //     })
  //     return datasets
  //   }
  //   return {
  //     labels: [],
  //     datasets: []
  //   }
  // })

  const props = defineProps({
    file: {
      type: Object as () => MeasurementFile,
      required: true,
    },
    location: {
      type: Object as () => SavedLocation,
      required: true
    }
  })

  const renderChart = (trace: Trace) => {
    datasets.value[0] = {
      id: trace.id,
      label: 'Amplitude (V/M)',
      data: generate2DData(trace.points, 'amplitude_VM'),
      backgroundColor: traceLineColor('amplitude_VM'),
      pointRadius: 1
    }

    datasets.value[1] = {
      id: trace.id,
      label: 'Reference EMF Limit',
      data: generate2DData(trace.points, 'referenceEMFLimit'),
      backgroundColor: traceLineColor('referenceEMFLimit'),
      pointRadius: 1
    }

    datasets.value[2] = {
      id: trace.id,
      label: 'Exposure Ratio',
      data: generate2DData(trace.points, 'exposureRatio'),
      backgroundColor: traceLineColor('exposureRatio'),
      pointRadius: 1
    }

    datasets.value[3] = {
      id: trace.id,
      label: 'Amplitude DBm/V',
      data: generate2DData(trace.points, 'amplitude_DBMV'),
      backgroundColor: traceLineColor('amplitude_DBMV'),
      pointRadius: 1
    }

    labels.value = traces.value[0].points.map(({ frequency_MHz }) => frequency_MHz)
    plugins.value.title.text = `Trace: ${trace.name}`
    componentKey.value++
  }

  watch([dialog, selectedTrace], ([newValue, newSelectedTrace]) => {
    console.log({ newValue })
    if(newSelectedTrace){
      const trace = traces.value.find(({id}) => id === newSelectedTrace)
      if(trace) renderChart(trace)
      return;
    }
    if(newValue && !traces.value.length) query();
  })

  function query(){
    if(loading.value) return;
    loading.value = true;
    const url = `api/v1/files/locations/${props.location.id}/measurement-files/${props.file.id}/data`
    toast.toastOriginal.promise(makeAuthenticatedRequest({url}), {
      loading: `${props.location.name}: Loading File Data...`,
      success: (data: any) => {
        
        toast.success(data.response.message);
        traces.value = data.response.data.traces
        // traces.value.forEach((trace, i) => {
        const trace = traces.value[0]
        renderChart(trace)
        return `${data.response.message ? data.response.message : props.location.name + ': Done processing file'}`
      },
      error: (data: any) => {
        
        toast.error(data.response.message);
        traces.value = []
        const {response, error, message} = data
        return `Error: ${response ? data?.response?.message : error?.message ? error.message : message}`
      },
      finally: () => {
        loading.value = false
      }
    })
  }
</script>

<template>
  <v-btn @click="dialog = true" icon variant="text" size="small">
    <v-icon>mdi-chart-bell-curve-cumulative</v-icon>
  </v-btn>
  <v-dialog
    v-model="dialog"
    width="auto"
    scrollable
  >
    <v-card
      width="900"
    >
      <v-card-title class="d-flex align-center bg-primary">
        <v-icon class="mr-2">mdi-file-chart</v-icon>
        File Data: &nbsp; <span class="font-weight-bold">{{ file.fileName }}</span>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" variant="tonal" size="small" icon><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <div>
          <div style="max-height: 700px;">

            <ChartBuilder :chart-data="{ labels, datasets }" :chart-options="{ responsive, maintainAspectRatio, plugins, scales }" :key="componentKey" />
          </div>
          <!-- <p>{{ selectedTrace }}</p> -->
          <!-- <Bar :data="chartData" :options="chartOptions" /> -->
          <v-item-group selected-class="bg-primary" v-model="selectedTrace">
            <v-container>
              <v-row>
                <v-col cols="12" class="py-0">
                  <div class="d-flex align-center">
                    <p>Traces <span class="text-disabled">({{ traces.length }})</span></p>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-4 mb-2" tile @click="showTraceList = !showTraceList" :color="showTraceList? 'blue': ''" icon variant="tonal" size="x-small">
                      <v-icon  size="large">
                        mdi-chevron-{{showTraceList ? 'up' : 'down'}}
                      </v-icon>
                      <v-tooltip
                        activator="parent"
                        location="top"
                      >{{showTraceList ? 'Hide' : 'Show'}} Trace List</v-tooltip>
                    </v-btn>
                  </div>
                </v-col>
                <v-divider></v-divider>
                <v-expand-transition>
                  <div v-show="showTraceList" >
                    <v-row class="px-0 pb-0 pt-2 ma-0" style="max-height: 20vh; overflow-y: scroll;">
                      <v-col cols="12" class="my-0 py-1" v-for="(trace, index) in traces" :key="trace.id">
                  <v-item v-slot="{ isSelected, toggle }" :value="trace.id">
                    <v-card :variant="isSelected ? 'flat': 'tonal'" :color="isSelected? 'blue-lighten-4': ''" :border-left="isSelected" :dark="isSelected" @click.="toggle" class="d-flex align-center my-0 px-2 py-0 text-caption">
                      <p class="font-weight-bold">{{ index + 1 }}. &nbsp;</p>
                      <!-- <v-checkbox :value="isSelected" class="py-0" hide-details single-line density="compact" ></v-checkbox> -->
                      <p><span class="text-disabled">Trace:</span> {{ trace.name }} &nbsp;</p>
                      <p><span class="text-disabled">- &nbsp;Points:</span> {{ trace._count?.points }}</p>
                      <!-- {{ isSelected }} -->
                      <v-spacer></v-spacer>
                      <p><span class="text-disabled">Time:</span>{{ dateFormatter({ dateLike: String(trace.measurementFile?.timeStamp) }) }}</p>
                      <!-- TODO: Add Datatable of trace points -->
                      <FileDataTableModal :trace="trace" />
                      <!-- <v-btn @click.stop="() => {}" icon variant="text" size="small"><v-icon>mdi-table</v-icon></v-btn> -->
                    </v-card>
                  </v-item>
                </v-col>
                    </v-row>
                  </div>
                </v-expand-transition>
                
              </v-row>
            </v-container>
          </v-item-group>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Ok"
          @click="dialog = false"
        ></v-btn>
      </template>
      <v-overlay :model-value="loading" scrim="blue"
      class="align-center justify-center"
      contained :opacity='0.2'>
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>
