import LogTitle from "./LogTitle";

export type TeamVoteLogViewProps = {
  countAgree: number;
  countDisagree: number;
};

const TeamVoteLogView = ({
  countAgree,
  countDisagree,
}: TeamVoteLogViewProps) => {
  return (
    <div>
      <LogTitle>투표 결과</LogTitle>
      <div>
        <span className="font-bold">
          {`찬성 ${countAgree}, 반대 ${countDisagree}`}
        </span>
        <span> 표로 </span>
        <span>
          {countAgree > countDisagree
            ? "원정대원 투표가 통과되었습니다."
            : "원정대원 투표가 부결되었습니다."}
        </span>
      </div>
    </div>
  );
};

export default TeamVoteLogView;
