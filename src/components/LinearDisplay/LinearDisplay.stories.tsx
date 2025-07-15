import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { LinearDisplay } from "./LinearDisplay";
import * as HpStories from "../HpBar/HpBar.stories";

const meta: Meta<typeof LinearDisplay> = {
  component: LinearDisplay,
  args: { label: "HP" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Half: Story = {
  args: {
    current: 50,
    max: 100,
  },
};

export const PartialFromHpBar: Story = {
  args: (HpStories.Partial as unknown as Story).args,
};

export const Empty = HpStories.Empty as unknown as Story;
export const Full = HpStories.Full as unknown as Story;
export const Under = HpStories.Under as unknown as Story;
export const Over = HpStories.Over as unknown as Story;
