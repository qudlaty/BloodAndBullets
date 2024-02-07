import type { Meta, StoryObj } from "@storybook/react";
import { Controls } from "components";

const meta = {
  component: Controls,
} satisfies Meta<typeof Controls>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {},
};
