<div align="center">

<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.svg">
    <img src=".github/assets/banner.svg" alt="Versia: federation you can read" width="640">
  </picture>
</p>

[![Build](https://github.com/versia-pub/docs/actions/workflows/build.yml/badge.svg)](https://github.com/versia-pub/docs/actions/workflows/build.yml)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-22162B)](LICENSE)
[![Docs: CC BY-SA 4.0](https://img.shields.io/badge/docs-CC_BY--SA_4.0-22162B)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Versia 0.7](https://img.shields.io/badge/Versia-0.7-E6A9FE)](https://versia.pub)
[![Built with Deno](https://img.shields.io/badge/built_with-Deno-22162B?logo=deno)](https://deno.com)

**[Read the docs](https://versia.pub)** · **[Introduction](https://versia.pub/introduction)** ·
**[Implementing a receiver](https://versia.pub/guides/implementing-a-receiver)** ·
**[Verso](https://github.com/versia-pub/verso)**

</div>

This is the source of [versia.pub](https://versia.pub), the specification and documentation for
Versia, a federation protocol for social media.

The site is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build),
and the pages are MDX files in [`src/content/docs`](src/content/docs). Every page works without
JavaScript, and each docs page also comes as plain Markdown.

## Running the site locally

You need [Deno](https://deno.com). Install the dependencies, then start the development server:

```sh
deno install
deno task dev
```

`deno task build` writes the site to `out/`, and `deno task preview` serves it. Search only works
there, as its index is built from the output.

## Checks

CI runs the same checks on every push, and a pull request should pass them all:

| Command                 | What it checks                                                    |
| ----------------------- | ----------------------------------------------------------------- |
| `deno task lint`        | Formatting and lint rules, with [Biome](https://biomejs.dev)      |
| `deno task typecheck`   | Types, in TypeScript and in Astro components                      |
| `deno task build`       | That the site builds, including the checks on examples and fields |
| `deno task check-links` | Every link in the built site, run after a build                   |
| `deno task knip`        | Unused files, exports and dependencies                            |

## Contributing

Issues and pull requests are welcome, whether it's a typo, an unclear page or a gap in the
protocol.

## License

The code is licensed under the [GNU General Public License v3.0](LICENSE). The documentation text,
including the MDX files in `src/content/docs`, is licensed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/): you may share and adapt it, as long
as you give credit and share your changes under the same license.
