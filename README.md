# Stefano Biddau's Portfolio

![Project Logo](https://media.licdn.com/dms/image/v2/D4D16AQGSaW-znd_xGg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1727295477084?e=1746057600&v=beta&t=HIrH-2Sc7XAME6Zx42DcPttqxP7CjAoI94YyKvlgO18)

Current version: `5.3.36`

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![YAML](https://img.shields.io/badge/yaml-%23ffffff.svg?style=for-the-badge&logo=yaml&logoColor=151515)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

Visit the live site [here](https://www.stefano-biddau.com/)

Visit the live storybook [here](https://www.chromatic.com/library?appId=67bc3a6769b2d75d3ca76e57)

--- 


## Description
This is my portfolio. It contains information about me, my projects, and how to contact me.

>**Note**: This project is under constant development. If you have any suggestions or feedback, please let me know.

---

## System Requirements

Before starting, ensure your system meets the following requirements:

- **Node.js**: Version **22.15.0** (LTS) or newer. [Download Node.js](https://nodejs.org/)
- **npm**: Bundled with Node.js (use `npm install -g npm@latest` to update if needed).
- **Modern Browser**: Ensure compatibility with recent versions of Chrome, Firefox, or Edge.
- **pnpm (optional)**: For efficient package management, you can use `pnpm` instead of `npm`. [Learn more about pnpm](https://pnpm.io/)

---

## Installation

Follow these steps to set up the project:

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
   - Check for linting errors:
     ```bash
     npm run lint
     ```
   - Automatically fix issues:
     ```bash
     npm run lint:fix
     ```

6. **Optimize SVG Icons**:
   ```bash
   npm run optimize-svg
   ```

---

## Scripts Overview

| Script               | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `npm run dev`        | Starts the development server with Vite.                                   |
| `npm run build`      | Builds the project for production, including type-checking with `vue-tsc`. |
| `npm run preview`    | Serves the built project for preview.                                      |
| `npm run visualize`  | Builds the project with visualization mode enabled.                       |
| `npm run lint`       | Runs ESLint to check for code quality issues.                              |
| `npm run lint:fix`   | Runs ESLint with auto-fix enabled.                                         |
| `npm run optimize-svg` | Optimizes SVG files in `src/assets/icons` using SVGO.                    |

---

## Features

This project uses the following technologies:

- **Vue 3**: Reactive and component-based UI framework.
- **Vite**: High-performance development and build tool.
- **TypeScript**: Strongly typed programming language for modern JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ESLint**: Linting for code quality.

---

## SEO Optimization

This portfolio includes a fully dynamic and reactive SEO setup using [`@unhead/vue`](https://unhead.unjs.io/), enabling real-time updates of `<head>` content based on page data and selected language.

### Key Features:
- Dynamic management of `<title>`, `<meta name="description">`, `<meta name="keywords">`, and Open Graph tags.
- Locale-aware Open Graph support via `og:locale` and `og:locale:alternate`.
- Computed, reactive meta tags that automatically update with route or data changes.
- Inclusion of `robots`, `canonical`, and `author` meta tags.
- Ready for future Twitter Card and JSON-LD structured data integration.

> The entire SEO system was designed by [Martina Eulogio](https://www.linkedin.com/in/martina-eulogio-/), using a reactive and modular approach deeply integrated with Vue.
