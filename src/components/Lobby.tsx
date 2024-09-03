import { useParticipants } from "@/hooks/useParticipants";

const Lobby: React.FC = () => {
  const { me } = useParticipants();

  return (
    <div>
      <div>Me: {me?.name}</div>
      <button>준비</button>
    </div>
  );
};

export default Lobby;
