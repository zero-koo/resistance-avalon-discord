import LogTitle from "./LogTitle";

export type MissionLogViewProps = {
  countAgree: number;
  countDisagree: number;
  isSuccess: boolean;
};

const MissionLogView = ({
  countAgree,
  countDisagree,
  isSuccess,
}: MissionLogViewProps) => {
  return (
    <div>
      <LogTitle>임무 결과</LogTitle>
      <div>
        <span className="font-bold">
          {`찬성 ${countAgree}, 반대 ${countDisagree} `}
        </span>
        <span>{`표로 임무가 ${isSuccess ? "성공" : "실패"}하였습니다`}</span>
      </div>
    </div>
  );
};

export default MissionLogView;
