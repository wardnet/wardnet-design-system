---
"@wardnet/ui": minor
---

Add components extracted while building the My Account SPA:

- `CodeInput` — segmented N-box one-time-code input (digits only, auto-advance, backspace-to-previous, arrow navigation, paste-fills-all, select-on-focus, error state).
- `Divider` — hairline rule, or an "or"-style labeled separator when given children.
- `Meter` — thin tone-aware usage meter (accent/warn/danger) with the progressbar role.
- `TextLink` — inline emerald hyperlink; `asChild` delegates to a router link.
- `OAuthButton` — ghost OIDC provider button with the Google/GitHub glyph.
- `ThemeToggle` — sun/moon ghost icon-button for flipping the active theme.
- `Toaster` + `toast` — app-wide toast surface; a thin wrapper over Sonner preconfigured with the Forge placement and styled via the `@wardnet/styles` Sonner bridge, so consumers import the toast API from `@wardnet/ui` and never depend on `sonner` directly.
