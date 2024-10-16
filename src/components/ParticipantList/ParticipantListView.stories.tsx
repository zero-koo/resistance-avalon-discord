import type { Meta, StoryObj } from "@storybook/react";

import ParticipantListView from "./ParticipantListView";

const meta = {
  title: "components/ParticipantListView",
  component: ParticipantListView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<typeof ParticipantListView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    myId: "player2",
    participants: [
      {
        id: "player0",
        isReady: false,
        isSpeaking: false,
        name: "PLAYER_0",
      },
      {
        id: "player1",
        isReady: true,
        isSpeaking: false,
        name: "PLAYER_1",
      },
      {
        id: "player2",
        isReady: true,
        isSpeaking: true,
        name: "PLAYER_2",
      },
      {
        id: "player3",
        isReady: false,
        isSpeaking: true,
        name: "PLAYER_3",
      },
      {
        id: "player4",
        isReady: true,
        isSpeaking: true,
        name: "PLAYER_4",
      },
      {
        id: "player5",
        isReady: false,
        isSpeaking: false,
        name: "PLAYER_5",
      },
      {
        id: "player6",
        isReady: false,
        isSpeaking: false,
        name: "PLAYER_6",
      },
      {
        id: "player7",
        isReady: false,
        isSpeaking: false,
        name: "PLAYER_7",
      },
    ],
  },
};
