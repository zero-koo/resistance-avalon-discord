import type { Meta, StoryObj } from "@storybook/react";

import GameSettingForm from "./GameSettingForm.tsx";

const meta = {
  title: "components/GameSettingForm",
  component: GameSettingForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-w-[400px] max-w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameSettingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    formId: "form-id",
  },
};
