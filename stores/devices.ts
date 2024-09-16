import { toast } from '@neoncoder/vuetify-sonner'
import { useAuthStore } from './auth'
import type { DeviceCommand } from "~/types/Locations.types"

export const useDeviceStore = defineStore('devices', () => {
  const deviceCommands = ref<Array<DeviceCommand>>([])
  const startFreq = ref(700)
  const startFreqUnit = ref('MHZ')
  const stopFreq = ref(4)
  const stopFreqUnit = ref('GHZ')
  const bandResolution = ref(100)
  const bandResolutionUnit = ref('KHz')
  const freqSweepTime = ref(500)
  const freqSweepTimeUnit = ref('MS')
  const measurementTime = ref(10)
  const measurementTimeUnit = ref('MIN')
  const axisDwellTime = ref(1)
  const axisDwellTimeUnit = ref('S')
  const freqUnits = ref([
    { title: 'Megahertz (MHz)', value: 'MHZ'},
    { title: 'Gigahertz (GHz)', value: 'GHZ'},
    { title: 'Kilohertz (KHz)', value: 'KHZ'},
  ])
  const timeUnits = ref([
    { title: 'MilliSeconds (MS)', value: 'MS'},
    { title: 'Seconds (S)', value: 'S'},
    { title: 'Minutes (MIN)', value: 'MIN'},
  ])
  const restoreDefaultMeasurementParams = () => {
    startFreq.value = 700
    startFreqUnit.value = 'MHZ'
    stopFreq.value = 4
    stopFreqUnit.value = 'GHZ'
    bandResolution.value = 100
    bandResolutionUnit.value = 'KHz'
    freqSweepTime.value = 500
    freqSweepTimeUnit.value = 'MS'
    measurementTime.value = 1
    measurementTimeUnit.value = 'MIN'
    axisDwellTime.value = 1
    axisDwellTimeUnit.value = 'S'
  }
  const { makeAuthenticatedRequest } = useAuthStore()

  const sendDeviceCommand = (deviceId: string, command: string) => makeAuthenticatedRequest({ url: `api/v1/locations/sites/${deviceId}/command`, method: 'POST', data: { command }})

  const sendNotifiedCommand = async (deviceId: string, command: string, deviceName: string) => {
    toast.toastOriginal.promise(sendDeviceCommand(deviceId, command), {
      loading: `${deviceName}: ${command}`,
      success: (data: any) => {
        console.log({data});
        return `${data.response.message ? data.response.message : deviceName + ': Command Sent'}`
      },
      error: (data: any) => {
        const {response, error, message} = data
        return `Error: ${response ? data?.response?.message : error?.message ? error.message : message}`
      }
    })
  }

  const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const startDeviceMeasurement = async ({deviceId, deviceName}: {deviceId: string, deviceName: string}) => {
    let commandList = [
      // Ensure SPA is active
      {message: 'Ensuring SPA is Active'},
      {command: `INST:SEL?`, timeout: 5000},
      {command: `INST:APPL:STAT HIPM, 0`, timeout: 5000},
      {command: `INST:APPL:STAT CAAUSB, 0`, timeout: 5000},
      {command: `INST:APPL:STAT SPA, 1`, timeout: 20000},
      {command: `INST:SEL SPA`, timeout: 40000},
      // Preset instrument mode
      {message: 'Presetting Instrument Mode'},
      {command: `SYST:PRES`, timeout: 5000},
      {command: `SYST:PRES:MODE`, timeout: 5000},
      // Set the start and stop frequency; RBW; auto atten for EMF measurement
      {message: 'Setting Start and Stop Frequencies'},
      {command: `SENS:FREQ:STAR ${startFreq.value} ${startFreqUnit.value}`, timeout: 5000},
      {command: `SENS:FREQ:STOP ${stopFreq.value} ${stopFreqUnit.value}`, timeout: 5000},
      {command: `BAND:RES ${bandResolution.value} ${bandResolutionUnit.value}`, timeout: 5000},
      {command: `SENS:FREQ:SWE:TIME ${freqSweepTime.value} ${freqSweepTimeUnit.value}`, timeout: 5000},
      {command: `SENS:POW:RF:ATT:AUTO 1`, timeout: 5000},
      {command: `SENS:POW:RF:GAIN:STAT 0`, timeout: 5000},
      // Check status of EMF mode and switch to it
      {message: 'Switching to EMF mode'},
      // {command: `SENS:EMF:STAT?`, timeout: 5000},
      {command: `SENS:EMF:STAT 1`, timeout: 15000},
      {command: `SENS:EMF:STAT?`, timeout: 5000},
      // Ensure Logging is enabled
      // {command: `SENS:EMF:LOG?`, timeout: 5000},
      {command: `SENS:EMF:LOG 1`, timeout: 5000},
      // {command: `SENS:EMF:LOG?`, timeout: 5000},

      {message: 'Setting EMF Units and Reference Level'},
      // Set EMF Measurement Units
      {command: `UNIT:POW DBMV/M`, timeout: 5000},
      // Set Reference Level
      {command: `DISP:WIND:TRAC:Y:SCAL:RLEV 50 DBMV/M`, timeout: 5000},
      {command: `DISP:WIND:TRAC:Y:SCAL:RLEV:OFF 0 DB`, timeout: 5000},
      // Set Measurement Time
      {message: 'Setting Measurement Time'},
      {command: `SENS:EMF:MEAS:TIME ${measurementTime.value} ${measurementTimeUnit.value}`, timeout: 5000},
      {command: `SENS:EMF:MEAS:TIME?`, timeout: 5000},
      // Set Measurement Count
      {command: `SENS:EMF:MEAS:COUN 1`, timeout: 5000},
      {command: `SENS:EMF:MEAS:COUN?`, timeout: 5000},
      // Set EMF Axis Dwell Time
      {command: `SENS:EMF:AXIS:TIME ${axisDwellTime.value} ${axisDwellTimeUnit.value}`, timeout: 5000},
      // Set ICNIRP Limit
      // {command: `SENS:EMF:ICN?`, timeout: 5000},
      {command: `SENS:EMF:ICN:STAT 1`, timeout: 5000},
      {command: `SENS:EMF:ICN:STAT?`, timeout: 5000},
      // Start Measurement
      {command: `SENS:EMF:RUN 1`, timeout: measurementTime.value * 60 * 5000},
      // Disable EMF Mode
      {command: `SENS:EMF:STAT 0`, timeout: 5000},  
      {command: `SENS:EMF:STAT?`, timeout: 5000},
      // Preset instrument Mode
      {command: `SYST:PRES`, timeout: 5000},
      {command: `SYST:PRES:MODE`, timeout: 5000},
    ]
    // sendNotifiedCommand(deviceId)
    for (const command of commandList) {
      if(command.command){
        await sendNotifiedCommand(deviceId, command.command, deviceName)
      } else if(command.message){
        toast.info(`${deviceName}: ${command.message}`)
      }
      await delay(command.timeout || 5000)
    }
  }
  const toggleLocationLock = async ({locationId, lock = true}: {locationId: string, lock?: boolean}) =>{
    return await makeAuthenticatedRequest({ url: `api/v1/locations/sites/${locationId}`, method: 'PATCH', data: { isLocked: lock }});
  }
  const getDeviceCommands = async() => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: 'api/v1/settings/device-commands'})
      .then(result => {
        const {data: {deviceCommands: fetchedCommands}} = result.response
        deviceCommands.value = fetchedCommands
        resolve(result)
      }).catch(error => reject(error))
    });
  }

  const addDeviceCommand = async(data: Omit<DeviceCommand, 'id'>) => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: 'api/v1/settings/device-commands', method: 'POST', data})
      .then(resolve).catch(error => reject(error))
    });
  }

  const updateDeviceCommand = async(data: Partial<DeviceCommand>) => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: `api/v1/settings/device-commands/${data.id}`, method: 'PATCH', data})
      .then(resolve).catch(error => reject(error))
    });
  }

  const deleteDeviceCommand = async(id: string) => {
    return new Promise((resolve, reject) => {
      makeAuthenticatedRequest({ url: `api/v1/settings/device-commands/${id}`, method: 'DELETE'})
      .then(resolve).catch(error => reject(error))
    });
  }

  return {
    deviceCommands,
    getDeviceCommands,
    addDeviceCommand,
    updateDeviceCommand,
    deleteDeviceCommand,
    startFreq,
    startFreqUnit,
    stopFreq,
    stopFreqUnit,
    bandResolution,
    bandResolutionUnit,
    freqSweepTime,
    freqSweepTimeUnit,
    freqUnits,
    timeUnits,
    measurementTime,
    measurementTimeUnit,
    axisDwellTime,
    axisDwellTimeUnit,
    startDeviceMeasurement,
    restoreDefaultMeasurementParams,
    toggleLocationLock,
  }
})