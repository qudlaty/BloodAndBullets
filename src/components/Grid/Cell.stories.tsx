import type { Meta, StoryObj } from "@storybook/react";
import { Cell } from "components";

const meta = {
  component: Cell,
} satisfies Meta<typeof Cell>;
export default meta;
type Story = StoryObj<typeof meta>;

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
