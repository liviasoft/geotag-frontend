<script lang="ts" setup>
  import { Line as LineChartGenerator } from 'vue-chartjs'

  import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  // LinearScale,
  CategoryScale,
  PointElement,
  LogarithmicScale,
type ChartData,
type Point,
  // TimeScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  // LinearScale,
  LogarithmicScale,
  CategoryScale,
  PointElement,
  // TimeScale
)

  const props = defineProps({
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 1150
    },
    height: {
      type: Number,
      default: 500
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    chartData: {
      type: Object as () => ChartData<"line", (number | Point | null)[], unknown>,
      required: false,
      default: () => ({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
        // data: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        // datasets: [
        //     {
        //       label: 'Data One',
        //       backgroundColor: '#f87979',
        //       data: [40, 39, 10, 40, 39, 80, 40]
        //     }
        //   ]
        // },
        // options: {
        //   responsive: true,
        //   maintainAspectRatio: false
        // },
      })
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {
          responsive: false,
          maintainAspectRatio: true
        }
      }
    }
  })
</script>

<template>
  <LineChartGenerator 
    :options="chartOptions"
    :data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>
