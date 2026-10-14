# AI Resume Roaster (simple version)

Sign in with GitHub, upload your resume PDF, get a funny roast, a score and tips.

Tech: Next.js 14, Groq, pdf-parse, NextAuth.js, Prisma + Supabase, Tailwind CSS.

## Files

```
resume-roaster/
├── app/
│   ├── page.js                          The whole web page (login, upload, result)
│   ├── api/roast/route.js               Main logic: PDF -> text -> Groq -> save -> answer
│   ├── api/auth/[...nextauth]/route.js  Login with GitHub (NextAuth)
│   ├── layout.js, globals.css           Page wrapper and Tailwind
├── prisma/schema.prisma                 The database table
└── package.json, .env.example, next.config.mjs,
    tailwind.config.js, postcss.config.js, .gitignore    Setup files
```

## Run it

1. `npm install`
2. Supabase (supabase.com): create a free project, click **Connect**, copy the two connection strings.
3. GitHub (github.com/settings/developers): New OAuth App.
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Groq (console.groq.com): create a free API key.
5. Copy `.env.example` to `.env.local` and fill every value.
   For NEXTAUTH_SECRET run: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
6. `npx prisma db push` (creates the table)
7. `npm run dev` then open http://localhost:3000

## Put online (Vercel)

Upload the project to GitHub (not `.env.local`), import it on vercel.com, add the same values as Environment Variables (set NEXTAUTH_URL to your Vercel address), and add `https://your-app.vercel.app/api/auth/callback/github` as a callback URL in your GitHub OAuth App.

## Good to know

- Resume text is sent to Groq. Do not upload a resume you do not want an AI service to read.
- PDFs up to 4 MB. Scanned PDFs (pictures) do not work.
- Keep `.env.local` private.
