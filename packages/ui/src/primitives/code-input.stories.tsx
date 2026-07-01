import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { CodeInput } from "./code-input";

const meta = {
  title: "Primitives/CodeInput",
  component: CodeInput,
  tags: ["autodocs"],
} satisfies Meta<typeof CodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled({ error }: { error?: boolean }) {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex flex-col gap-3">
      <CodeInput value={value} onChange={setValue} error={error} autoFocus />
      <span style={{ fontSize: 12, color: "var(--ink-3)" }}>
        value: {value || "—"}
      </span>
    </div>
  );
}

export const Default: Story = {
  args: { value: "", onChange: () => {} },
  render: () => <Controlled />,
};

export const Filled: Story = {
  args: { value: "424242", onChange: () => {} },
};

export const ErrorState: Story = {
  args: { value: "12", onChange: () => {} },
  render: () => <Controlled error />,
};

export const FourDigits: Story = {
  args: { value: "", length: 4, onChange: () => {} },
  render: () => {
    const [value, setValue] = React.useState("");
    return <CodeInput length={4} value={value} onChange={setValue} />;
  },
};
