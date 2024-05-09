import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FancyButton } from "components";

const meta = {
  component: FancyButton,
  render: args => (
    <>
      <div style={{ fontSize: "10px" }}>
        <FancyButton {...args}></FancyButton>
      </div>
    </>
  ),
  args: {},
} satisfies Meta<typeof FancyButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Three: Story = {
  args: {},
};
export const Twenty: Story = {
  args: {},
};
