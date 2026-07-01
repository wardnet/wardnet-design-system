import { Toaster as SonnerToaster, toast } from "sonner";
import type { ToasterProps } from "sonner";

/**
 * App-wide toast surface — a thin wrapper over [Sonner](https://sonner.emilkowal.ski)
 * preconfigured with the Forge placement. The visual styling (card surface +
 * per-tone border via Sonner's `data-type`) is supplied by `@wardnet/styles`'
 * Sonner bridge, so consumers never wire per-toast `classNames`.
 *
 * Mount once near the app root, then surface messages with the re-exported
 * {@link toast} (`toast.success(...)`, `toast.error(...)`, …). This keeps Sonner a
 * design-system implementation detail — consumers import everything from
 * `@wardnet/ui` and never depend on `sonner` directly.
 */
function Toaster(props: ToasterProps) {
  return <SonnerToaster position="bottom-right" {...props} />;
}

export { Toaster, toast };
export type { ToasterProps };
