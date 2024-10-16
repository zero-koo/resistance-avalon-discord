import PlayerAvatar from "../PlayerAvatar";

type PlayerListProps = {
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    isReady: boolean;
    isSpeaking: boolean;
  }>;
  myId?: string;
  menu?: React.ReactNode;
};

const PlayerListView = ({ participants, myId, menu }: PlayerListProps) => {
  const myPlayer = participants.find((player) => player.id === myId);
  const otherPlayers = participants.filter((player) => player.id !== myId);
  return (
    <div className="flex w-full flex-col md:absolute md:bottom-3 md:right-0 md:top-3 md:w-fit">
      <div className="flex flex-1 flex-col">
        <div className="responsive-text mb-2 flex gap-3 text-sm md:flex-col">
          <div>
            <span>플레이어</span>
            <span>{" ("}</span>
            <span>{participants.length}</span>
            <span>{")"}</span>
          </div>
        </div>
        <div className="relative flex w-full flex-1 gap-x-5 gap-y-8 bg-slate-100/10 p-4 pb-7 md:w-fit md:flex-col md:rounded-l-xl">
          {otherPlayers
            .sort((_, curr) => (curr.isReady ? 1 : -1))
            .map((player) => (
              <Player
                key={player.id}
                avatar={player.avatar}
                name={player.name}
                isReady={player.isReady}
                isSpeaking={player.isSpeaking}
              />
            ))}
          <div className="ml-auto mt-auto border-b border-r" />
          <Player {...myPlayer} />
          <div className="absolute right-0 top-0 -translate-y-full p-3 md:bottom-0 md:left-0 md:top-auto md:-translate-x-full md:translate-y-0">
            {menu}
          </div>
        </div>
      </div>
    </div>
  );
};

const Player = ({
  avatar,
  name,
  isSpeaking,
  isReady,
}: {
  avatar?: string;
  name?: string;
  isSpeaking?: boolean;
  isReady?: boolean;
}) => {
  return (
    <div className="relative">
      <PlayerAvatar
        character={null}
        side={null}
        avatar={avatar}
        playerName={name}
        isSpeaking={isSpeaking}
        size="sm"
      />
      {isReady && (
        <div className="responsive-text absolute left-1/2 top-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2 rounded-sm bg-gray-900/80 p-2 py-0.5 font-bold">
          READY
        </div>
      )}
    </div>
  );
};

export default PlayerListView;
