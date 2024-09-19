import type { Meta, StoryObj } from "@storybook/react";

import RoundBoard from "./RoundBoard";

const meta = {
  title: "components/RoundBoard",
  component: RoundBoard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    currentRound: { control: "number" },
  },
} satisfies Meta<typeof RoundBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    currentRound: 3,
    rounds: [
      {
        questSuccess: true,
        numExpeditions: 3,
      },
      {
        questSuccess: false,
        numExpeditions: 2,
      },
      {
        questSuccess: true,
        numExpeditions: 3,
      },
      {
        questSuccess: null,
        numExpeditions: 2,
      },
      {
        questSuccess: null,
        numExpeditions: 3,
      },
    ],
  },
};
