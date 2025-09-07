# Project Structure

## Root Directory
```
├── src/                    # Main source code
├── public/                 # Static assets
├── tests/                  # Test files
├── .kiro/                  # Kiro configuration
├── .next/                  # Next.js build output
├── node_modules/           # Dependencies
└── [config files]         # Various configuration files
```

## Source Code Organization (`src/`)

### Application Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/         # Public website routes
│   │   ├── [locale]/       # Internationalized routes
│   │   └── next/           # Next.js API routes (preview, etc.)
│   └── (payload)/          # Payload CMS admin routes
│       ├── admin/          # Admin panel
│       └── api/            # Payload API routes
```

### Core Components
```
src/
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   ├── AdminBar/           # Admin preview bar
│   ├── Media/              # Media display components
│   ├── RichText/           # Rich text renderer
│   └── [other components]
├── blocks/                 # Layout builder blocks
│   ├── ArchiveBlock/       # Content archive display
│   ├── Banner/             # Banner component
│   ├── CallToAction/       # CTA blocks
│   ├── Content/            # Rich content blocks
│   ├── Form/               # Form builder blocks
│   ├── MediaBlock/         # Media display blocks
│   └── RenderBlocks.tsx    # Block renderer
└── heros/                  # Hero section components
    ├── HighImpact/
    ├── MediumImpact/
    ├── LowImpact/
    ├── PostHero/
    └── RenderHero.tsx
```

### Data Layer
```
src/
├── collections/            # Payload CMS collections
│   ├── Pages/              # Page content type
│   ├── Posts/              # Blog posts
│   ├── Users/              # User management
│   ├── Media.ts            # File uploads
│   ├── Categories.ts       # Content taxonomy
│   └── [custom collections] # Business-specific content
├── globals/                # Global settings
│   ├── ContactInfo/        # Contact information
│   ├── LandingPage/        # Homepage settings
│   └── SiteSettings/       # Site-wide configuration
└── fields/                 # Reusable field definitions
    ├── slug/               # URL slug field
    ├── link.ts             # Link field type
    └── defaultLexical.ts   # Rich text configuration
```

### Internationalization
```
src/
├── i18n/                   # Internationalization
│   ├── messages/           # Translation files
│   │   ├── en.json         # English translations
│   │   └── ar.json         # Arabic translations
│   ├── localization.ts     # Locale configuration
│   ├── routing.ts          # i18n routing setup
│   └── request.ts          # Server-side i18n
└── middelware.ts           # Next.js i18n middleware
```

### Utilities & Providers
```
src/
├── utilities/              # Helper functions
│   ├── generateMeta.ts     # SEO meta generation
│   ├── getDocument.ts      # Data fetching
│   ├── formatDateTime.ts   # Date formatting
│   └── [other utilities]
├── providers/              # React context providers
│   ├── Theme/              # Theme management
│   └── HeaderTheme/        # Header theme context
├── hooks/                  # Custom React hooks
└── access/                 # Payload access control
    ├── authenticated.ts    # Auth-required access
    └── authenticatedOrPublished.ts # Public content access
```

## Naming Conventions

### Files & Directories
- **Components**: PascalCase directories with `index.tsx` or `Component.tsx`
- **Utilities**: camelCase `.ts` files
- **Collections**: PascalCase `.ts` files
- **Blocks**: PascalCase directories with `Component.tsx` and `config.ts`
- **Pages**: Next.js App Router conventions (`page.tsx`, `layout.tsx`)

### Code Conventions
- **React Components**: PascalCase function names
- **Hooks**: camelCase starting with `use`
- **Utilities**: camelCase function names
- **Types**: PascalCase interfaces/types
- **Constants**: UPPER_SNAKE_CASE

## Key Patterns

### Component Structure
```typescript
// Component.tsx - Main component implementation
// Component.client.tsx - Client-side only version
// config.ts - Payload CMS configuration
// index.tsx - Re-export or simple wrapper
```

### Route Organization
- `(frontend)` - Public website routes
- `(payload)` - Admin/API routes
- `[locale]` - Internationalized routes
- `[slug]` - Dynamic page routes

### Block System
Each block follows this pattern:
- `Component.tsx` - React component
- `config.ts` - Payload field configuration
- Optional client-side components for interactivity

### Access Control
- `authenticated.ts` - Requires login
- `authenticatedOrPublished.ts` - Public if published
- `anyone.ts` - Completely public

## Configuration Files Location
- **Payload Config**: `src/payload.config.ts`
- **Next.js Config**: `next.config.js` (root)
- **Tailwind Config**: `tailwind.config.mjs` (root)
- **TypeScript Config**: `tsconfig.json` (root)
- **Environment**: `.env` (root, use `.env.example` as template)