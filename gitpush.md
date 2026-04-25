# Push Divert Media project to GitHub

Repository: https://github.com/rahulm0598/Divert-media

## Steps performed

### 1. Verified directory state
```bash
cd "D:/Divert project sreerag"
git status        # → fatal: not a git repository  (so we initialize)
```

### 2. Created `.gitignore`
At repo root `D:/Divert project sreerag/.gitignore` to keep `node_modules/`, `dist/`, `.env`, `.claude/` etc. out of the commit.

### 3. Initialized git repo
```bash
git init
git branch -M main
```

### 4. Connected remote
```bash
git remote add origin https://github.com/rahulm0598/Divert-media.git
```

### 5. Staged and committed all source
```bash
git add .gitignore gitpush.md "divert-media" "assests" "demo figmA"
git commit -m "Initial commit: Divert Media production site"
```

### 6. Pushed to GitHub
```bash
git push -u origin main
```
> If the remote already has commits, run `git pull --rebase origin main` first, or `git push -u origin main --force` only if you intend to overwrite (destructive — confirm before using).

## Re-running later (after edits)

```bash
cd "D:/Divert project sreerag"
git status
git add <changed files>
git commit -m "describe what changed"
git push
```

## Notes
- Folder name **`assests`** has a typo — intentionally kept because the Vite alias `@assets` in `divert-media/vite.config.js` points to it. Renaming it would require updating the alias.
- `node_modules/` is **not** pushed; teammates run `npm install` inside `divert-media/` after cloning.
- `divert-media/dist/` (build output) is also ignored.
