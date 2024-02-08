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

/** A typical square */
export const Default: Story = {
  args: {
    squareId: 0,
    blood: 10,
    items: [],
    itemsNumber: 5,
  },
};

/** Just an empty square */
export const Empty: Story = {
  args: {
    squareId: 0,
    blood: 0,
    items: [],
    itemsNumber: 0,
  },
};

/** Light amount of blood */
export const Light: Story = {
  args: {
    squareId: 0,
    blood: 5,
    items: [],
    itemsNumber: 1,
  },
};

/** Heavy amount of blood */
export const Heavy: Story = {
  args: {
    squareId: 0,
    blood: 20,
    items: [],
    itemsNumber: 5,
  },
};

/** Super Heavy amount of blood and an action attached */
export const SuperHeavy: Story = {
  args: {
    squareId: 0,
    onClick: action("clicked"),
    blood: 40,
    items: [],
    itemsNumber: 5,
  },
};
