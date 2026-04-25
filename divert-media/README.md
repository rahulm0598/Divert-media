# Divert Media Production

## Requirements
- Node.js (v18 or higher) — download from https://nodejs.org

---

## How to Run

### Step 1 — Open terminal in this folder
Right-click the `divert-media` folder → **Open in Terminal**

### Step 2 — Install dependencies (first time only)
```
npm install
```

### Step 3 — Start the dev server
```
npm run dev
```

### Step 4 — Open in browser
```
http://localhost:5173
```

---

## Build for Production
```
npm run build
```
Output goes to the `dist/` folder — ready to deploy.

---

## Project Structure
```
divert-media/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       ← Fixed navbar with Contact Us button
│   │   ├── Hero.jsx         ← Full-screen video hero
│   │   ├── About.jsx        ← Who we are section
│   │   ├── Services.jsx     ← What we do accordion
│   │   ├── Reel.jsx         ← 2026 reel section
│   │   ├── Gallery.jsx      ← Photo grid gallery
│   │   └── Footer.jsx       ← Footer with logo
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json
```

## Assets
All images and video are loaded from the `assests/` folder in the parent directory (`../assests/`).
Make sure that folder exists with all images before running.
