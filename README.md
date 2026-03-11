# Tashil Koseelan — Portfolio

A single-page professional portfolio showcasing full-stack software engineering experience in fintech, payments, and distributed systems. Built as a static, dependency-free site with a distinctive liquid-glass aesthetic, interactive 3D hero element, and full light/dark theme support.

---

## Overview

This repository contains both the **source code** for the portfolio and serves as the **portfolio itself** when deployed. The site presents:

- **Experience** — Software Engineer Intern at [Stitch Money](https://stitch.money) (Cape Town), building payment infrastructure, serverless workflows, and production systems at scale; prior tutoring in Java and CS fundamentals.
- **Projects** — Crypto Market Intelligence Engine (Next.js, real-time data, LLM summaries), Samsara Server (Linux-on-Android, Docker, CI/CD), Briconomy Property Management (React PWA, Deno, MongoDB).
- **Skills** — Languages (Java, TypeScript, Python, C#, Kotlin, SQL, and more), Cloud & DevOps (AWS, Azure, GCP, Kubernetes, Terraform), Backend & APIs (REST, GraphQL, message queues, NestJS, Spring Boot), Data & ML (Snowflake, ETL, Pandas, scikit-learn), Payments (flows, reconciliation, settlement), and practices from TDD to system design.
- **Education** — BSc Computer Science and Application Development (Varsity College, Aggregate Distinction; 11 distinctions), with standout results in Programming, Software Engineering, and Mathematical Principles.

The design is minimal, readable, and mobile-friendly, with scroll-spy navigation, glassmorphism cards, and a theme toggle (including a reduced-motion–aware 3D diamond) so it works well as a live portfolio and as a technical showcase.

---

## Features

- **Liquid-glass UI** — Frosted glass panels, backdrop blur, and subtle highlights across section nav, hero CTA, project/education cards, and skill pills. Light and dark themes with distinct palettes (blue-tinted light, red-tinted dark).
- **Interactive 3D diamond** — Three.js hero element (8-facet brilliant cut, transparent material). Click toggles light/dark theme; rotation respects `prefers-reduced-motion`.
- **Section navigation** — Fixed pill nav with scroll-spy and sliding bubble indicator. Smooth scroll to sections; active section and bubble stay in sync (including after nav clicks). On mobile: horizontal scroll and 44px touch targets.
- **Responsive & accessible** — Semantic HTML, ARIA where needed, external links with `rel="noopener noreferrer"`, reduced-motion handling for animations and diamond. Mobile breakpoint (767px) for nav, touch targets, and lighter blur.
- **Static & portable** — No build step. Vanilla HTML, CSS, and JavaScript plus one Three.js module (loaded via import map in the diamond iframe). Run with any static server or deploy to GitHub Pages, Netlify, Vercel, or similar.

---

## Tech stack

| Layer        | Choice |
|-------------|--------|
| **Markup**  | HTML5 (semantic sections, `main`, `nav`, `header`, `footer`) |
| **Styles**  | CSS3 (custom properties, `backdrop-filter`, `clamp()`, one mobile media block) |
| **Behaviour** | Vanilla JavaScript (IIFEs, `"use strict"`, Intersection Observer, scroll-spy, theme persistence in `localStorage`) |
| **Hero 3D** | [Three.js](https://threejs.org/) (ES module, `MeshPhysicalMaterial`, 8-sided geometry), loaded in an iframe with `postMessage` for theme sync |

No React, no Node build, no bundler. The site is intentionally minimal and fast to host anywhere.

---

## Project structure

```
personal-site/
├── index.html          # Single-page structure, content, inline theme script
├── script.js           # Hero init, scroll observer, smooth scroll, section nav (bubble + scroll-spy)
├── styles.css          # Variables, layout, glass UI, dark theme, mobile overrides
├── diamond.html        # Three.js scene (gem geometry, materials, lights, animate loop)
├── favicon.svg         # Favicon
├── stitch-logo.png     # Stitch Money logo (experience section)
├── Tashil_Koseelan_CV.pdf  # Downloadable CV
└── README.md           # This file
```

Background character images are loaded from an external CDN; all other assets are local.

---

## Run locally

From the `personal-site` directory:

```bash
npx serve .
# Or:
python3 -m http.server 8000
```

Then open `http://localhost:3000` (serve) or `http://localhost:8000` (Python). No environment variables or build step required.

---

## Deploy

- **GitHub Pages** — Push the repo, enable Pages, set source to the branch and folder containing `index.html` (e.g. root or `/docs` if the site lives in `docs`).
- **Netlify / Vercel** — Connect the repo or drag-and-drop the folder; leave build command empty and set publish directory to the folder that contains `index.html`.

The site is static; any host that serves files is sufficient.

---

## Contact

- **Email:** [tkoseelan@gmail.com](mailto:tkoseelan@gmail.com)  
- **Phone:** (+27) 63 684 1829  
- **GitHub:** [Tashil10](https://github.com/Tashil10)  
- **LinkedIn:** [Tashil Koseelan](https://linkedin.com/in/tashil-koseelan-3651b4288)

---

© 2026 Tashil Koseelan
