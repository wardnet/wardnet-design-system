import type { ReactNode } from "react";
import { clsx } from "clsx";
import { Button, type ButtonProps } from "../primitives/button";
import { CardFooter } from "../primitives/card";
import s from "./FormActions.module.css";

/**
 * Props forwarded to an action button, minus the bits FormActions owns itself
 * (the visual `variant` and the button label / `children`). Everything else —
 * `onClick`, `type`, `disabled`, `data-testid`, `form`, `size`, … — flows
 * straight through to the underlying `<Button>`. The `data-*` index signature is
 * declared explicitly because React's button props don't include one, and e2e
 * targeting relies on forwarding `data-testid`.
 */
type ActionProps = Omit<ButtonProps, "variant" | "children"> & {
  [dataAttr: `data-${string}`]: string | number | boolean | undefined;
};

interface FormActionsProps {
  /**
   * Primary action — rendered rightmost in the accent (or destructive) colour.
   * Pass its behaviour through `primaryProps` (`onClick`, `type="submit"`,
   * `disabled`, `data-testid`, …). Omit `primaryLabel` for a footer that has no
   * primary action (e.g. a lone Cancel).
   */
  primaryLabel?: ReactNode;
  primaryVariant?: "default" | "destructive";
  primaryProps?: ActionProps;
  /**
   * Secondary action — rendered to the LEFT of the primary as a ghost button.
   * Omit `secondaryLabel` to render only the primary action.
   */
  secondaryLabel?: ReactNode;
  secondaryProps?: ActionProps;
  /**
   * Optional destructive action pinned to the LEFT edge (e.g. "Delete"),
   * opposite the secondary/primary group. Its presence switches the footer to a
   * space-between layout.
   */
  tertiaryLabel?: ReactNode;
  tertiaryVariant?: "destructive" | "ghost";
  tertiaryProps?: ActionProps;
  className?: string;
}

/**
 * Canonical action footer for the bottom of a Card form. A ghost secondary sits
 * to the LEFT of the primary, both right-aligned inside a `CardFooter` so they
 * pick up the standard sunken footer background + top border. The accent colour
 * is reserved for the single primary action.
 *
 * Button behaviour is passed through `primaryProps` / `secondaryProps` /
 * `tertiaryProps` (a subset of `ButtonProps`) — this keeps `type="submit"`,
 * `data-testid`, `disabled`, `onClick`, `form`, … flowing to the right button
 * while FormActions keeps ownership of the label, variant and layout.
 *
 * An optional `tertiaryLabel` renders a left-pinned destructive action (e.g.
 * "Delete") opposite the secondary/primary group, switching the footer to a
 * space-between layout.
 *
 * Render as a direct child of `<Card>` (a sibling of `<CardContent>`).
 */
export function FormActions({
  primaryLabel,
  primaryVariant = "default",
  primaryProps,
  secondaryLabel,
  secondaryProps,
  tertiaryLabel,
  tertiaryVariant = "destructive",
  tertiaryProps,
  className,
}: FormActionsProps) {
  const actions = (
    <>
      {secondaryLabel != null && (
        <Button variant="ghost" {...secondaryProps}>
          {secondaryLabel}
        </Button>
      )}
      {primaryLabel != null && (
        <Button variant={primaryVariant} {...primaryProps}>
          {primaryLabel}
        </Button>
      )}
    </>
  );

  if (tertiaryLabel == null) {
    return (
      <CardFooter className={clsx(s.actions, className)}>{actions}</CardFooter>
    );
  }

  return (
    <CardFooter className={clsx(s.spread, className)}>
      <Button variant={tertiaryVariant} {...tertiaryProps}>
        {tertiaryLabel}
      </Button>
      <div className={s.group}>{actions}</div>
    </CardFooter>
  );
}
