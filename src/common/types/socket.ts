import { Socket } from "socket.io-client";
import { TCard } from "./card";
import { TPlayerInGame } from "./game";
import { TLobby } from "./lobby";
import { TPlayer } from "./player";

export type TWsExcention = {
  status: number;
  message: string;
};

export type TCardPlayedEventData = {
  board: TCard[];
  playedCard: {
    card: TCard;
    player: TPlayerInGame;
  };
};

export type TPlayCardEventData = { board: TCard[]; cards: TCard[] };

export interface ServerToClientEvents {
  "lobby:join": (player: TPlayer) => void;
  "lobby:leave": (userId: string) => void;
  "lobby:start": (game: { id: string }) => void;
  "game:card:played": (data: TCardPlayedEventData) => void;
  exception: (excention: TWsExcention) => void;
}

export interface ClientToServerEvents {
  "lobby:join": (data: { lobbyId: string }, handler: (response: TLobby) => void) => void;
  "lobby:leave": (data: { lobbyId: string }) => string;
  "lobby:start": (data: { lobbyId: string }, handler: (response: { id: string }) => void) => void;
  "game:card:play": (
    data: { gameId: string; card: TCard },
    handler: (response: TPlayCardEventData) => void
  ) => void;
}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;
