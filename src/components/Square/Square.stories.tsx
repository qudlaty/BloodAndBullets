import type { Meta, StoryObj } from "@storybook/react";
import { SquareComponent } from "components";
import { action } from "@storybook/addon-actions";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SquareComponent> = {
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
  argTypes: {
    onClick: { action: "clicked" },
  },
}; // satisfies Meta<typeof SquareComponent>;

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
const fontSize40px = { fontSize: "40px" };

export const Empty: Story = {
  args: {
    squareId: 0,
    blood: 0,
    items: [],
    itemsNumber: 0,
  },
};

export const Light: Story = {
  args: {
    squareId: 0,
    blood: 5,
    items: [],
    itemsNumber: 1,
  },
};
export const Heavy: Story = {
  args: {
    squareId: 0,
    blood: 20,
    items: [],
    itemsNumber: 5,
  },
  render: args => (
    <>
      <div style={fontSize40px}>
        <SquareComponent {...args}></SquareComponent>
      </div>
    </>
  ),
};

export function SuperHeavy(): JSX.Element {
  const args = {
    squareId: 0,
    onClick: action("clicked"),
    blood: 40,
    items: [],
    itemsNumber: 5,
  };

  return (
    <>
      <div style={fontSize40px}>
        <SquareComponent {...args}></SquareComponent>
      </div>
    </>
  );
}
