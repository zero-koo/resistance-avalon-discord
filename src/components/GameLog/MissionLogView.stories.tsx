import type { Meta, StoryObj } from "@storybook/react";

import MissionLogView from "./MissionLogView.tsx";

const meta = {
  title: "components/logs/MissionLogView",
  component: MissionLogView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MissionLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    countAgree: 2,
    countDisagree: 1,
    isSuccess: false,
  },
};
