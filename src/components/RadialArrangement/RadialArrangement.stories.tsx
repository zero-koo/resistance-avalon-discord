import type { Meta, StoryObj } from "@storybook/react";

import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import RadialArrangement from "./RadialArrangement";

const meta = {
  title: "components/RadialArrangement",
  component: RadialArrangement,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rotateAngle: {
      control: "number",
    },
  },
} satisfies Meta<typeof RadialArrangement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: Array.from({ length: 10 }, () => (
      <PlayerAvatar
        playerName="홍길동"
        isSpeaking
        isExpedition
        isCommander
        isAssassinationTarget
      />
    )),
    size: 400,
    rotateAngle: 30,
  },
};
