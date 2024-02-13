import type { Meta, StoryObj } from "@storybook/react";
import { ShootingVisualization } from "components";
import React from "react";
import { WeaponType } from "services";

const styleTopLeft = { top: 0, left: 0, position: "absolute" };
const Description = () => (
  <>
    <div style={styleTopLeft as unknown}></div>
  </>
);

const meta = {
  component: ShootingVisualization,
  render: args => (
    <>
      <Description />
      <div style={{ fontSize: "40px", border: "1px solid red" }}>
        <ShootingVisualization {...args}></ShootingVisualization>
      </div>
    </>
  ),
  args: { isShooting: true, actionId: 4 },
} satisfies Meta<typeof ShootingVisualization>;
export default meta;
type Story = StoryObj<typeof meta>;

export const MidRangeLazerHorizontal: Story = {
  args: {
    position: { x: 0, y: 0 },
    targetPosition: { x: 4, y: 0 },
    weaponType: WeaponType.energy,
  },
};
export const MidRangeLazerDiagonal: Story = {
  args: {
    position: { x: 0, y: 0 },
    targetPosition: { x: 4, y: 2 },
    weaponType: WeaponType.energy,
  },
};

export const ShortRangeLazer: Story = {
  args: {
    position: { x: 0, y: 0 },
    targetPosition: { x: 2, y: 0 },
    weaponType: WeaponType.energy,
  },
};

export const ShortRangeProjectile: Story = {
  args: {
    position: { x: 0, y: 0 },
    targetPosition: { x: 2, y: 0 },
    weaponType: WeaponType.projectile,
  },
};
export const MidRangeProjectile: Story = {
  args: {
    position: { x: 0, y: 0 },
    targetPosition: { x: 4, y: 2 },
    weaponType: WeaponType.projectile,
  },
};