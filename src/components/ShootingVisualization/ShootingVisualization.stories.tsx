import type { Meta, StoryObj } from "@storybook/react";
import { ShootingVisualization } from "components";
import React from "react";
import { WeaponType } from "services";

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
  args: {
    position: { x: 0, y: 0 },
    targetPosition: { x: 4, y: 0 },
    icon: "X",
    actionPoints: 4,
    weaponType: WeaponType.energy,
  },
};
