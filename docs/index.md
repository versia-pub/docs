---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Lysand"
  text: "Federation, simpler"
  tagline: A simple to implement and complete federation protocol
  image:
    src: /logo.png
    alt: Lysand Logo
  actions:
    - theme: brand
      text: Protocol Docs
      link: /spec
    - theme: alt
      text: Lysand Server
      link: https://github.com/lysand-org/lysand

features:
  - title: JSON-based APIs
    details: Simple JSON objects are used to represent all data 
  - title: Built-in namespaced extensions
    details: Extensions for common use cases are built-in, such as custom emojis and reactions
  - title: Easy to implement
    details: The protocol is simple to implement, and can be used with any language
  - title: Secure by default
    details: All requests are signed with the latest cryptography algorithms
  - title: No vendor-specific implementations
    details: Everything is heavily standardized to ensure compatibility
  - title: TypeScript types
    details: TypeScript types are provided for every object in the protocol
---

---

> [!INFO]
> The latest version of Lysand is **2.0**, released on **March 19th 2024** by [**CPlusPatch**](https://cpluspatch.dev).
>
> Lysand 2.0 features **more standardization**, **simpler object structures**, and **documentation rewrite**.

<style>
:root {
  --vp-home-hero-image-background-image: linear-gradient(to top right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248));
  --vp-home-hero-image-filter: blur(168px);
}
</style>