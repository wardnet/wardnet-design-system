import * as React from "react";
import { Slot } from "radix-ui";
import { clsx } from "clsx";
import s from "./text-link.module.css";

type TextLinkProps = React.ComponentProps<"a"> & {
  /** Render through a child element (e.g. a router `Link`) instead of `<a>`. */
  asChild?: boolean;
};

/**
 * Inline emerald hyperlink for body/footer copy. Use `asChild` to delegate to a
 * routing library's link component while keeping the design-system styling.
 */
function TextLink({ className, asChild = false, ...props }: TextLinkProps) {
  const Comp = asChild ? Slot.Root : "a";
  return <Comp className={clsx(s.link, className)} {...props} />;
}

export { TextLink };
export type { TextLinkProps };
