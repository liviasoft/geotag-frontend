import { io } from "socket.io-client";

//Socket Client
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  const filesSocket = io(`${apiBaseUrl}`, {
    path: '/api/v1/files/socket'
  });
  return {
    provide: {
      fileio: filesSocket,
    },
  };
});