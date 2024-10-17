export type GameLog =
  | DefaultLog
  | CharacterLog
  | TeamBuildLog
  | TeamVoteLog
  | MissionLog;

export type DefaultLog = {
  type: "default";
  text: React.ReactNode;
};

export type CharacterLog = {
  type: "character";
};

export type TeamBuildLog = {
  type: "team-build";
  round: number;
  subRound: number;
  commanderIndex: number;
  teamMemberIds: string[];
};

export type TeamVoteLog = {
  type: "team-vote";
  countAgree: number;
  countDisagree: number;
};

export type MissionLog = {
  type: "mission";
  countAgree: number;
  countDisagree: number;
  isSuccess: boolean;
};
