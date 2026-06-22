# wardnet-design-system

The Wardnet design system: visual language, design tokens, brand assets, and UI
components shared across the Wardnet ecosystem (admin site, PWAs, marketing site,
the My Account SPA, and wardnet-cloud).

A yarn 4 + Turborepo workspace of three independently-versioned packages:

| Package | What it is | Runtime deps |
|---------|-----------|--------------|
| [`@wardnet/brand`](packages/brand) | Brand kit — logo/icon/mark SVG vectors (text source + outlined dist), brand fonts, the visual brand guide, and the `wardnet-brand-png` rasterizer | `@resvg/resvg-js` |
| [`@wardnet/styles`](packages/styles) | CSS design tokens, theme, typography scale + roles | none |
| [`@wardnet/ui`](packages/ui) | Domain-agnostic React primitives + brand components, documented in Storybook | `@wardnet/styles` |

## Develop

```sh
yarn install
yarn build                              # turbo: all packages
yarn workspace @wardnet/ui storybook    # component dev (http://localhost:6006)
yarn type-check
```

Brand assets ship as outlined, self-contained SVGs in
[`packages/brand/assets/dist`](packages/brand/assets/dist). Regenerate them from
the text sources after editing `assets/src/` (re-outlines `<text>` → `<path>`
with the brand fonts):

```sh
yarn workspace @wardnet/brand build
```

Rasterize any vector to a PNG on demand (favicons, PWA icons, email art):

```sh
yarn wardnet-brand-png packages/brand/assets/dist/wardnet-icon.svg 512 icon-512.png
```

## Distribution

Packages publish to **GitHub Packages** under the `@wardnet` scope. GitHub
Packages requires a token for every read (even of public packages), so consumers
route the scope and authenticate with a token that has `read:packages`:

```yaml
# .yarnrc.yml
npmScopes:
  wardnet:
    npmRegistryServer: "https://npm.pkg.github.com"
    npmAuthToken: "${GH_TOKEN-}"
```

First-party repos managed by `gt` already export a per-repo `GH_TOKEN` via
direnv — add the scope once with `gh auth refresh -s read:packages` and installs
just work. In CI, set `GH_TOKEN` from the built-in `GITHUB_TOKEN` and grant the
job `permissions: packages: read`.

## Release

Versioning is via [Changesets](https://github.com/changesets/changesets);
publishing is **tag-gated** (merging never publishes):

1. PRs include a changeset (`yarn changeset`).
2. `yarn changeset version` opens a release-prep PR (bumps + changelogs).
3. Merge it — nothing publishes yet.
4. `yarn changeset tag && git push --follow-tags` — the per-package tags
   (`@wardnet/ui@x.y.z`) trigger the `Release` workflow, which publishes to
   GitHub Packages.

The Storybook is published to GitHub Pages on every push to `main`. Design
decisions live in [`docs/`](docs); design-system→Claude Design sync config lives
in [`.design-sync/`](.design-sync).
