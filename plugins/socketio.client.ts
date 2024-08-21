import { io } from "socket.io-client";

//Socket Client
const filesSocket = io(`http://localhost:3002`, {
  path: '/api/v1/files/socket'
});
export default defineNuxtPlugin(() => {
  return {
    provide: {
      fileio: filesSocket,
    },
  };
});