<p align="center">
  <a href="https://versia.pub"><img src="https://cdn.versia.pub/branding/logo-dark.svg" alt="Versia Logo" height="110"></a>
</p>

<h2 align="center">
  <strong><code>Versia Documentation</code></strong>
</h2>

<div align="center">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="42" width="52" alt="TypeScript logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg" height="42" width="52" alt="Deno logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="42" width="52" alt="CSS3 logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="42" width="52" alt="HTML5 logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" height="42" width="52" alt="Linux logo">
</div>

## Technologies

- [**`TypeScript`**](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [**`Astro`**](https://astro.build/): A framework for content-driven websites.
- [**`Starlight`**](https://starlight.astro.build/): An Astro documentation framework, heavily customized here.
- [**`MDX`**](https://mdxjs.com/): Markdown for the component era.
- [**`Pagefind`**](https://pagefind.app/): A static search library, which indexes the built site.

## Installation

This project uses [Deno](https://deno.com) to manage dependencies and run tasks. To install the dependencies, run:

```bash
deno install
```

To start the development server, run:

```bash
deno task dev
```

Search only works in production builds, as its index is generated from the output of `deno task build`.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

### Licenses

The code in this repository is licensed under the [MIT License](https://opensource.org/licenses/MIT).

However, the _documentation text_ (including the MDX files in the `src/content/docs` directory) is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/). You are free to share and adapt the text as long as you provide proper attribution and distribute your adaptations under the same license.
