import type { ReactNode } from "react";
import { clsx } from "clsx";
import s from "../primitives/tabs.module.css";

export interface SegmentedTab {
  id: string;
  label: ReactNode;
  /** Optional count badge rendered after the label. */
  count?: number;
  /** Optional `data-testid` for this tab's button, so consumers can
   *  target a specific tab in e2e specs without relying on its label
   *  text. Kept off the component's own contract — the consumer owns it. */
  testId?: string;
}

interface SegmentedTabsProps {
  tabs: SegmentedTab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * The standard Forge segmented pill control (`.tabs`) used for group/type
 * filters across the admin surfaces (e.g. the DHCP and Devices tables). Use
 * this rather than hand-rolling a row of buttons so every filter looks the
 * same.
 */
export function SegmentedTabs({
  tabs,
  activeId,
  onChange,
  className,
}: SegmentedTabsProps) {
  return (
    <div className={clsx(s.tabs, className)} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={t.id === activeId}
          data-state={t.id === activeId ? "active" : "inactive"}
          data-testid={t.testId}
          onClick={() => onChange(t.id)}
        >
          {t.label}
          {t.count !== undefined && <span className={s.count}>{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
