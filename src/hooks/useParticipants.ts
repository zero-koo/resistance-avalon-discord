import { useContext } from "react";

import { ParticipantsContext } from "@/contexts/ParticipantsContext";

export const useParticipants = () => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw Error("ParticipantsContext should be provided!");
  }

  return context;
};
