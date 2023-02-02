import { TCard } from "./card";
import { playerCleaner, TPlayer } from "./player";

export type TGame = {
  client: TPlayerInGame;
  players: TPlayerInGame[];
  board: TCard[];
  currentLevel: number;
  lastLevel: number;
  lives: number;
  hasShootingStar: boolean;
  expiresAt: Date;
};

export type TPlayerInGame = {
  cards: TCard[];
} & TPlayer;

export type TGameResponseData = {
  players: TPlayerInGame[];
  board: TCard[];
  currentLevel: number;
  lastLevel: number;
  lives: number;
  hasShootingStar: boolean;
  expiresAt: Date;
};

export const gameFactory = (data: TGameResponseData, currentUserId: string): TGame => {
  // find current player in game and remove it from the list
  const client = data.players.find((player) => player.id === currentUserId);
  if (!client) return gameCleaner();
  const players = data.players.filter((player) => player.id !== currentUserId);

  return {
    client,
    players,
    board: data.board,
    currentLevel: data.currentLevel,
    lastLevel: data.lastLevel,
    lives: data.lives,
    hasShootingStar: data.hasShootingStar,
    expiresAt: data.expiresAt,
  };
};

export const gameCleaner = (): TGame => {
  return {
    client: { ...playerCleaner(), cards: [] },
    players: [],
    board: [],
    currentLevel: 0,
    lastLevel: 0,
    lives: 0,
    hasShootingStar: false,
    expiresAt: "" as unknown as Date,
  };
};
