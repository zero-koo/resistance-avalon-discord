import type { Meta, StoryObj } from "@storybook/react";

import RootProvider from "@/contexts/RootProvider";

import PlayersBoard from ".";

const meta = {
  title: "components/PlayersBoard",
  component: PlayersBoard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: (Story) => (
    <RootProvider>
      <Story />
    </RootProvider>
  ),
  // More on argTypes: https://storybook.js.org/docs/api/argtypes,
} satisfies Meta<typeof PlayersBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};
