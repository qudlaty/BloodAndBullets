import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { InventoryItem } from "./InventoryItem";
import { L30, M16, M37, M40, R40 } from "resources";

const meta: Meta<typeof InventoryItem> = {
  component: InventoryItem,
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
      <InventoryItem {...args}></InventoryItem>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const R40ShowingNoReload: Story = {
  args: {
    item: new R40(),
  },
};
export const L30ShowingNoInteract: Story = {
  args: {
    item: new L30(),
    onInteract: null,
  },
};
export const M16ShowingNoDrop: Story = {
  args: {
    item: new M16(),
    onDrop: null,
  },
};
export const M37CustomInteractButtonText: Story = {
  args: {
    item: new M37(),
    interactButtonText: "Handle",
  },
};
export const M40ShorterDisplayAndCustomInteractText: Story = {
  args: {
    item: new M40(),
    shorterDisplay: true,
    interactButtonText: "Pick up",
  },
};
