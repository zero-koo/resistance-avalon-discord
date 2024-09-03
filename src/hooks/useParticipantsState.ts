import { useContext } from "react";
import { ParticipantsContext } from "@/contexts/ParticipantsContext";

export const useParticipantsState = () => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw Error("ParticipantsContextProvider should be provided!");
  }

  return context;
};
