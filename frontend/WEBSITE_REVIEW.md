# Website Review

Date: 2026-09-11

## Executive summary

This project is a solid foundation for a medical blog / editorial website built with Next.js 16, App Router, Tailwind CSS v4, and Sanity. The app already has a clear visual direction, a working blog structure, and meaningful Sanity-driven content flows for posts, categories, related content, and article metadata.

The main gap is not product vision or content architecture; it is implementation quality and operational hygiene. The current codebase is close to production-ready from a design and feature standpoint, but it still contains several issues that reduce reliability, build safety, and maintainability.

## Current status

### What is working well

- Clear single-brand editorial layout for a medical lifestyle blog.
- App Router structure is clean and easy to follow.
- Sanity is integrated for main blog data, categories, featured posts, and article details.
- Article page includes metadata generation, related posts, recent posts, and previous/next navigation.
- The site uses a custom design system in CSS and Tailwind, giving it a distinctive look without heavy UI library overhead.

### Verified technical issues

I verified the project health by running the lint command:

- npm run lint
- Result: 1 error and 11 warnings
- The blocking error is in lib/sanity/image.ts, where urlFor(source: any) uses an explicit any type.

This matters because the project is already configured to ignore TypeScript build errors in next.config.ts, which weakens the safety net for production deployment.

## Findings

### High priority



2. There is a real lint error in the Sanity image helper
   - lib/sanity/image.ts defines urlFor(source: any).
   - ESLint reports this as an explicit-any violation.
   - Even though it is small, this is a recurring indicator that the app is not fully clean at a TypeScript quality level.



### Medium priority

5. Newsletter functionality is not complete
   - The form behavior is present visually, but it does not connect to a backend or email service.
   - There is no success/error state management, validation strategy, or persistence flow.
   - This is a feature gap rather than a styling issue, but it matters for conversion and trust.
   - File: components/home/NewsLatter.tsx



8. The default Next.js metadata is still in place
   - app/layout.tsx still exposes Create Next App metadata.
   - This is a basic SEO gap and makes the site look unfinished from a production perspective.



### Lower priority

11. Accessibility and UX basics need tightening
   - The Navbar search action is visually present but behaves like a link to the blog section rather than a real search interaction.
   - The app uses raw img in About, which triggers Next.js image optimization warnings.
   - There is no clear server-side error or fallback pattern for missing Sanity environment variables.

12. Sanity configuration should be validated early
   - lib/sanity/client.ts reads projectId and dataset from environment variables without clear validation.
   - A missing value will fail later in a less helpful way.

15. Date safety is still fragile
   - The date formatter is not defensive enough for invalid or missing values.
   - The app should fail gracefully rather than rendering Invalid Date in the UI.
   - File: lib/formateDateTime.ts

## Content and data model assessment

### Sanity integration is good in key areas

The project is already connected to Sanity for:

- Home page post list
- Featured posts
- Categories
- Category filtering
- Article content
- Article cover image
- SEO data
- Related posts
- Recent posts
- Sidebar category counts
- Previous and next article navigation

This is a strong foundation and the architecture is appropriate for a small editorial publication.

### Data that should move into a site settings document

Several pieces of content are still hard-coded and should eventually be managed by a Sanity singleton such as siteSettings:

- Doctor name and title
- Brand initials
- Hero copy and CTA content
- About section biography
- Social and contact links
- Footer text
- Medical disclaimer
- Credentials and location data

This would make the entire site easier to maintain and reduce editor onboarding friction.

## Recommendations

### Short-term fixes

1. Remove the explicit any from the Sanity image helper and restore stricter TypeScript hygiene.
2. Disable or remove ignoreBuildErrors in next.config.ts once the project is passing type checks.
3. Rework the article content wrapper to consistently use the defined article styling classes.
4. Fix navigation anchors for article pages so they resolve correctly from any route.
5. Replace hard-coded doctor metadata with a Sanity-backed settings document.
6. Fix the raw img usage in the About section by switching to Next Image with a proper source.
7. Complete the newsletter feature or temporarily disable it behind a clear placeholder state.

### Medium-term improvements

1. Establish a proper site settings schema in Sanity and consume it in the home page and header/footer.
2. Clean up the default metadata and implement a strong SEO configuration for titles, descriptions, and social previews.
3. Review the article layout and typography system for consistency between CSS classes and PortableText output.
4. Replace remaining generic project documentation with project-specific setup instructions.
5. Add a basic quality gate in CI for lint + type-check + build.

## Final assessment

The project already has a recognizable editorial identity and a sensible architecture for a content-led website. The foundation is good, and the content model is in place. The biggest issue is that the implementation has not yet been fully tightened up to production quality, especially around lint health, TypeScript safety, static content, and CMS-driven content ownership.

If the team addresses the current cleanup and quality issues first, this project should become a reliable and scalable content publishing platform with a strong editorial brand.

## Scope note

This review reflects the current codebase state as of 2026-09-11 and is based on direct inspection of the app structure and the latest lint output from the project.
