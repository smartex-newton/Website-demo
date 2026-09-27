# Electrocuted ⚡

An interactive electricity-learning platform inspired by game-like language-learning apps.

## Included
- Duolingo-style electricity learning path
- Persistent local progress and streak
- Interactive Three.js 3D component viewer
- Browser-based electronics workbench
- Arduino-style virtual board with LEDs/resistors
- Weekly real-world electricity project + challenge
- Responsive dashboard
- GitHub + Vercel ready

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to GitHub
Create a repository, then:
```bash
git init
git add .
git commit -m "Initial Electrocuted app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Deploy to Vercel
Import the GitHub repository into Vercel. The Next.js framework is detected automatically.

## User accounts
This starter persists progress in each browser with localStorage. For production multi-device accounts, connect Supabase/Auth0/Clerk and replace the local progress store with a database-backed profile.
