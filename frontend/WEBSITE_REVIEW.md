# Website Review

Date: 2026-09-05

## Overview

This is a Next.js 16 App Router blog using Sanity for blog content, Tailwind CSS v4, shadcn configuration, Base UI, Lucide icons, and custom global CSS.

The home page fetches posts and categories from Sanity. Article pages fetch the article, related posts, recent posts, categories, and adjacent articles from Sanity. The hero, doctor profile, newsletter, navigation identity, footer identity, and medical disclaimer are currently static.

## Findings

### High priority

1. **Article metadata is not fetched**
   - The article page renders date, reading time, author, and updated date.
   - The Sanity article query does not request those fields.
   - These values will therefore be empty on article pages.
   - Files: `app/posts/[slug]/page.tsx`, `lib/sanity/api.ts`

2. **Production TypeScript errors are ignored**
   - `next.config.ts` sets `typescript.ignoreBuildErrors` to `true`.
   - Several components use untyped props, including `FeaturePost`, `TheLatest`, and `PostCard`.
   - This can allow broken code to pass production builds.
   - File: `next.config.ts`

3. **Article CSS classes are not connected**
   - The stylesheet defines `.article-cover` and `.article-body` styles.
   - The article page renders the image and Portable Text without those classes.
   - Much of the article typography and spacing CSS is therefore unused.
   - Files: `app/posts/[slug]/page.tsx`, `app/globals.css`

### Medium priority

4. **Newsletter form is not functional**
   - Submission is prevented with `preventDefault()`.
   - There is no API endpoint, email service, persistence, success state, or error state.
   - File: `components/home/NewsLatter.tsx`

5. **Static doctor profile content**
   - Doctor name, biography, credentials, location, experience, and image are hard-coded.
   - The current external image is a male doctor image while the page presents Dr. Maya Chen.
   - It uses a raw `<img>` instead of optimized `next/image`.
   - File: `components/home/About.tsx`

6. **Navigation anchors can fail on article pages**
   - Navbar and footer links use anchors such as `#articles` and `#about`.
   - On `/posts/[slug]`, these anchors do not exist on the article page.
   - They should point to the home page, for example `/#articles`.
   - Files: `components/Navbar.tsx`, `components/Footer.tsx`

7. **Tailwind v4 utility warnings**
   - Portable Text uses old important syntax such as `!mt-10` and `!mb-4`.
   - Tailwind v4 recommends `mt-10!` and `mb-4!`.
   - File: `components/posts/PortableTextComponents.tsx`

8. **Sanity environment variables are not validated**
   - Project ID and dataset are read from environment variables without validation.
   - Missing configuration will fail later at runtime with a less useful error.
   - File: `lib/sanity/client.ts`

### Lower priority

9. **Default metadata remains**
   - The site still uses `Create Next App` and the default description.
   - File: `app/layout.tsx`

10. **shadcn Button is installed but unused**
    - `components/ui/button.tsx` uses `@base-ui/react` and class-variance-authority.
    - The application uses custom CSS buttons instead.
    - The generated component references theme variables such as `secondary`, `destructive`, and `input`, which are not defined in `app/globals.css`.

11. **README is still generic**
    - It contains create-next-app documentation.
    - It does not explain Sanity setup, environment variables, content requirements, or the actual project commands.
    - File: `README.md`

12. **Font configuration is inconsistent**
    - Geist is loaded in `app/layout.tsx`.
    - `app/globals.css` declares Inter as the primary font, so the loaded Geist variable is not being used as the main font.

13. **Unused imports and cleanup remain**
    - `app/page.tsx` contains imports that are not used.
    - `Navbar.tsx` also contains unused icon imports.

14. **Search icon is not a real search control**
    - The navbar search icon only navigates to the articles section.
    - It does not focus the article search input or open a search interface.

15. **Date formatting is not defensive**
    - Invalid or missing dates can display `Invalid Date`.
    - File: `lib/formateDateTime.ts`

## Static Data To Move To Sanity

### Site settings document

These values would fit a Sanity singleton such as `siteSettings`:

- Doctor name and professional title
- Brand initials
- Hero eyebrow, heading, description, quote, and attribution
- About heading and biography
- About image and image alt text
- Credentials, location, and years of experience
- Contact email
- Social links
- Footer text
- Medical disclaimer

Relevant files:

- `components/home/Hero.tsx`
- `components/home/About.tsx`
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/posts/MedicalDisclaimer.tsx`

### Newsletter integration

Newsletter text can be stored in Sanity, but subscriber email addresses should normally be sent to a dedicated email/newsletter service through a server-side API route or server action.

Relevant file:

- `components/home/NewsLatter.tsx`

### Article document fields

The Sanity post schema/query should provide:

- `publishedAt`
- `author` or an author reference
- `updatedAt` or equivalent
- Cover image and alt text
- Category
- Portable Text content
- SEO title, description, and image

Relevant files:

- `lib/sanity/api.ts`
- `app/posts/[slug]/page.tsx`

## Data Already Connected To Sanity

- Home page post list
- Featured posts
- Categories
- Category filtering data
- Article content
- Article cover image
- Article SEO fields
- Related posts
- Recent posts
- Sidebar category counts
- Previous and next article navigation

## Recommended Implementation Order

1. Fix the article query and article metadata fields.
2. Connect the site profile and static homepage content to a Sanity site-settings document.
3. Connect the article layout to `.article-cover` and `.article-body` styles.
4. Fix Tailwind v4 important utility syntax.
5. Fix navigation URLs for article pages.
6. Implement newsletter submission and feedback states.
7. Add proper TypeScript prop types and stop ignoring build errors.
8. Decide whether to adopt the generated shadcn Button or remove unused shadcn/Base UI setup.
9. Replace default metadata and update the README.
10. Run lint, type-check, build, and responsive browser checks.

## Scope Note

This document records analysis only. No application code was modified as part of this review.
