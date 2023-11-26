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
      text: Types
      link: /types

features:
  - title: JSON-based APIs
    details: Simple JSON objects are used to represent all data
  - title: Built-in namespaced extensions
    details: Extensions for common use cases are built-in, such as custom emojis and reactions
  - title: Easy to implement
    details: The protocol is simple to implement, and can be used with any language
---

<style>
:root {
  --vp-home-hero-image-background-image: linear-gradient(to top right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248));
  --vp-home-hero-image-filter: blur(168px);
}
</style>