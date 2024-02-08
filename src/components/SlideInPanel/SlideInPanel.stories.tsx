import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SlideInPanel } from "./SlideInPanel";

const meta: Meta<typeof SlideInPanel> = {
  component: SlideInPanel,
  args: {
    children: <ChildrenForPanel />,
  },
  parameters: {
    layout: "fullscreen",
  },
  render: args => (
    <div
      style={{
        //
        height: "300px",
        width: "100%",
      }}
    >
      <SlideInPanel {...args}></SlideInPanel>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InitiallyClosed: Story = {
  args: {
    initiallyOpen: false,
    title: "Click Me",
  },
};
export const InitiallyOpen: Story = {
  args: {
    initiallyOpen: true,
    title: "Click Me",
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
