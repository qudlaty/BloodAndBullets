import { Cell } from "components";

// START OF UGLY STORYBOOK SUGAR
import type { Meta, StoryObj } from "@storybook/react";
const meta = {
  component: Cell,
} satisfies Meta<typeof Cell>;
export default meta;
type Story = StoryObj<typeof meta>;
// END OF UGLY STORYBOOK SUGAR

export const Empty: Story = {
  args: {
    children: [],
  },
};
export const Light: Story = {
  args: {
    children: ["L"],
  },
};
