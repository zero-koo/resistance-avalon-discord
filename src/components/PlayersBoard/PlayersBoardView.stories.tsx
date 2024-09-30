import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { characterTypes } from "@/constants/characters";
import { gamePhases } from "@/contexts/GameStateContext";

import PlayersBoardView, { Player } from "./PlayersBoardView";

const players: Player[] = [
  {
    id: "player0",
    name: "PLAYER_0",
    character: "Citizen",
    camp: "Citizen",
    isSelected: false,
  },
  {
    id: "player1",
    name: "PLAYER_1",
    character: "Percival",
    camp: "Citizen",
    isSelected: false,
  },
  {
    id: "player2",
    name: "PLAYER_2",
    character: "Citizen",
    camp: "Citizen",
    isSelected: false,
  },
  {
    id: "player3",
    name: "PLAYER_3",
    character: "Morgana",
    camp: "Evil",
    isSelected: false,
  },
  {
    id: "player4",
    name: "PLAYER_4",
    character: "Citizen",
    camp: "Citizen",
    isSelected: false,
  },
  {
    id: "player5",
    name: "PLAYER_5",
    character: "Mordred",
    camp: "Evil",
    isSelected: false,
  },
  {
    id: "player6",
    name: "PLAYER_6",
    character: "Merlin",
    camp: "Citizen",
    isSelected: false,
  },
  {
    id: "player7",
    name: "PLAYER_7",
    character: "Evil",
    camp: "Evil",
    isSelected: false,
  },
  {
    id: "player8",
    name: "PLAYER_8",
    character: "Assassin",
    camp: "Evil",
    isSelected: false,
  },
  {
    id: "player9",
    name: "PLAYER_9",
    character: "Citizen",
    camp: "Citizen",
    isSelected: false,
  },
];

const meta = {
  title: "components/PlayersBoardView",
  component: PlayersBoardView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    phase: {
      control: "select",
      options: gamePhases,
    },
    myCharacter: {
      control: "select",
      options: characterTypes,
    },
    myIndex: {
      control: "number",
    },
    teamMemberIds: {
      control: "multi-select",
      options: players.map((player) => player.id),
    },
    assassinationTargetId: {
      control: "select",
      options: [null, ...players.map((player) => player.id)],
    },
    commanderIndex: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  },
  args: {
    commanderIndex: 0,
    assassinationTargetId: null,
    onSelectPlayer: fn(),
  },
} satisfies Meta<typeof PlayersBoardView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    phase: "compose-expeditions",
    myCharacter: "Percival",
    teamMemberIds: [],
    myIndex: 1,
    players,
  },
};
