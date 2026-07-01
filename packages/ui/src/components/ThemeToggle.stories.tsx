import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ThemeToggle } from "./ThemeToggle";

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { theme: "light", onToggle: () => {} },
  render: () => {
    const [theme, setTheme] = React.useState<"light" | "dark">("light");
    return (
      <div data-theme={theme} style={{ padding: 24, background: "var(--bg)" }}>
        <ThemeToggle
          theme={theme}
          onToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        />
      </div>
    );
  },
};
