import { createContext, useContext, useMemo } from "react";

import { CharacterType, OptionalCharacterType } from "@/constants/characters";
import { characterListFromSetting, shuffle } from "@/lib/game";
import { useGameSetting } from "@/hooks/useGameSetting";
import { useMultiplayerState } from "@/hooks/useMultiplayerState";
import { useParticipants } from "@/hooks/useParticipants";
import { usePlayers } from "@/hooks/usePlayers";

export type GameState = {
  isStarted: boolean;
  round: number;
  phase: GamePhase;
  playerState: Record<string, PlayerState>;
  myPlayerState: PlayerState;
  commanderIndex: number;
  countCompositionTrial: number;
  selectedExpeditionIds: string[];
  expeditionIds: string[];
  expeditionResultPerRound: Array<boolean | null>;
  assassinateTargetId: string | null;
  result: GameResult | null;
};

export const gameResults = [
  "success",
  "assassinationFailure",
  "questFailure",
  "voteFailure",
] as const;

export type GameResult = (typeof gameResults)[number];

export const gamePhases = [
  "compose-expeditions",
  "vote-expeditions",
  "expedition",
  "assassination",
  "completed",
] as const;

export type GamePhase = (typeof gamePhases)[number];

export type PlayerState = {
  id: string;
  order: number;
  characterType: CharacterType;
  isSelected: boolean;
  isExpedition: boolean;
  hasAgreedForComposition: boolean | null;
  hasAgreedOnExpedition: boolean | null;
};

export type GameStateContext = GameState & {
  handleStartGame(): void;
  handleChangeExpeditionComposition(
    playerId: string,
    isSelected: boolean
  ): void;
  handleCompleteExpeditionComposition(): void;
  handleVoteForExpeditionComposition(isAgree: boolean | null): void;
  handleVoteOnExpedition(isAgree: boolean | null): void;
  handleChangeAssassinateTarget(playerId: string): void;
  handleConfirmAssassinate(): void;
};

const GameStateContext = createContext<GameStateContext | null>(null);

