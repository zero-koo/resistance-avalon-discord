import type { Meta, StoryObj } from "@storybook/react";

import TeamBuildLogView from "./TeamBuildLogView.tsx";

const meta = {
  title: "components/logs/TeamBuildLogView",
  component: TeamBuildLogView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamBuildLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    round: 2,
    subRound: 3,
    commander: "홍길동",
    teamMembers: ["김이박", "이박김", "박이김"],
  },
};
