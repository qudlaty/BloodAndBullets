import type { Meta, StoryObj } from "@storybook/react";
import { SquareComponent } from "components";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  //title: "Square",
  component: SquareComponent,
  parameters: {
    backgrounds: {
      default: "dark",
    },
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof SquareComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/*
squareId: number;
className?: string;
onClick: (squareIndex: number) => void;
blood: number;
items: Item[]; // collection of objects
itemsNumber: number; // here to trigger update when list length changes
*/

export const Empty: Story = {
  args: {
    squareId: 0,
    onClick: () => {},
    blood: 0,
    items: [],
    itemsNumber: 0,
  },
};

export const Light: Story = {
  args: {
    squareId: 0,
    onClick: () => {},
    blood: 5,
    items: [],
    itemsNumber: 1,
  },
};
export const Heavy: Story = {
  args: {
    squareId: 0,
    onClick: () => {},
    blood: 20,
    items: [],
    itemsNumber: 5,
  },
};

//
export function SuperHeavy(): JSX.Element {
  //
  //
  const args = {
    squareId: 0,
    onClick: () => {},
    blood: 40,
    items: [],
    itemsNumber: 5,
  };
  return <SquareComponent {...args}></SquareComponent>;
}
