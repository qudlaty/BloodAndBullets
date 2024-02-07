import type { Meta, StoryObj } from "@storybook/react";
import { Board } from "components";

const meta = {
  component: Board,
} satisfies Meta<typeof Board>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    squares: [],
    entities: [],
    size: 10,
    isRotated: false,
  },
};