export const GameStateProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { gameSetting } = useGameSetting();
  const { me } = useParticipants();
  const { playerIds } = usePlayers();
  const [isStarted, setIsStarted] = useMultiplayerState<boolean>(
    "is-started",
    false
  );
  const [round, setRound] = useMultiplayerState<number>("round", 0);
  const [phase, setPhase] = useMultiplayerState<GamePhase>(
    "game-phase",
    "compose-expeditions"
  );
  const [playerState, setPlayerState] = useMultiplayerState<
    Record<string, PlayerState>
  >("player-state", {});
  const [defaultPlayerState, setDefaultPlayerState] = useMultiplayerState<
    Record<string, PlayerState>
  >("default-player-state", {});
  const [commanderIndex, setCommanderIndex] = useMultiplayerState<number>(
    "commander-index",
    0
  );
  const [countCompositionTrial, setCountCompositionTrial] =
    useMultiplayerState<number>("count-composition-trial", 1);
  const selectedExpeditionIds = useMemo<string[]>(() => {
    return Object.values(playerState)
      .filter((player) => player.isExpedition)
      .map((player) => player.id);
  }, [playerState]);
  const [expeditionIds, setExpeditionIds] = useMultiplayerState<string[]>(
    "expedition-ids",
    []
  );
  const [expeditionResultPerRound, setExpeditionResultPerRound] =
    useMultiplayerState<Array<boolean | null>>("expedition-result", []);
  const [assassinateTargetId, setAssassinateTargetId] = useMultiplayerState<
    string | null
  >("assassinate-target", null);

  const [result, setResult] = useMultiplayerState<GameResult | null>(
    "game-result",
    null
  );

  const handleStartGame = () => {
    if (playerIds.length < gameSetting.numPlayers) {
      throw Error("Not enough ready players!");
    }

    const characters = initCharacterTypes({
      numPlayers: gameSetting.numPlayers,
      optionalCitizens: gameSetting.selectedOptionalCitizens,
      optionalDevils: gameSetting.selectedOptionalDevils,
    });

    const players = initPlayers({
      playerIds,
      characters,
    });
    setPlayerState(players);
    setDefaultPlayerState(players);
    setIsStarted(true);
  };

  const handleChangeExpeditionComposition = (
    playerId: string,
    isSelected: boolean
  ) => {
    setPlayerState({
      ...playerState,
      [playerId]: {
        ...playerState[playerId],
        isExpedition: isSelected,
      },
    });
  };

  const handleCompleteExpeditionComposition = () => {
    if (selectedExpeditionIds.length < gameSetting.numExpeditions[round])
      return;
    setExpeditionIds(selectedExpeditionIds);
    setPhase("vote-expeditions");
  };

  const handleVoteForExpeditionComposition = (isAgree: boolean) => {
    if (!me) return;
    const updatedPlayerState = {
      ...playerState,
      [me.id]: {
        ...playerState[me.id],
        hasAgreedForComposition: isAgree,
      },
    };
    setPlayerState(updatedPlayerState);

    const allVoted = Object.values(updatedPlayerState).every(
      (player) => player.hasAgreedForComposition !== null
    );

    if (!allVoted) return;

    const agreeingPlayers = Object.values(updatedPlayerState).filter(
      (player) => player.hasAgreedForComposition === true
    );
    const disagreeingPlayers = Object.values(updatedPlayerState).filter(
      (player) => player.hasAgreedForComposition === false
    );

    if (agreeingPlayers.length > disagreeingPlayers.length) {
      setPhase("expedition");
      return;
    }

    if (countCompositionTrial >= 5) {
      setResult("voteFailure");
      setPhase("completed");
      return;
    }

    setCountCompositionTrial(countCompositionTrial + 1);
    setCommanderIndex((commanderIndex + 1) % gameSetting.numPlayers);
    setPlayerState({
      ...defaultPlayerState,
    });
    setPhase("compose-expeditions");
  };

  const handleVoteOnExpedition = (isAgree: boolean | null) => {
    if (!me) return;
    const updatedPlayerState = {
      ...playerState,
      [me.id]: {
        ...playerState[me.id],
        hasAgreedOnExpedition: isAgree,
      },
    };
    setPlayerState(updatedPlayerState);

    const expeditions = expeditionIds.map(
      (playerId) => updatedPlayerState[playerId]
    );
    const votedExpeditions = expeditions.filter(
      (player) => player.hasAgreedOnExpedition !== null
    );

    if (votedExpeditions.length < expeditions.length) return;

    // 투표 완료
    setPlayerState({
      ...defaultPlayerState,
    });

    const disagreeCount = votedExpeditions.filter(
      (player) => player.hasAgreedOnExpedition === false
    ).length;

    const isSuccess =
      disagreeCount === 0 ||
      (round === 4 && gameSetting.numPlayers >= 7 && disagreeCount === 1);
    const updatedExpeditionResultPerRound = [
      ...expeditionResultPerRound,
      isSuccess,
    ];
    setExpeditionResultPerRound([...expeditionResultPerRound, isSuccess]);
    setExpeditionIds([]);

    const successCount = updatedExpeditionResultPerRound.filter(
      (flag) => flag === true
    ).length;
    // 3번 성공했으면 시민 승리 -> assassination
    if (successCount >= 3) {
      setPhase("assassination");
      return;
    }

    // 현재까지의 성공횟수와 남아있는 라운드수의 합이 3 미만이면 시민 패배
    if (successCount + (4 - round) < 3) {
      setResult("questFailure");
      setPhase("completed");
      return;
    }

    // 다음 라운드 진행
    setRound(round + 1);
    setCountCompositionTrial(1);
    setCommanderIndex((commanderIndex + 1) % gameSetting.numPlayers);
    setPhase("compose-expeditions");
  };

  const handleChangeAssassinateTarget = (playerId: string) => {
    setAssassinateTargetId(playerId);
  };

  const handleConfirmAssassinate = () => {
    if (!assassinateTargetId) return;
    setResult(
      playerState[assassinateTargetId].characterType === "Merlin"
        ? "assassinationFailure"
        : "success"
    );
    setPhase("completed");
  };

  return (
    <GameStateContext.Provider
      value={{
        isStarted,
        phase,
        round,
        playerState,
        myPlayerState: playerState[me?.id ?? ""], // TODO!
        commanderIndex,
        countCompositionTrial,
        selectedExpeditionIds,
        expeditionIds,
        expeditionResultPerRound,
        assassinateTargetId,
        result,
        handleStartGame,
        handleChangeExpeditionComposition,
        handleCompleteExpeditionComposition,
        handleVoteForExpeditionComposition,
        handleVoteOnExpedition,
        handleChangeAssassinateTarget,
        handleConfirmAssassinate,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw Error("GameStateContext must be provided!");
  }
  return context;
};

function initPlayers({
  playerIds,
  characters,
}: {
  playerIds: string[];
  characters: CharacterType[];
}): Record<string, PlayerState> {
  if (playerIds.length !== characters.length) {
    throw Error(
      "The number of players and the number of characters should be identical!"
    );
  }

  const players = shuffle(playerIds).reduce(
    (map, playerId, index) => {
      map[playerId] = {
        id: playerId,
        order: index,
        characterType: characters[index],
        isSelected: false,
        isExpedition: false,
        hasAgreedForComposition: null,
        hasAgreedOnExpedition: null,
      };
      return map;
    },
    {} as Record<string, PlayerState>
  );

  return players;
}

function initCharacterTypes(params: {
  numPlayers: number;
  optionalCitizens: OptionalCharacterType[];
  optionalDevils: OptionalCharacterType[];
}): CharacterType[] {
  return shuffle(characterListFromSetting(params));
}
