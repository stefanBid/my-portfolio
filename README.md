# Stefano Biddau's Portfolio

![Vue 3.5.22](https://img.shields.io/badge/Vue-3.5.22-42b883?logo=vue.js)
![Pinia 3.0.4](https://img.shields.io/badge/Pinia-3.0.4-yellow?logo=pinia)
![Vue Router 4.6.3](https://img.shields.io/badge/Vue_Router-4.6.3-4FC08D?logo=vue.js)
![Vue I18n 11.1.12](https://img.shields.io/badge/Vue_I18n-11.1.12-blue?logo=translate)

![Vite 7.2.0](https://img.shields.io/badge/Vite-7.2.0-646cff?logo=vite)
![Tailwind CSS 4.1.16](https://img.shields.io/badge/TailwindCSS-4.1.16-38bdf8?logo=tailwindcss)
![TypeScript 5.8.3](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript)
![ESLint 9.39.1](https://img.shields.io/badge/ESLint-9.39.1-4B32C3?logo=eslint)
![Prettier 3.6.2](https://img.shields.io/badge/Prettier-3.6.2-F7B93E?logo=prettier)

![Axios 1.13.2](https://img.shields.io/badge/Axios-1.13.2-5A29E4?logo=axios)
![Axios Retry 4.5.0](https://img.shields.io/badge/Axios--Retry-4.5.0-blueviolet)

![Storybook 10.0.4](https://img.shields.io/badge/Storybook-10.0.4-ff4785?logo=storybook)
![Chromatic 13.3.3](https://img.shields.io/badge/Chromatic-13.3.3-0066FF?logo=chromatic)

![SVGO 4.0.0](https://img.shields.io/badge/SVGO-4.0.0-green?logo=svg)
![Sharp 0.34.4](https://img.shields.io/badge/Sharp-0.34.4-gray)

![Node 22.15.0](https://img.shields.io/badge/Node-22.15.0-339933?logo=node.js)

[![Netlify Status](https://api.netlify.com/api/v1/badges/55a2b1a4-7d4b-4a3e-8edd-444dbf85092a/deploy-status)](https://app.netlify.com/projects/stefanobiddau/deploys)

🔗 Visit the live site [here](https://stefanobiddau.com/)  
📚 View the live Storybook [here](https://www.chromatic.com/library?appId=67bc3a6769b2d75d3ca76e57)

---

## 📑 Table of Contents

- [Description](#description)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Scripts Overview](#scripts-overview)
- [Features](#features)
- [SEO Optimization](#seo-optimization)
- [License](#license)

---

## 📌 Description

This is my personal portfolio. It contains information about me, my projects, and how to contact me.

>**Note**: This project is under continuous development. Suggestions and feedback are always welcome!

---

## ⚙️ System Requirements

Make sure your environment meets the following:

- **Node.js**: Version **22.15.0** (LTS or newer).  
  👉 [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js (use `npm install -g npm@latest` to update).
- **Modern Browser**: Chrome, Firefox, Edge (latest versions recommended).
- **pnpm (optional)**: Faster and leaner alternative to npm.  
  👉 [Learn more about pnpm](https://pnpm.io/)

---

## 🚀 Installation

1. **Clone the Repository**:
   ```bash
   git clone <REPOSITORY_URL>
   cd my-portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Build the Project**:
   ```bash
   npm run build
   ```

5. **Lint and Fix Code**:
   - Check for issues:
     ```bash
     npm run lint
     ```
   - Auto-fix:
     ```bash
     npm run lint:fix
     ```

6. **Optimize SVG Icons**:
   ```bash
   npm run optimize-svg
   ```

---

## 📜 Scripts Overview

| Script                | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `npm run dev`         | Starts the development server using Vite.                                  |
| `npm run build`       | Builds the project for production and type-checks with `vue-tsc`.          |
| `npm run preview`     | Serves the built project locally.                                           |
| `npm run visualize`   | Builds the app with bundle visualizer enabled.                             |
| `npm run lint`        | Runs ESLint to find code quality issues.                                   |
| `npm run lint:fix`    | Fixes common ESLint issues automatically.                                  |
| `npm run optimize-svg`| Optimizes SVGs in `src/assets/icons` using SVGO.                           |

---

## 🧪 Features

This project integrates a rich set of modern technologies:

- **Vue 3**: Modern, reactive UI framework
- **Vite**: Fast build tool with excellent DX
- **TypeScript**: Typed JavaScript for better safety
- **Tailwind CSS**: Utility-first CSS framework
- **Pinia**: State management for Vue
- **Vue Router**: Navigation system for SPAs
- **Vue I18n**: Localization with dynamic locale support
- **ESLint + Prettier**: Code quality and formatting

---

## 🔍 SEO Optimization

SEO is powered by [`@unhead/vue`](https://unhead.unjs.io/), which enables dynamic head/meta management:

### Highlights:
- **Reactive SEO meta** based on route and data
- **Open Graph support** including `og:locale` and alternates
- **Meta fallback and canonical/robots tags**
- **Ready for Twitter Card and structured data**

> This system was designed by [Martina Eulogio](https://www.linkedin.com/in/martina-eulogio-/) with a modular and reactive architecture fully integrated with Vue.

---

## 📝 License

© 2025 **Stefano Biddau**. All rights reserved.

This project is **not open-source**. See [LICENSE](./LICENSE) for more information and usage terms.
