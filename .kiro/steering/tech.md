# Technology Stack

## Core Framework
- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.7.3** - Type safety
- **Payload CMS 3.54.0** - Headless CMS

## Database & Storage
- **MongoDB** - Primary database (via Mongoose adapter)
- **Sharp** - Image processing and optimization

## Styling & UI
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Accessible component primitives
- **Geist Font** - Typography (Sans & Mono)
- **Framer Motion** - Animations
- **Lucide React** - Icon library

## Internationalization
- **next-intl 4.3.6** - Internationalization for Next.js
- **Payload Translations** - CMS translations
- Supports English (LTR) and Arabic (RTL)

## Content & Rich Text
- **Lexical** - Rich text editor
- **Prism React Renderer** - Code syntax highlighting

## Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **pnpm** - Package manager (required)
- **cross-env** - Environment variables

## Testing
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Testing Library** - React testing utilities

## Build & Deployment
- **Docker** - Containerization support
- **Vercel** - Deployment platform support
- **Payload Cloud** - CMS hosting support

## Common Commands

### Development
```bash
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm dev:prod              # Build and start production locally
```

### Code Quality
```bash
pnpm lint                   # Run ESLint
pnpm lint:fix              # Fix ESLint issues
```

### Testing
```bash
pnpm test                   # Run all tests
pnpm test:int              # Run integration tests
pnpm test:e2e              # Run E2E tests
```

### Payload CMS
```bash
pnpm payload               # Access Payload CLI
pnpm generate:types        # Generate TypeScript types
pnpm generate:importmap    # Generate import map
```

### Package Management
```bash
pnpm ii                    # Install ignoring workspace
pnpm reinstall             # Clean reinstall
```

## Environment Requirements
- **Node.js**: ^18.20.2 || >=20.9.0
- **pnpm**: ^9 || ^10 (required, not npm/yarn)
- **MongoDB**: Latest (for database)

## Key Configuration Files
- `next.config.js` - Next.js configuration with Payload integration
- `payload.config.ts` - Payload CMS configuration
- `tailwind.config.mjs` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `middleware.ts` - Next.js middleware for i18n routing