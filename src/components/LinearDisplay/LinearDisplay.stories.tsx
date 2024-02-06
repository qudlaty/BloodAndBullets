import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LinearDisplay } from "./LinearDisplay";
import * as HpStories from "../HpBar/HpBar.stories";

const meta: Meta<typeof LinearDisplay> = {
  component: LinearDisplay,
  args: { label: "HP" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    current: 50,
    max: 100,
  },
};

export const Second: Story = {
  args: (HpStories.Partial as unknown as Story).args,
};
