import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { BorderStyle, FancyButton } from "components";

const meta = {
  component: FancyButton,
  render: args => (
    <>
      <div style={{ fontSize: "10px", display: "flex" }}>
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

export const CustomizedText: Story = {
  args: { children: ["Activate"], sideBorderWidthInPixels: 6 },
};
export const HeavilyCustomized: Story = {
  args: {
    children: ["Click This"],
    backgroundColor: "#CCC",
    backgroundColorHover: "#DDD",
    textColor: "#210",
    textColorHover: "#330",
    textColorActive: "#FF0C",
    sideBorderWidthInPixels: 4,
    sideBorderStyle: BorderStyle.dashed,
  },
};
