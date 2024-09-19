import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { myPlayer } from "playroomkit";

import { useDiscordSdk } from "@/hooks/useDiscordSdk";

export type DiscordParticipant = {
  id: string;
  name: string;
  avater: string | null;
  isSpeaking: boolean;
};

// TODO!
// Retrieve a type from @discord/embedded-app-sdk
export type DiscordParticipantPayload = {
  username: string;
  discriminator: string;
  id: string;
  bot: boolean;
  flags: number;
  avatar?: string | null | undefined;
  global_name?: string | null | undefined;
  avatar_decoration_data?:
    | {
        asset: string;
        skuId?: string | undefined;
      }
    | null
    | undefined;
  premium_type?: number | null | undefined;
  nickname?: string | undefined;
};

export type ParticipantsContext = {
  me: DiscordParticipant | undefined;
  participants: DiscordParticipant[];
  updateParticipant(participant: DiscordParticipant): void;
};

export const ParticipantsContext = createContext<ParticipantsContext | null>(
  null
);

export const ParticipantsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const discordSdk = useDiscordSdk();

  const [participants, setParticipants] = useState<DiscordParticipant[]>([]);

  // playerId from playroomkit is in the form of `DCD-${id}`
  const me = useMemo<DiscordParticipant | undefined>(() => {
    const myId = myPlayer().id.split("-")[1];
    const me = participants.find((participant) => participant.id == myId);
    return me;
  }, [participants]);

  useEffect(() => {
    discordSdk.commands
      .getInstanceConnectedParticipants()
      .then(({ participants }) => {
        setParticipants(participants.map(discordParticipantPayloadToPlayer));
      });
  }, []);

  useEffect(() => {
    discordSdk.subscribe(
      "ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE",
      handleActivityInstanceParticipantsUpdate
    );
    discordSdk.subscribe("SPEAKING_START", handleSpeakingStart, {});
    discordSdk.subscribe("SPEAKING_STOP", handleSpeakingStop, {});

    return () => {
      discordSdk.unsubscribe(
        "ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE",
        handleActivityInstanceParticipantsUpdate
      );
      discordSdk.unsubscribe("SPEAKING_START", handleSpeakingStart, {});
      discordSdk.unsubscribe("SPEAKING_STOP", handleSpeakingStop, {});
    };
  }, [discordSdk]);

  const handleActivityInstanceParticipantsUpdate = useCallback(
    ({ participants }: { participants: DiscordParticipantPayload[] }) => {
      setParticipants(participants.map(discordParticipantPayloadToPlayer));
    },
    [setParticipants]
  );

  const handleSpeakingStart = useCallback(
    ({ user_id }: { user_id: string }) => {
      setParticipants((playList) =>
        playList?.map((player) =>
          player.id === user_id
            ? {
                ...player,
                isSpeaking: true,
              }
            : player
        )
      );
    },
    [setParticipants]
  );

  const handleSpeakingStop = useCallback(
    ({ user_id }: { user_id: string }) => {
      setParticipants((playList) =>
        playList?.map((player) =>
          player.id === user_id
            ? {
                ...player,
                isSpeaking: false,
              }
            : player
        )
      );
    },
    [setParticipants]
  );

  const updateParticipant: ParticipantsContext["updateParticipant"] =
    useCallback(
      (player) => {
        setParticipants((players) =>
          players?.map((p) => (p.id === player.id ? player : p))
        );
      },
      [setParticipants]
    );

  const context: ParticipantsContext = useMemo(() => {
    return {
      me,
      participants,
      updateParticipant,
    };
  }, [participants, updateParticipant]);

  return (
    <ParticipantsContext.Provider value={context}>
      {children}
    </ParticipantsContext.Provider>
  );
};

function discordParticipantPayloadToPlayer(
  participant: DiscordParticipantPayload
): DiscordParticipant {
  return {
    id: participant.id,
    avater: participant.avatar ?? null,
    isSpeaking: false,
    name:
      participant.nickname ?? participant.global_name ?? participant.username,
  };
}
