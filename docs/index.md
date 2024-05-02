---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Lysand"
  text: "Federation, simpler"
  tagline: A simple to implement and complete federation protocol
  image:
    src: https://cdn.lysand.org/logo.webp
    alt: Lysand Logo
  actions:
    - theme: brand
      text: Protocol Docs
      link: /spec
    - theme: alt
      text: Lysand Server
      link: https://github.com/lysand-org/lysand
---

<Features />

<Team />

<script setup lang="ts">
import Features from "../components/Features.vue"
import Team from "../components/Team.vue"
</script>