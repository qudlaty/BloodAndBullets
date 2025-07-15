import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "components";

const meta = {
  component: Grid,
  args: {
    cellBorderColor: "#bbac3b",
  },
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeByThree: Story = {
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

export const Forty: Story = {
  args: {
    width: 39,
    height: 39,
    startAt: [10, 10],
    cellSize: 10,
    gapSize: 5,
  },
};

export const TenButSmall: Story = {
  args: {
    width: 9,
    height: 9,
    startAt: [10, 10],
    cellSize: 4,
    gapSize: 4,
    cellBorderColor: "white",
  },
};
