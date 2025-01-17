export type NumExpeditions = number[];

export const numDevilsPerPlayers: Record<number, number> = {
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 3,
  10: 4,
};

export const possibleNumExpeditions: Record<number, NumExpeditions[]> = {
  5: [
    [3, 2, 3, 2, 3],
    [2, 3, 2, 3, 3],
  ],
  6: [[2, 3, 4, 3, 4]],
  7: [
    [2, 3, 4, 3, 4],
    [2, 3, 3, 4, 4],
  ],
  8: [[3, 4, 4, 5, 5]],
  9: [[3, 4, 4, 5, 5]],
  10: [[3, 4, 4, 5, 5]],
};

export const MIN_NUM_PLAYERS = 5;
export const MAX_NUM_PLAYERS = 10;
export const DEFAULT_NUM_PLAYERS = 5;
export const DEFAULT_NUM_EXPEDITIONS: NumExpeditions =
  possibleNumExpeditions[DEFAULT_NUM_PLAYERS][0];
