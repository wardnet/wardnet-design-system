---
"@wardnet/ui": minor
---

`FormActions` — broaden to cover every card action-footer shape so it can replace the hand-rolled footers across the admin site.

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
