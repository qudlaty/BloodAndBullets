import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { InfoPanel } from "./InfoPanel";
import { L30, M16, M37, M40, R40 } from "resources";

const meta: Meta<typeof InfoPanel> = {
  component: InfoPanel,
  args: {},
  parameters: {
    layout: "fullscreen",
  },
  render: args => (
    <div
      style={{
        //
        height: "300px",
        width: "100%",
        background: "#191919",
        color: "#a0a0a0",
        fontFamily: "sans-serif",
      }}
    >
      <InfoPanel {...args}></InfoPanel>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const R40Info: Story = {
  args: {
    title: "Item details",
    item: new R40(),
  },
};
export const L30Info: Story = {
  args: {
    title: "Item details",
    item: new L30(),
  },
};
export const M16Info: Story = {
  args: {
    title: "Item details",
    item: new M16(),
  },
};
export const M37Info: Story = {
  args: {
    title: "Item details",
    item: new M37(),
  },
};
export const M40Info: Story = {
  args: {
    title: "Item details",
    item: new M40(),
  },
};

export const M40InfoWithoutTitle: Story = {
  args: {
    item: new M40(),
  },
};

export const M40InfoWithoutItemName: Story = {
  args: {
    title: "Item Details",
    item: { ...new M40(), name: null },
  },
};

export const M40InfoWithoutTitleOrItemName: Story = {
  args: {
    item: { ...new M40(), name: null },
  },
};
