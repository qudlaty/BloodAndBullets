import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "components";

const meta = {
  component: Grid,
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    width: 2,
    height: 2,
    startAt: [10, 13],
  },
};

export const Horizontal: Story = {
  args: {
    width: 9,
    height: 0,
    startAt: [10, 13],
  },
};

export const Vertical: Story = {
  args: {
    width: 0,
    height: 9,
    startAt: [1337, 200],
  },
};

export const TenByTen: Story = {
  args: {
    width: 9,
    height: 9,
    startAt: [2137, 200],
  },
};
