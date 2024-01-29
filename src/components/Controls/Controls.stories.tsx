import { Controls } from "components";

// START OF UGLY STORYBOOK SUGAR
import type { Meta, StoryObj } from "@storybook/react";
const meta = {
  component: Controls,
} satisfies Meta<typeof Controls>;
export default meta;
type Story = StoryObj<typeof meta>;
// END OF UGLY STORYBOOK SUGAR

export const Empty: Story = {
  args: {},
};
