import type { Meta, StoryObj } from "@storybook/react";

import TeamVoteLogView from "./TeamVoteLogView.tsx";

const meta = {
  title: "components/logs/TeamVoteLogView",
  component: TeamVoteLogView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamVoteLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    countAgree: 4,
    countDisagree: 2,
  },
};
