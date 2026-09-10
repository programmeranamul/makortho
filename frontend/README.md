# Dr. Maya Chen Blog

A medical editorial blog built with Next.js, Tailwind CSS, and Sanity. The site includes article pages, category filtering, featured posts, related content, and a branded medical content experience.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Sanity CMS
- TypeScript

## Prerequisites

- Node.js 20+
- npm
- A Sanity project with a configured dataset

## Environment variables

Create a `.env.local` file in the project root with the following values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

You may also need additional environment values depending on your Sanity configuration and deployment setup.

## Install and run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Useful commands

```bash
npm run build
npm run lint
npm run start
```

## Content model

This project expects Sanity data for:

- posts
- categories
- article content blocks
- cover images
- SEO fields such as meta title and description

## Notes

This app is designed for a medical education blog and includes sections for hero content, feature articles, latest posts, about content, and newsletter CTA copy.
