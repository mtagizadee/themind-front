import { fixResponseDate } from "../helpers";
import { playerFactory, TPlayer, TPlayerResponseData } from "./player";

export type TLobby = {
  authorId: string;
  players: TPlayer[];
  playersNumber: number;
  expiresAt: string;
};

export type TLobbyResponseData = {
  authorId: string;
  players: TPlayerResponseData[];
  playersNumber: number;
  expiresAt: string;
};

export const lobbyFactory = (data: TLobbyResponseData): TLobby => {
  return {
    authorId: data.authorId,
    players: data.players.map((player) => playerFactory(player)),
    playersNumber: data.playersNumber,
    expiresAt: fixResponseDate(data.expiresAt),
  };
};

export const lobbyCleaner = (): TLobby => {
  return {
    authorId: "",
    players: [],
    playersNumber: 0,
    expiresAt: "",
  };
};
