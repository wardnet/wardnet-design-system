import type { Meta, StoryObj } from "@storybook/react-vite";
import { OAuthButton } from "./OAuthButton";

const meta = {
  title: "Components/OAuthButton",
  component: OAuthButton,
  tags: ["autodocs"],
  argTypes: {
    provider: { control: "select", options: ["google", "github"] },
  },
  args: { provider: "google" },
} satisfies Meta<typeof OAuthButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Google: Story = { args: { provider: "google" } };
export const GitHub: Story = { args: { provider: "github" } };

export const Stack: Story = {
  render: () => (
    <div
      style={{ width: 340, display: "flex", flexDirection: "column", gap: 10 }}
    >
      <OAuthButton provider="google" />
      <OAuthButton provider="github" />
    </div>
  ),
};
