# GitHub Pages Deployment Guide

This documents exactly how the Divert Media site was deployed to GitHub Pages.

**Live URL:** https://rahulm0598.github.io/Divert-media/
**Repo:** https://github.com/rahulm0598/Divert-media

---

## Why GitHub Pages needs special setup for Vite + React

A normal React app built with Vite assumes it lives at the **root** of a domain (e.g. `https://example.com/`).

GitHub Pages hosts project sites at a **subpath** (e.g. `https://username.github.io/repo-name/`).

Without telling Vite about this subpath, all your JS, CSS, image, and video links break (they point to `/assets/...` instead of `/Divert-media/assets/...`).

---

## Step 1 — Install the `gh-pages` npm package

```bash
cd divert-media
npm install --save-dev gh-pages
```

**What this does:**
- `gh-pages` is a CLI tool that takes your built `dist/` folder and pushes it to a special branch called `gh-pages` on GitHub.
- GitHub Pages then serves that branch as a website.
- `--save-dev` because it's only needed for deployment, not for the app itself.

---

## Step 2 — Tell Vite about the subpath (`vite.config.js`)

**Before:**
```js
export default defineConfig({
  plugins: [react()],
  ...
})
```

**After:**
```js
export default defineConfig({
  base: '/Divert-media/',   // ← add this line
  plugins: [react()],
  ...
})
```

**What `base` does:**
- Every asset URL Vite generates gets prefixed with `/Divert-media/`.
- So instead of `src="/assets/video.mp4"` it becomes `src="/Divert-media/assets/video.mp4"`.
- The value must match the **exact repo name** on GitHub (case-sensitive).

---

## Step 3 — Add deploy scripts to `package.json`

**Before:**
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

**After:**
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
"homepage": "https://rahulm0598.github.io/Divert-media/",
```

**What each line does:**

| Script | What it does |
|--------|-------------|
| `predeploy` | npm automatically runs this **before** `deploy`. It builds the app into `dist/`. |
| `deploy` | Runs `gh-pages -d dist` — pushes the `dist/` folder to the `gh-pages` branch on GitHub. |
| `homepage` | Tells tools (and humans) the public URL of the site. |

---

## Step 4 — Run the deploy command

```bash
npm run deploy
```

**What happens internally:**
1. npm sees `predeploy` → runs `npm run build` → Vite compiles everything into `dist/`
2. npm runs `deploy` → `gh-pages` tool:
   - Creates (or resets) a branch called `gh-pages` on GitHub
   - Pushes the contents of `dist/` to that branch
   - GitHub Pages serves that branch

You will see `Published` in the terminal when it succeeds.

---

## Step 5 — Enable GitHub Pages in repo settings (one-time only)

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`gh-pages`** / **`/ (root)`**
4. Click **Save**

After ~1 minute, GitHub shows the live URL:
```
https://rahulm0598.github.io/Divert-media/
```

---

## How the two branches work

```
main branch          ← your source code (React, JSX, etc.)
gh-pages branch      ← only the built dist/ output (HTML, CSS, JS)
```

You never manually edit `gh-pages`. The `npm run deploy` command fully manages it.

---

## Re-deploying after making changes

Every time you edit the site and want to update the live URL:

```bash
# 1. Build + push to gh-pages branch (updates the live site)
cd divert-media
npm run deploy

# 2. Also commit your source changes to main (saves your code)
cd ..
git add .
git commit -m "describe what you changed"
git push
```

Both steps matter:
- `npm run deploy` → updates the **live website**
- `git push` → saves your **source code** to GitHub

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Images/videos broken on live site | Check `base` in `vite.config.js` matches repo name exactly |
| Blank white page | Same — wrong or missing `base` value |
| `gh-pages` command not found | Run `npm install --save-dev gh-pages` again |
| Changes not showing live | Wait 1-2 minutes, then hard refresh (Ctrl+Shift+R) |
| 404 on direct URL visit | Add a `404.html` that redirects to `index.html` (SPA routing issue) |

---

## File changes summary

| File | Change |
|------|--------|
| `divert-media/vite.config.js` | Added `base: '/Divert-media/'` |
| `divert-media/package.json` | Added `predeploy`, `deploy` scripts and `homepage` field |
| `divert-media/package-lock.json` | Auto-updated by npm when `gh-pages` was installed |
