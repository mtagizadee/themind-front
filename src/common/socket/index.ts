import { io } from "socket.io-client";
import { ISocket } from "../types";

const SOCKET_URL = (import.meta as any).env.VITE_APP_SOCKET_URL;

const connection: ISocket = io(SOCKET_URL, {
  autoConnect: false,
});

export default {
  connection,
  connected: connection.connected,
  connect() {
    connection.auth = { ...connection.auth, jwtToken: localStorage.getItem("authToken") };
    this.connection.connect();
  },
  disconect() {
    this.connection.disconnect();
  },
};
