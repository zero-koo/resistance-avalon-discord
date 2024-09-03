import { Dispatch, SetStateAction } from "react";
import { useMultiplayerState as usePlayroomMultiplayerState } from "playroomkit";

export const useMultiplayerState = <S>(key: string, initialValue: S) => {
  return usePlayroomMultiplayerState(key, initialValue) as [
    S,
    Dispatch<SetStateAction<S>>,
  ];
};
