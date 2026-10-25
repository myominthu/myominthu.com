# myominthu.com

Personal portfolio and about-me website for Myo Min Thu (DJ).

Built with Next.js 15 (App Router) as a single static page. Deploys on Vercel with no extra settings.

## Edit content

All text lives in `lib/content.ts`: profile, facts, roles, career path, WRO finals, skills, services and education. Change it there and the page updates.

| File | What it holds |
|---|---|
| `lib/content.ts` | All site text |
| `app/page.tsx` | Page structure |
| `app/globals.css` | Colours, type and layout |
| `components/WroTrack.tsx` | The WRO finals track and robot animation |
| `public/images/` | Portrait and social share image |
| `public/files/Myo_Min_Thu_CV.pdf` | Downloadable CV (replace with a new PDF of the same name) |

Adding a new WRO final: add it to `wroFinals` in `lib/content.ts` and add a stop to `STOPS` and the path in `components/WroTrack.tsx`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Notes

- `/about` and `/services` from the old site redirect to the matching sections.
- The robot animation runs once when the track scrolls into view, and stays parked for visitors who prefer reduced motion.
