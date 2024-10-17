import CharacterLogView, {
  CharacterLogViewProps,
} from "./CharacterIntroLogView";
import MissionLogView, { MissionLogViewProps } from "./MissionLogView";
import TeamBuildLogView, { TeamBuildViewProps } from "./TeamBuildLogView";
import TeamVoteLogView, { TeamVoteLogViewProps } from "./TeamVoteLogView";

export type GameLogProps =
  | {
      type: "default";
      text: React.ReactNode;
    }
  | ({
      type: "character";
    } & CharacterLogViewProps)
  | ({
      type: "team-build";
    } & TeamBuildViewProps)
  | ({
      type: "team-vote";
    } & TeamVoteLogViewProps)
  | ({
      type: "mission";
    } & MissionLogViewProps);

const GameLogView = (props: GameLogProps) => {
  switch (props.type) {
    case "default":
      return <div>{props.text}</div>;
    case "character":
      return <CharacterLogView {...props} />;
    case "team-build": {
      return <TeamBuildLogView {...props} />;
    }
    case "team-vote": {
      return <TeamVoteLogView {...props} />;
    }
    case "mission": {
      return <MissionLogView {...props} />;
    }
  }
};

export default GameLogView;
