export const useUIStore = defineStore('ui', () => {
  const connectionStatusColor = (connectionStatus: string) => {
    switch (connectionStatus) {
      case 'OK':
        return 'success'
      case 'ERROR':
        return 'error'
      default:
        return 'grey'
    }
  }
  const connectionStatusIcon = (connectionStatus: string) => {
    switch (connectionStatus) {
      case 'OK':
        return 'mdi-wifi-lock'
      case 'ERROR':
        return 'mdi-wifi-cancel'
      default:
        return 'mdi-wifi-strength-alert-outline'
    }
  }

  return {
    connectionStatusColor,
    connectionStatusIcon
  }
})