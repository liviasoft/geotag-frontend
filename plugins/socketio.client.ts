import { io } from "socket.io-client";

//Socket Client
const config = useRuntimeConfig();
const apiBaseUrl = config.public.API_BASE_URL;
const filesSocket = io(`${apiBaseUrl}`, {
  path: '/api/v1/files/socket'
});
export default defineNuxtPlugin(() => {
  return {
    provide: {
      fileio: filesSocket,
    },
  };
});