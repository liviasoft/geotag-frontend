import { useAuthStore } from './auth'
import type { DeviceCommand } from "~/types/Locations.types"

export const useDeviceStore = defineStore('devices', () => {
  const deviceCommands = ref<Array<DeviceCommand>>([])

  const { makeAuthenticatedRequest } = useAuthStore()

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
  }
})