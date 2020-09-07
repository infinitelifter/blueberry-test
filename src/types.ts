export type TPlayer = {
  id: number;
  name: string;
  email: string;
};

export type TScore = {
  player: TPlayer;
  score: number;
};

export type TMatrix = number[][];

export type TGame = {
  state: TMatrix;
  score: number;
  finished: boolean;
};
