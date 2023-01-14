import { Socket } from "socket.io-client";

export interface ServerToClientEvents {
  "lobby:join": (data: any) => void;
  "lobby:leave": (data: any) => void;
}

export interface ClientToServerEvents {
  "lobby:join": (data: any, handler: (response: any) => void) => void;
  "lobby:leave": (data: any) => void;
}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;
