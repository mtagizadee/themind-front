import { Socket } from "socket.io-client";
import { TPlayer } from "./player";

export interface ServerToClientEvents {
  "lobby:join": (player: TPlayer) => void;
  "lobby:leave": (userId: string) => void;
}

export interface ClientToServerEvents {
  "lobby:join": (data: any, handler: (response: any) => void) => void;
  "lobby:leave": (data: any) => void;
}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;
