import LogTitle from "./LogTitle";

export type TeamBuildViewProps = {
  round: number;
  subRound: number;
  commander: string;
  teamMembers: string[];
};

const TeamBuildLogView = ({
  round,
  subRound,
  commander,
  teamMembers,
}: TeamBuildViewProps) => {
  return (
    <div>
      <LogTitle>{`${round + 1}-${subRound} 원정대 구성`}</LogTitle>
      <div>
        <span className="font-bold">원정대장: </span>
        <span>{commander}</span>
      </div>
      <div>
        <span className="font-bold">원정대원: </span>
        <span>{teamMembers.join(", ")}</span>
      </div>
    </div>
  );
};

export default TeamBuildLogView;
