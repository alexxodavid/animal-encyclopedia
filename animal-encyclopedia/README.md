# Animal Encyclopedia

## Description
A beginner-friendly SPA that fetches random animal data from API Ninjas and displays it in a responsive, nature-inspired card grid.

## Setup
1. Copy `.env.example` to `.env` and fill in your API key:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173`.

## Build & Deploy (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`
- Add `VITE_API_NINJAS_KEY` under Site Settings → Build & deploy → Environment.

## Folder Structure
```plaintext
animal-encyclopedia/
├─ index.html
├─ package.json
├─ vite.config.js
├─ .gitignore
├─ .env.example
├─ README.md
└─ src/
   ├─ main.js
   ├─ ui.js
   ├─ api/animals.js
   ├─ components/AnimalCard.js
   └─ styles/main.css
```