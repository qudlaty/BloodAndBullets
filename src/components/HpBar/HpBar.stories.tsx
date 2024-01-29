import React from "react";
import { HpBar } from "components";

// START OF UGLY STORYBOOK SUGAR
import type { Meta, StoryObj } from "@storybook/react";
const meta = {
  component: HpBar,
} satisfies Meta<typeof HpBar>;
export default meta;
type Story = StoryObj<typeof meta>;
// END OF UGLY STORYBOOK SUGAR

export const Full: Story = {
  render: args => (
    <div style={{ fontSize: 80, width: "1em", height: "1em", border: `1px solid rgba(200,200,200,0.5)` }}>
      <HpBar {...args}></HpBar>
    </div>
  ),
  args: {
    current: 100,
    max: 100,
    color: "green",
  },
};

export const Empty: Story = {
  args: {
    current: 0,
    max: 100,
    color: "green",
  },
};

export const Partial: Story = {
  args: {
    current: 66,
    max: 100,
    color: "green",
  },
};
export const Over: Story = {
  args: {
    current: 125,
    max: 100,
    color: "green",
  },
};
export const Under: Story = {
  args: {
    current: -15,
    max: 100,
    color: "green",
  },
};

export const Red: Story = {
  args: {
    current: 666,
    max: 1000,
    color: "red",
  },
};
