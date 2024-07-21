import type { Meta, StoryObj } from "@storybook/react";
import { Board, BoardProps, DragScrollArea } from "components";
import { Twenty } from "components/Board/Board.stories";

import React from "react";
const containerStyle = {
  fontSize: "40px",
  width: 300,
  height: 300,
  border: "1px solid white",
  overflow: "hidden",
  position: "relative",
  //
} as React.CSSProperties;
const meta = {
  component: DragScrollArea,
  render: args => (
    <div style={containerStyle}>
      <DragScrollArea {...args}></DragScrollArea>
    </div>
  ),
} satisfies Meta<typeof DragScrollArea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    children: [],
  },
};

export const SimpleText = args => (
  <div style={containerStyle}>
    <DragScrollArea {...args}>
      <pre>Lorem ipsum dolor sit amet</pre>
    </DragScrollArea>
  </div>
);

export const WithBoard = args => (
  <div style={containerStyle}>
    <DragScrollArea {...args}>
      <Board {...(Twenty.args as BoardProps)}></Board>
    </DragScrollArea>
  </div>
);

export const WithBoardRotated = args => (
  <div style={containerStyle}>
    <DragScrollArea {...args}>
      <Board {...(Twenty.args as BoardProps)} isRotated={true}></Board>
    </DragScrollArea>
  </div>
);

export const Light: Story = {
  args: {
    children: ["L"],
  },
};
