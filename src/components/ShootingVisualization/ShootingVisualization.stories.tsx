import type { Meta, StoryObj } from "@storybook/react";
import { ShootingVisualization } from "components";
import React from "react";

const meta = {
  component: ShootingVisualization,
  render: args => (
    <div style={{ fontSize: "40px" }}>
      <ShootingVisualization {...args}></ShootingVisualization>
    </div>
  ),
} satisfies Meta<typeof ShootingVisualization>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {},
};
