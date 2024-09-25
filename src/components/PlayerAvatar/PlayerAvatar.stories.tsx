import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import PlayerAvatar from "./PlayerAvatar";

const meta = {
  title: "components/PlayerAvatar",
  component: PlayerAvatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    playerName: {
      control: "text",
    },
    isSpeaking: {
      control: "boolean",
    },
    side: {
      control: "select",
      options: [null, "Citizen", "Evil"],
    },
    character: {
      control: "select",
      options: [
        null,
        "Merlin",
        "Percival",
        "Morgana",
        "Mordred",
        "Assassin",
        "Citizen",
        "Evil",
        "Oberon",
      ],
    },
    isCommander: {
      control: "boolean",
    },
    isExpedition: {
      control: "boolean",
    },
    isSelected: {
      control: "boolean",
    },
    isAssassinationTarget: {
      control: "boolean",
    },
  },
  args: { onToggleSelect: fn() },
} satisfies Meta<typeof PlayerAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    playerName: "ABCDEFG",
    isCommander: true,
    isExpedition: true,
    isSpeaking: true,
    side: "Citizen",
    character: "Merlin",
    isSelected: false,
    isAssassinationTarget: false,
    selectable: false,
    showCharacter: false,
  },
};
