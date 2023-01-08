import { playerFactory, TPlayer, TPlayerResponseData } from "./player";

export type TLobby = {
  authorId: string;
  players: TPlayer[];
  playersNumber: number;
};

export type TLobbyResponseData = {
  authorId: string;
  players: TPlayerResponseData[];
  playersNumber: number;
};

export const lobbyFactory = (data: TLobbyResponseData): TLobby => {
  return {
    authorId: data.authorId,
    players: data.players.map((player) => playerFactory(player)),
    playersNumber: data.playersNumber,
  };
};

export const lobbyCleaner = (): TLobby => {
  return {
    authorId: "",
    players: [],
    playersNumber: 0,
  };
};
