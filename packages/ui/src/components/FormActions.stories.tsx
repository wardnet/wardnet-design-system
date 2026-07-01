import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormActions } from "./FormActions";
import { Card, CardContent } from "../primitives/card";

const meta = {
  title: "Components/FormActions",
  component: FormActions,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Card style={{ maxWidth: 420 }}>
        <CardContent>Form body…</CardContent>
        <Story />
      </Card>
    ),
  ],
  args: {
    primaryLabel: "Save",
    primaryProps: { onClick: () => {} },
  },
} satisfies Meta<typeof FormActions>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Just the primary action, right-aligned. */
export const PrimaryOnly: Story = {};

/** The canonical Cancel (ghost) + Save (accent) pairing. */
export const WithSecondary: Story = {
  args: {
    secondaryLabel: "Cancel",
    secondaryProps: { onClick: () => {} },
  },
};

/**
 * A card wrapped in a `<form>` — the primary submits it (fires on Enter too),
 * so behaviour is passed as `type="submit"` rather than an `onClick`.
 */
export const SubmitPrimary: Story = {
  args: {
    primaryLabel: "Add zone",
    primaryProps: { type: "submit" },
    secondaryLabel: "Cancel",
    secondaryProps: { onClick: () => {} },
  },
};

/** A destructive primary (e.g. confirming a delete). */
export const Destructive: Story = {
  args: {
    primaryLabel: "Delete",
    primaryVariant: "destructive",
    secondaryLabel: "Cancel",
    secondaryProps: { onClick: () => {} },
  },
};

/** `data-testid`s flow through the props objects for e2e targeting. */
export const WithTestIds: Story = {
  args: {
    primaryProps: { onClick: () => {}, "data-testid": "example-submit" },
    secondaryLabel: "Cancel",
    secondaryProps: { onClick: () => {}, "data-testid": "example-cancel" },
  },
};

/**
 * A left-pinned destructive action (e.g. "Delete profile") opposite the
 * Cancel/Save group — the footer switches to a space-between layout.
 */
export const DestructiveLeft: Story = {
  args: {
    tertiaryLabel: "Delete profile",
    tertiaryProps: { onClick: () => {} },
    secondaryLabel: "Cancel",
    secondaryProps: { onClick: () => {} },
  },
};

/** A footer with a single ghost action (e.g. a lone Cancel/Close). */
export const SecondaryOnly: Story = {
  args: {
    primaryLabel: undefined,
    secondaryLabel: "Cancel",
    secondaryProps: { onClick: () => {} },
  },
};
