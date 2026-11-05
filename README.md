<p align="center">
  <a href="https://versia.pub"><img src="https://cdn.versia.pub/branding/logo-dark.svg" alt="Versia Logo" height="110"></a>
</p>

<h2 align="center">
  <strong><code>Versia Documentation</code></strong>
</h2>

<div align="center">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="42" width="52" alt="TypeScript logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="42" width="52" alt="React logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="42" width="52" alt="NextJS logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg" height="42" width="52" alt="Deno logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="42" width="52" alt="CSS3 logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="42" width="52" alt="HTML5 logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" height="42" width="52" alt="Linux logo">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="42" width="52" alt="TailwindCSS logo">
</div>

<br/>

<p align="center">
    <img src="public/screenshots/framed/ipad-home.webp" alt="Versia on an iPad" height="400">
</p>

## Technologies

- [**`TypeScript`**](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [**`React`**](https://reactjs.org/): A JavaScript library for building user interfaces.
- [**`Next.js`**](https://nextjs.org/): A React framework for building static and dynamic websites.
- [**`MDX`**](https://mdxjs.com/): Markdown for the component era.
- [**`Motion`**](https://motion.dev/): A production-ready motion library for React.
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

[Node.js](https://nodejs.org) must also be available on your `PATH`, as Turbopack uses it to run the MDX and PostCSS loaders.

Search only works in production builds, as its index is generated from the output of `deno task build`.

Turbopack's cache doesn't track the plugins in `mdx/`, so delete `.next` after changing them.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

### Licenses

The code in this repository is licensed under the [MIT License](https://opensource.org/licenses/MIT).

However, the _documentation text_ (including the Markdown files in the `app` directory) is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/). You are free to share and adapt the text as long as you provide proper attribution.
