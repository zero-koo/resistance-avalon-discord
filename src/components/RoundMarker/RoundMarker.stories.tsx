import type { Meta, StoryObj } from "@storybook/react";

import RoundMarker from "./RoundMarker";

const meta = {
  title: "components/RoundMarker",
  component: RoundMarker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    round: { control: "number" },
    questSuccess: { control: "boolean" },
    isCurrent: { control: "boolean" },
  },
} satisfies Meta<typeof RoundMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    round: 0,
    questSuccess: null,
    numExpeditions: 3,
  },
};
export const Success: Story = {
  args: {
    round: 1,
    questSuccess: true,
    numExpeditions: 4,
  },
};
export const Fail: Story = {
  args: {
    round: 2,
    questSuccess: false,
    numExpeditions: 3,
  },
};
