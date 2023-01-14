import { io } from "socket.io-client";
import { isNotEmpty } from "../../validators";
import { ISocket } from "../types";

const SOCKET_URL = (import.meta as any).env.VITE_APP_SOCKET_URL;

const connection: ISocket = io(SOCKET_URL, {
  autoConnect: false,
});

export default {
  connection,
  connected: connection.connected,
  set token(jwtToken: string) {
    if (isNotEmpty(jwtToken)) {
      connection.auth = { ...connection.auth, jwtToken };
    }
  },
};
