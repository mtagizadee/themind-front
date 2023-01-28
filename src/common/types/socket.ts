import { Socket } from "socket.io-client";
import { TLobby } from "./lobby";
import { TPlayer } from "./player";

export type TWsExcention = {
  status: number;
  message: string;
};

export interface ServerToClientEvents {
  "lobby:join": (player: TPlayer) => void;
  "lobby:leave": (userId: string) => void;
  "lobby:start": (game: { id: string }) => void;
  exception: (excention: TWsExcention) => void;
}

export interface ClientToServerEvents {
  "lobby:join": (data: { lobbyId: string }, handler: (response: TLobby) => void) => void;
  "lobby:leave": (data: { lobbyId: string }) => string;
  "lobby:start": (data: { lobbyId: string }, handler: (response: { id: string }) => void) => void;
}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;
