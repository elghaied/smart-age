# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SmartAge is a Payload CMS 3.x website built with Next.js 15 (App Router) and MongoDB. It features internationalization (English/Arabic with RTL support), a layout builder system, and uses UploadThing for media storage.

## Development Commands

```bash
pnpm dev                    # Start development server
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm lint                   # Run ESLint
pnpm lint:fix               # Fix linting issues

# Payload CMS commands
pnpm generate:types         # Regenerate payload-types.ts from collections/globals
pnpm generate:importmap     # Regenerate admin import map

# Testing
pnpm test:int               # Run integration tests (vitest)
pnpm test:e2e               # Run E2E tests (playwright)
pnpm test                   # Run all tests
```

## Architecture

### Payload CMS Configuration
- **Config**: `src/payload.config.ts` - Main Payload configuration
- **Collections**: `src/collections/` - Pages, Posts, Media, Categories, Users, plus custom collections (Values, Services, Projects, Goals, Features, TeamMembers)
- **Globals**: `src/globals/` - Header, Footer, ContactInfo, Homepage, SiteSettings
- **Blocks**: `src/blocks/` - Layout builder blocks (Banner, CallToAction, ArchiveBlock, Form, Code, Content, MediaBlock)

### Internationalization
- Two locales: English (default) and Arabic (RTL)
- Locale config: `src/i18n/localization.ts`
- Frontend routes use `[locale]` dynamic segment
- Admin panel supports both `en` and `ar`

### Frontend Structure
- **App Router**: `src/app/(frontend)/[locale]/` - All public pages
- **Payload Admin**: `src/app/(payload)/` - Admin panel routes
- **Components**: `src/components/` - Shared React components
- **Sections**: `src/components/sections/` - Page section components (Hero, Contact, etc.)

### Key Patterns
- **Access Control**: `src/access/` - Reusable access control functions (anyone, authenticated, authenticatedOrPublished)
- **Revalidation Hooks**: Collections/globals use `afterChange` hooks to revalidate Next.js cache
- **Fields**: `src/fields/` - Reusable field configurations (link, linkGroup, defaultLexical)
- **Utilities**: `src/utilities/` - Data fetching helpers (getGlobals, getDocument, getProjects, etc.)

### Plugins in Use
- `@payloadcms/plugin-form-builder` - Form collection and handling
- `@payloadcms/plugin-nested-docs` - Nested categories
- `@payloadcms/plugin-redirects` - URL redirects
- `@payloadcms/plugin-seo` - SEO fields on pages/posts
- `@payloadcms/plugin-search` - Search indexing for posts
- `@payloadcms/storage-uploadthing` - Media storage

### Database Seeding
See `SEED_IMPLEMENTATION_GUIDE.md` for the pattern used to seed localized content. Seed endpoint: `POST /next/seed` (requires authentication).

## Environment Variables

Required variables (see `.env.example`):
- `DATABASE_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - JWT encryption secret
- `NEXT_PUBLIC_SERVER_URL` - Public URL (no trailing slash)
- `UPLOADTHING_TOKEN` - For media uploads
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` - Email configuration (optional)

## Testing

- **Integration tests**: `tests/int/*.int.spec.ts` - Uses vitest with jsdom
- **E2E tests**: `tests/e2e/*.e2e.spec.ts` - Uses Playwright (Chromium)
- **Cross-browser tests**: `tests/cross-browser/` - Multi-browser Playwright tests

## Type Generation

After modifying collections or globals, regenerate types:
```bash
pnpm generate:types
```

This updates `src/payload-types.ts` which is used throughout the codebase.
