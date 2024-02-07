import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SlideInPanel } from "./SlideInPanel";

const meta: Meta<typeof SlideInPanel> = {
  component: SlideInPanel,
  args: {
    children: <ChildrenForPanel />,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    initiallyOpen: false,
  },
};
export const Open: Story = {
  args: {
    initiallyOpen: true,
  },
};

export const OpenWithTitle: Story = {
  args: {
    initiallyOpen: true,
    title: "Alpha",
  },
};
export const ClosedWithTitle: Story = {
  args: {
    initiallyOpen: false,
    title: "Alpha",
  },
};

function ChildrenForPanel() {
  const styleDiv100x50 = { width: "100px", height: "50px" };
  const styleDivGreen = { background: "green" };
  const text = "LoremIpsum Dolor Sit Amet";
  return (
    <>
      <div style={{ ...styleDiv100x50, ...styleDivGreen }}>{text}</div>
      <div style={{ ...styleDiv100x50 }}>{text}</div>
      <div style={{ ...styleDiv100x50, ...styleDivGreen }}>{text}</div>
    </>
  );
}
