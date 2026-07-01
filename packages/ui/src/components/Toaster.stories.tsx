import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster, toast } from "./Toaster";
import { Button } from "../primitives/button";

const meta = {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Mount one `<Toaster />` near the app root, then call `toast(...)`. Tones map
 *  to the Forge palette automatically via the `@wardnet/styles` Sonner bridge. */
export const Tones: Story = {
  render: () => (
    <div style={{ padding: 24, background: "var(--bg)" }}>
      <Toaster />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button onClick={() => toast.success("Subscription updated")}>
          Success
        </Button>
        <Button
          variant="ghost"
          onClick={() => toast.error("Something went wrong")}
        >
          Error
        </Button>
        <Button
          variant="ghost"
          onClick={() => toast.warning("Approaching your limit")}
        >
          Warning
        </Button>
        <Button
          variant="ghost"
          onClick={() => toast("Heads up — just so you know")}
        >
          Info
        </Button>
      </div>
    </div>
  ),
};
