# @wardnet/ui

## 0.2.0

### Minor Changes

- 4e7f155: Add components extracted while building the My Account SPA:

  - `CodeInput` — segmented N-box one-time-code input (digits only, auto-advance, backspace-to-previous, arrow navigation, paste-fills-all, select-on-focus, error state).
  - `Divider` — hairline rule, or an "or"-style labeled separator when given children.
  - `Meter` — thin tone-aware usage meter (accent/warn/danger) with the progressbar role.
  - `TextLink` — inline emerald hyperlink; `asChild` delegates to a router link.
  - `OAuthButton` — ghost OIDC provider button with the Google/GitHub glyph.
  - `ThemeToggle` — sun/moon ghost icon-button for flipping the active theme.
  - `Toaster` + `toast` — app-wide toast surface; a thin wrapper over Sonner preconfigured with the Forge placement and styled via the `@wardnet/styles` Sonner bridge, so consumers import the toast API from `@wardnet/ui` and never depend on `sonner` directly.

- dd9a3aa: `FormActions` — broaden to cover every card action-footer shape so it can replace the hand-rolled footers across the admin site.

  **Breaking:** the convenience callbacks (`onPrimary`, `onSecondary`, `disabled`) are removed in favour of a pure-passthrough API. Button behaviour now flows through `primaryProps` / `secondaryProps` (a subset of `ButtonProps`), so `onClick`, `type="submit"`, `disabled`, `data-testid`, `form`, `size`, … reach the right button while `FormActions` keeps ownership of the label, variant and layout.

  Also new:

  - `primaryLabel` is now optional — omit it for a footer with a single ghost action (e.g. a lone Cancel/Close).
  - `tertiaryLabel` / `tertiaryVariant` / `tertiaryProps` add a left-pinned destructive action (e.g. "Delete") opposite the secondary/primary group, switching the footer to a space-between layout.

  Migration:

  ```diff
  -<FormActions primaryLabel="Save" onPrimary={save} secondaryLabel="Cancel" onSecondary={cancel} disabled={busy} />
  +<FormActions
  +  primaryLabel="Save"
  +  primaryProps={{ onClick: save, disabled: busy }}
  +  secondaryLabel="Cancel"
  +  secondaryProps={{ onClick: cancel, disabled: busy }}
  +/>
  ```
