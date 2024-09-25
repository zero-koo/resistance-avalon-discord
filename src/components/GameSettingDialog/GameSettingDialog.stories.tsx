import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import GameSettingDialog from "./GameSettingDialog.tsx";

const meta = {
  title: "components/GameSettingDialog",
  component: GameSettingDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChangeSetting: fn() },
} satisfies Meta<typeof GameSettingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
