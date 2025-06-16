# Q12 Priority Selector

A simple Next.js app to select and prioritize Gallup Q12 questions. User choices are saved to a file.

## Features

- Display 5 Q12 questions
- Select one or more questions and assign a priority (1-5)
- Save selections to a file (`data/selections.json`)

## Development

```bash
npm install
npm run dev
```

## Deploy on Vercel

Push to a GitHub repository and import in [vercel.com](https://vercel.com/).

## Notes

- File saving uses the local filesystem. On Vercel, API routes cannot write to disk; use a persistent DB or external storage for production.