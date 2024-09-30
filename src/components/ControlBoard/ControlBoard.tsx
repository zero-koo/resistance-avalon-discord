import { CharacterSide, CharacterType } from "@/constants/characters";
import { cn } from "@/lib/utils";
import { GamePhase, GameResult } from "@/contexts/GameStateContext";

import ConfirmButton from "../ConfirmButton";
import AssassinText from "../texts/AssassinText";
import Bold from "../texts/Bold";
import CommanderText from "../texts/CommanderText";
import MerlinText from "../texts/MerlinText";
import TeamMemberText from "../texts/TeamMemberText";
import TeamText from "../texts/TeamText";
import Vote from "../Vote";

type ControlBoardProps = {
  myCamp: CharacterSide;
  myCharacter: CharacterType;
  isCommander: boolean;
  isExpedition: boolean;
  hasAgreedForQuest: boolean | null;
  hasAgreedForTeamBuild: boolean | null;
  phase: GamePhase;
  numExpeditions: number;
  numSelectedExpeditions: number;
  countCompositionTrial: number;
  assassinationTargetSelected: boolean;
  gameResult: GameResult | null;
  onConfirmForTeamBuild: () => void;
  onVoteForTeamBuild: (isAgreed: boolean | null) => void;
  onVoteForQuest: (isAgreed: boolean | null) => void;
  onConfirmForAssassination: () => void;
};

const ControlBoard: React.FC<ControlBoardProps> = ({
  myCamp,
  myCharacter,
  isCommander,
  isExpedition,
  hasAgreedForQuest,
  hasAgreedForTeamBuild,
  phase,
  numExpeditions,
  countCompositionTrial,
  numSelectedExpeditions,
  assassinationTargetSelected,
  gameResult,
  onConfirmForTeamBuild,
  onVoteForTeamBuild,
  onVoteForQuest,
  onConfirmForAssassination,
}) => {
  switch (phase) {
    case "compose-expeditions": {
      return (
        <TeamBuildPhaseBoard
          isCommander={isCommander}
          expeditionCount={numExpeditions}
          numSelectedExpeditions={numSelectedExpeditions}
          onConfirmForTeamBuild={onConfirmForTeamBuild}
        />
      );
    }
    case "vote-expeditions": {
      return (
        <VoteTeamBuildPhaseBoard
          isApproved={hasAgreedForTeamBuild}
          isLastVote={countCompositionTrial === 5}
          onVote={onVoteForTeamBuild}
        />
      );
    }
    case "expedition": {
      return (
        <ExpeditionPhaseBoard
          isApproved={hasAgreedForQuest}
          isExpedition={isExpedition}
          isGoodCamp={myCamp === "Citizen"}
          onVote={onVoteForQuest}
        />
      );
    }
    case "assassination": {
      return (
        <AssassinationPhaseBoard
          isAssassin={myCharacter === "Assassin"}
          assassinationTargetSelected={assassinationTargetSelected}
          onConfirmForAssassination={onConfirmForAssassination}
        />
      );
    }
    case "completed": {
      if (!gameResult) {
        return null;
      }
      return <CompletedPhaseBoard myCamp={myCamp} result={gameResult} />;
    }
    default: {
      return null;
    }
  }
};

const TeamBuildPhaseBoard: React.FC<{
  isCommander: boolean;
  expeditionCount: number;
  numSelectedExpeditions: number;
  onConfirmForTeamBuild: () => void;
}> = ({
  isCommander,
  expeditionCount,
  numSelectedExpeditions,
  onConfirmForTeamBuild,
}) => {
  return (
    <div className="flex flex-col items-center">
      {isCommander ? (
        <div>
          <p>
            <span>{"당신은 "}</span>
            <CommanderText />
            <span>{"입니다. 이번 임무 수행에 참여할 "}</span>
            <TeamMemberText />
            <span>을 선택하세요.</span>
          </p>
        </div>
      ) : (
        <div>
          <CommanderText />
          <span>{"이 "}</span>
          <TeamMemberText />
          <span>을 구성하고 있습니다. 잠시 기다려주세요.</span>
        </div>
      )}
      <div className={cn("my-3 mb-2 text-lg")}>
        <span
          className={cn({
            "opacity-70": numSelectedExpeditions < expeditionCount,
            "text-red-600": numSelectedExpeditions > expeditionCount,
          })}
        >
          {numSelectedExpeditions}
        </span>
        <span className="mx-1">/</span>
        <span>{expeditionCount}</span>
      </div>
      {isCommander && (
        <ConfirmButton
          disabled={numSelectedExpeditions !== expeditionCount}
          onClick={onConfirmForTeamBuild}
        />
      )}
    </div>
  );
};

