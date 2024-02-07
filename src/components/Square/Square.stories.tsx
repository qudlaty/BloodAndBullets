import type { Meta, StoryObj } from "@storybook/react";
import { SquareComponent } from "components";
import { action } from "@storybook/addon-actions";
import React from "react";

const meta: Meta<typeof SquareComponent> = {
  component: SquareComponent,
  argTypes: {
    onClick: { action: "clicked" },
  },
  render: args => (
    <>
      <div style={fontSize40px}>
        <SquareComponent {...args}></SquareComponent>
      </div>
    </>
  ),
}; // satisfies Meta<typeof SquareComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

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
};

export const SuperHeavy: Story = {
  args: {
    squareId: 0,
    onClick: action("clicked"),
    blood: 40,
    items: [],
    itemsNumber: 5,
  },
};
