import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./divider";

const meta = {
  title: "Primitives/Divider",
  component: Divider,
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bare: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Divider />
    </div>
  ),
};

export const Labeled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Divider>or</Divider>
    </div>
  ),
};
