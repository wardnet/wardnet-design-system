import { Moon, Sun } from "lucide-react";
import { Button, type ButtonProps } from "../primitives/button";

type Theme = "light" | "dark";

type ThemeToggleProps = Omit<ButtonProps, "variant" | "size" | "onClick"> & {
  /** Current theme. */
  theme: Theme;
  /** Called when the toggle is activated. */
  onToggle: () => void;
};

/**
 * Sun/moon ghost icon-button that flips the active theme. Stateless: the
 * consumer owns the `theme` value (and applies `data-theme` to the document).
 * Shows the icon for the theme you'd switch *to*.
 */
function ThemeToggle({
  theme,
  onToggle,
  "aria-label": ariaLabel = "Toggle theme",
  ...props
}: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={ariaLabel}
      onClick={onToggle}
      {...props}
    >
      {theme === "dark" ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Button>
  );
}

export { ThemeToggle };
export type { ThemeToggleProps };
