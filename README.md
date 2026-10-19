# PSGiTECH Campus Reuse Hub 3.0

Neon Cyber Campus — scaffold for the PSGiTECH Campus Reuse Hub web application.

Setup
1. Copy .env.example to .env.local and fill required variables.
2. npm install
3. npm run dev

Required environment variables
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (server only)
- OPENAI_API_KEY (server only)

Development notes
- This repository contains an initial scaffold: Next.js App Router, Tailwind CSS, Supabase client, a Sprout 3D component placeholder, and a server API endpoint at /api/chat.
- Run the app locally and follow README for applying SQL migrations located in /sql.

Security
- Do NOT commit any secrets. Add server-side keys via Vercel or your host's secure env configuration.
