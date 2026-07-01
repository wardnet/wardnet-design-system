import * as React from "react";
import { clsx } from "clsx";
import s from "./code-input.module.css";

type CodeInputProps = {
  /** Number of boxes. */
  length?: number;
  /** Current value (controlled). May be shorter than `length` while typing. */
  value: string;
  /** Called with the new concatenated value on every edit. */
  onChange: (value: string) => void;
  /** Called once the value reaches `length` characters. */
  onComplete?: (value: string) => void;
  /**
   * Accepted character set. `"numeric"` (default) keeps digits only;
   * `"alphanumeric"` accepts letters + digits and upper-cases them (for
   * human-typed codes like `7K9P2Q`).
   */
  mode?: "numeric" | "alphanumeric";
  /** Render the boxes in the danger/error state (red border + soft ring). */
  error?: boolean;
  /** Focus the first box on mount. */
  autoFocus?: boolean;
  disabled?: boolean;
  /** Base label; each box is exposed to AT as "{label} N" (default "Digit"). */
  "aria-label"?: string;
  id?: string;
  className?: string;
};

const sanitizers = {
  numeric: (v: string) => v.replace(/\D/g, ""),
  alphanumeric: (v: string) => v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(),
} as const;

/**
 * Segmented N-box one-time-code input: auto-advance, backspace-to-previous,
 * arrow navigation, paste-fills-all, and select-on-focus. Digits only by default;
 * pass `mode="alphanumeric"` for letter+digit codes (upper-cased). Fully
 * controlled: the concatenated string is the single source of truth.
 */
function CodeInput({
  length = 6,
  value,
  onChange,
  onComplete,
  mode = "numeric",
  error = false,
  autoFocus = false,
  disabled = false,
  "aria-label": ariaLabel = "Digit",
  id,
  className,
}: CodeInputProps) {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? "");
  const sanitize = sanitizers[mode];

  const focusBox = (i: number) => {
    const el = refs.current[Math.max(0, Math.min(length - 1, i))];
    el?.focus();
    el?.select();
  };

  const commit = (next: string) => {
    onChange(next);
    if (next.length === length) onComplete?.(next);
  };

  const setDigit = (i: number, digit: string) => {
    const nextChars = [...chars];
    nextChars[i] = digit;
    commit(nextChars.join("").slice(0, length));
  };

  const handleChange = (i: number, raw: string) => {
    const char = sanitize(raw).slice(-1);
    setDigit(i, char);
    if (char && i < length - 1) focusBox(i + 1);
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !chars[i] && i > 0) {
      e.preventDefault();
      setDigit(i - 1, "");
      focusBox(i - 1);
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      focusBox(i - 1);
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      focusBox(i + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = sanitize(e.clipboardData.getData("text")).slice(0, length);
    if (!pasted) return;
    commit(pasted);
    focusBox(pasted.length >= length ? length - 1 : pasted.length);
  };

  return (
    <div className={clsx(s.boxes, className)} id={id}>
      {chars.map((c, i) => (
        <input
          // eslint-disable-next-line react/no-array-index-key -- positional boxes
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={s.box}
          data-invalid={error || undefined}
          value={c}
          inputMode={mode === "alphanumeric" ? "text" : "numeric"}
          autoCapitalize={mode === "alphanumeric" ? "characters" : undefined}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          aria-label={`${ariaLabel} ${i + 1}`}
          // eslint-disable-next-line jsx-a11y/no-autofocus -- intentional first-box focus
          autoFocus={autoFocus && i === 0}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}

export { CodeInput };
export type { CodeInputProps };
