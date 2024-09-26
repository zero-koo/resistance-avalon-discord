import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { characterSide, characterTypes } from "@/constants/characters.ts";
import { gameResults } from "@/contexts/GameStateContext.tsx";

import ControlBoard from "./ControlBoard.tsx";

const meta = {
  title: "components/ControlBoard",
  component: ControlBoard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="w-[240px] text-sm">
      <Story />
    </div>
  ),
  argTypes: {
    myCamp: { control: "select", options: characterSide },
    myCharacter: { control: "select", options: characterTypes },
    isCommander: { control: "boolean" },
    isExpedition: { control: "boolean" },
    hasAgreedForQuest: { control: "select", options: [true, false, null] },
    hasAgreedForTeamBuild: { control: "select", options: [true, false, null] },
    numExpeditions: { control: "number" },
    numSelectedExpeditions: { contorl: "number" },
    assassinationTargetSelected: { control: "boolean" },
    countCompositionTrial: { control: "select", options: [1, 2, 3, 4, 5] },
  },
  args: {
    myCamp: "Citizen",
    myCharacter: "Citizen",
    countCompositionTrial: 1,
    gameResult: null,
    hasAgreedForQuest: null,
    hasAgreedForTeamBuild: null,
    isCommander: false,
    isExpedition: false,
    numExpeditions: 3,
    numSelectedExpeditions: 2,
    assassinationTargetSelected: false,
    onConfirmForTeamBuild: fn(),
    onVoteForQuest: fn(),
    onVoteForTeamBuild: fn(),
    onConfirmForAssassination: fn(),
  },
} satisfies Meta<typeof ControlBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TeamBuildPhase: Story = {
  args: {
    phase: "compose-expeditions",
  },
};
export const TeamBuildVotePhase: Story = {
  args: {
    phase: "vote-expeditions",
  },
};
export const QuestPhase: Story = {
  args: {
    phase: "expedition",
  },
};

export const AssassinationPhase: Story = {
  args: {
    phase: "assassination",
  },
};

export const GameEndPhase: Story = {
  argTypes: {
    gameResult: { control: "select", options: gameResults },
  },
  args: {
    phase: "completed",
    gameResult: "success",
  },
};
