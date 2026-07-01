import * as React from "react";
import { clsx } from "clsx";
import s from "./meter.module.css";

type MeterTone = "accent" | "warn" | "danger";

type MeterProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Current amount. */
  value: number;
  /** Full-scale amount (default 100). */
  max?: number;
  /** Fill colour; use `warn`/`danger` near or at a limit. */
  tone?: MeterTone;
};

/**
 * Thin horizontal usage meter (e.g. networks/devices used vs entitlement).
 * Exposes the progressbar role with aria value attributes for AT.
 */
function Meter({
  value,
  max = 100,
  tone = "accent",
  className,
  ...props
}: MeterProps) {
  const pct = max <= 0 ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={clsx(s.track, className)}
      {...props}
    >
      <span className={clsx(s.fill, s[tone])} style={{ width: `${pct}%` }} />
    </div>
  );
}

export { Meter };
export type { MeterProps, MeterTone };
