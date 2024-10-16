import { useParticipants } from "@/hooks/useParticipants";
import { usePlayers } from "@/hooks/usePlayers";

import ParticipantListView from "./ParticipantListView";

const ParticipantList = ({
  participantMenu,
}: {
  participantMenu?: React.ReactNode;
}) => {
  const { me, participants } = useParticipants();
  const { playerIds } = usePlayers();

  return (
    <ParticipantListView
      myId={me?.id}
      participants={participants.map((participant) => ({
        ...participant,
        isReady: playerIds.includes(participant.id),
      }))}
      menu={participantMenu}
    />
  );
};

export default ParticipantList;
