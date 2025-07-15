import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { EntityCard } from "components";
import { characterDefinitions } from "resources";

const meta = {
  component: EntityCard,
  render: args => (
    <>
      <div
        style={{
          fontSize: "10px",
          display: "flex",
          //height: "300px",
          width: "100%",
          background: "#191919",
          color: "#a0a0a0",
          fontFamily: "sans-serif",
        }}
      >
        <EntityCard {...args}></EntityCard>
      </div>
    </>
  ),
  args: {},
} satisfies Meta<typeof EntityCard>;
export default meta;
type Story = StoryObj<typeof meta>;

const entities = characterDefinitions;

export const Default: Story = {
  args: { entity: entities[0] },
};

export const E1: Story = {
  args: { entity: entities[1] },
};
export const E2: Story = {
  args: { entity: entities[2] },
};
export const E3: Story = {
  args: { entity: entities[3] },
};
export const E4: Story = {
  args: { entity: entities[4] },
};
export const E5: Story = {
  args: { entity: entities[5] },
};
export const E6: Story = {
  args: { entity: entities[6] },
};
export const E7: Story = {
  args: { entity: entities[7] },
};
