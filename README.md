# SADP Sample

This repository is a Vite + React starter for the SADP sample project.

## Getting Started

1. Run `npm install`
2. Run `npm run dev`

## Contact Form Database Setup

This app uses a PostgreSQL database on Vercel to store contact form submissions.

Required environment variables:

1. `POSTGRES_URL` - your database connection string
2. `OFFICE_ACCESS_TOKEN` - a private code used by the parish office inbox page
3. `OFFICE_SESSION_SECRET` - a long random secret used to sign secure office sessions

Create the table once in your database:

```sql
CREATE TABLE IF NOT EXISTS messages (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	subject TEXT NOT NULL,
	message TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Vercel deployment notes:

1. Add Vercel Postgres to the project and copy the connection string into `POSTGRES_URL` if it is not added automatically.
2. Add `OFFICE_ACCESS_TOKEN` in the Vercel environment variables.
3. Add `OFFICE_SESSION_SECRET` in the Vercel environment variables.
4. Deploy the repo to Vercel.
5. The office inbox lives at `/parish-office/messages`.
6. The contact form submits to `/api/contact` and the inbox reads from `/api/messages`.

Local backend testing:

1. Run `npm run dev` for normal local development.
2. The Vite dev server now handles `/api/contact` and `/api/messages` locally in memory.
3. Use the office access code `SADP-OFFICE` in local development unless you set `OFFICE_ACCESS_TOKEN` yourself.
4. Set `OFFICE_SESSION_SECRET` locally to a long random value for stronger cookie session signing.
5. Set `POSTGRES_SSL=false` only if you are connecting to a local PostgreSQL server that does not use SSL.
