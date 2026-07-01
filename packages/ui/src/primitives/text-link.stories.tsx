import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextLink } from "./text-link";

const meta = {
  title: "Primitives/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  args: { children: "Forgot password?", href: "#" },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InSentence: Story = {
  render: () => (
    <span style={{ fontSize: "var(--text-sm)", color: "var(--ink-2)" }}>
      Don&apos;t have an account?{" "}
      <TextLink href="#">Create an account</TextLink>
    </span>
  ),
};
