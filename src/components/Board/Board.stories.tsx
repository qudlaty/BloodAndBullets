import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Board } from "components";

const meta = {
  component: Board,
  render: args => (
    <>
      <div style={{ fontSize: "40px" }}>
        <Board {...args}></Board>
      </div>
    </>
  ),
  args: {
    squares: [],
    entities: [],
    size: 5,
    isRotated: false,
  },
} satisfies Meta<typeof Board>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 10,
  },
};

export const Three: Story = {
  args: {
    size: 3,
  },
};
export const Twenty: Story = {
  args: {
    size: 20,
  },
};
