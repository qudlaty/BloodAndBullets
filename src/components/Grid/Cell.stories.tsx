import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cell } from "components";
import React from "react";

const meta = {
  component: Cell,
  render: args => (
    <div style={{ fontSize: "40px" }}>
      <Cell {...args}></Cell>
    </div>
  ),
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
