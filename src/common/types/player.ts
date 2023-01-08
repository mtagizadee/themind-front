export type TPlayer = {
  nickname: string;
  id: string;
};

export type TPlayerResponseData = {
  nickname: string;
  id: string;
};

export const playerFactory = (data: TPlayerResponseData): TPlayer => {
  return {
    nickname: data.nickname,
    id: data.id,
  };
};
