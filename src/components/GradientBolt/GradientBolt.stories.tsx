import type { Meta, StoryObj } from "@storybook/react-vite";
import { GradientBolt } from "components";
import React from "react";
import { WeaponType } from "services";

const styleTopLeft = { top: 0, left: 0, position: "absolute" };
const Description = () => (
  <>
    <div style={styleTopLeft as unknown}></div>
  </>
);

const meta = {
  component: GradientBolt,
  render: args => (
    <>
      <Description />
      <div style={{ fontSize: "40px", border: "1px solid red", position: "relative", width: "1em", height: "1em" }}>
        <GradientBolt {...args}></GradientBolt>
      </div>
    </>
  ),
  args: {
    version: Math.floor(Math.random() * 8),
    lineOfFireLength: "40em",
    boltFlightTimeInHundredsOfMs: 10,
  },
} satisfies Meta<typeof GradientBolt>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Version_0: Story = {
  args: {
    version: 0,
  },
};

export const Version_1: Story = {
  args: {
    version: 1,
  },
};
export const Version_2: Story = {
  args: {
    version: 2,
  },
};
export const Version_3: Story = {
  args: {
    version: 3,
  },
};
export const Version_4: Story = {
  args: {
    version: 4,
  },
};
export const Version_5: Story = {
  args: {
    version: 5,
  },
};
export const Version_6: Story = {
  args: {
    version: 6,
  },
};
export const Version_7: Story = {
  args: {
    version: 7,
  },
};
