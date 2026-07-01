import type { Meta, StoryObj } from "@storybook/react-vite";
import { Meter } from "./meter";

const meta = {
  title: "Primitives/Meter",
  component: Meter,
  tags: ["autodocs"],
  args: { value: 2, max: 3, tone: "accent" },
  argTypes: {
    tone: { control: "select", options: ["accent", "warn", "danger"] },
  },
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = { args: { value: 2, max: 3, tone: "accent" } };
export const Warn: Story = { args: { value: 24, max: 25, tone: "warn" } };
export const Danger: Story = { args: { value: 25, max: 25, tone: "danger" } };

export const Stack: Story = {
  render: () => (
    <div
      style={{ width: 280, display: "flex", flexDirection: "column", gap: 16 }}
    >
      <Meter value={2} max={3} tone="accent" />
      <Meter value={24} max={25} tone="warn" />
      <Meter value={25} max={25} tone="danger" />
    </div>
  ),
};