const VoteTeamBuildPhaseBoard: React.FC<{
  isApproved: boolean | null;
  isLastVote: boolean;
  onVote: (isApproved: boolean | null) => void;
}> = ({ isApproved, isLastVote, onVote }) => {
  return (
    <div>
      <div className="mb-[1em]">
        <div>
          <CommanderText />
          <span>{"이 "}</span>
          <TeamMemberText />
          <span>{"을 선정하였습니다. 찬반 투표를 진행해주세요."}</span>
        </div>
        {isLastVote && (
          <div>
            라운드의 마지막 투표입니다. 부결되면 악한 팀이 즉시 승리합니다.
          </div>
        )}
      </div>
      <Vote value={isApproved} onVote={onVote} />
    </div>
  );
};

const ExpeditionPhaseBoard: React.FC<{
  isExpedition: boolean;
  isGoodCamp: boolean;
  isApproved: boolean | null;
  onVote: (isApproved: boolean | null) => void;
}> = ({ isExpedition, isGoodCamp, isApproved, onVote }) => {
  return (
    <div>
      {isExpedition ? (
        <div>
          <div className="mb-[1em] space-y-2">
            <div>
              <span>{"당신은 이번 임무에 참여하는 "}</span>
              <TeamMemberText />
              <span>입니다.</span>
            </div>
            <div>
              임무 성공을 원한다면 <Bold className="text-blue-100">찬성</Bold>
              을, 그렇지 않으면 <Bold className="text-red-100">반대</Bold>에
              투표하세요.
            </div>
          </div>
          <Vote value={isApproved} isInFavorOnly={isGoodCamp} onVote={onVote} />
        </div>
      ) : (
        <div>
          <TeamText />
          <span>
            가 임무를 수행 중입니다. 모든 대원이 투표를 완료하면 결과가
            공개됩니다.
          </span>
        </div>
      )}
    </div>
  );
};

const AssassinationPhaseBoard: React.FC<{
  isAssassin: boolean;
  assassinationTargetSelected: boolean;
  onConfirmForAssassination: () => void;
}> = ({
  isAssassin,
  assassinationTargetSelected,
  onConfirmForAssassination,
}) => {
  return (
    <div className="space-y-2">
      <div>
        세번의 임무를 성공하였습니다. 하지만 <AssassinText />가 <MerlinText />을
        찾아내면 악한 팀이 승리할 수 있습니다.
      </div>
      <div>
        {isAssassin ? (
          <div className="flex flex-col items-center gap-2">
            <div>
              당신은 <AssassinText />
              입니다. <MerlinText />
              으로 의심되는 플레이어를 선택해주세요.
            </div>
            <ConfirmButton
              disabled={!assassinationTargetSelected}
              onClick={onConfirmForAssassination}
            />
          </div>
        ) : (
          <span>
            <AssassinText />는 <MerlinText />
            으로 의심되는 플레이어를 선택해주세요.
          </span>
        )}
      </div>
    </div>
  );
};

export const gameResultMap = {
  success: {
    winSide: "Citizen",
    message: "악한 팀이 멀린 암살에 실패하여 선한 팀이 승리하였습니다.",
  },
  assassinationFailure: {
    winSide: "Evil",
    message: "악한 팀이 멀린을 암살에 성공하여 악한 팀이 승리하였습니다.",
  },
  questFailure: {
    winSide: "Evil",
    message: "임무가 세번 실패하여 악한 팀이 승리하였습니다.",
  },
  voteFailure: {
    winSide: "Evil",
    message: "다섯 번째 투표가 부결되어 악한 팀이 승리하였습니다.",
  },
} satisfies Record<
  GameResult,
  {
    winSide: CharacterSide;
    message: string;
  }
>;

const CompletedPhaseBoard: React.FC<{
  myCamp: CharacterSide;
  result: GameResult;
}> = ({ myCamp, result }) => {
  const isWin = gameResultMap[result].winSide === myCamp;
  return (
    <div>
      <div
        className={cn("mb-2 text-center text-xl font-bold", {
          "text-green-500": isWin,
          "text-red-500": !isWin,
        })}
      >
        {isWin ? "승리" : "패배"}
      </div>
      <div>{gameResultMap[result].message}</div>
    </div>
  );
};

export default function (props: ControlBoardProps) {
  return (
    <div className="responsive-text">
      <ControlBoard {...props} />
    </div>
  );
}
