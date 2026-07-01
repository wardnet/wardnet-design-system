import * as React from "react";
import { clsx } from "clsx";
import s from "./divider.module.css";

type DividerProps = React.ComponentProps<"div"> & {
  /** Optional centered label flanked by rules (e.g. "or"). Omit for a bare rule. */
  children?: React.ReactNode;
};

/**
 * Horizontal separator. With no children it renders a single hairline rule;
 * with children it renders the "or"-style labeled divider (rule · label · rule).
 */
function Divider({ children, className, ...props }: DividerProps) {
  if (children === undefined) {
    return (
      <div role="separator" className={clsx(s.rule, className)} {...props} />
    );
  }
  return (
    <div className={clsx(s.labeled, className)} {...props}>
      <span className={s.line} />
      <span className={s.label}>{children}</span>
      <span className={s.line} />
    </div>
  );
}

export { Divider };
export type { DividerProps };
