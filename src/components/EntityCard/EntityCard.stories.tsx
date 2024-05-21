import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { EntityCard } from "components";
import { characterDefinitions } from "resources";

const meta = {
  component: EntityCard,
  render: args => (
    <>
      <div style={{ fontSize: "10px", display: "flex" }}>
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
