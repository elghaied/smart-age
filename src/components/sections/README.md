# Section Components

This directory contains reusable section components for the landing page migration.

## Naming Convention

Each section component should follow this structure:

```
src/components/sections/
├── SectionName/
│   └── index.tsx          # Main component implementation
└── README.md              # This documentation
```

## Component Guidelines

### Directory Naming
- Use **PascalCase** for directory names (e.g., `Hero`, `About`, `WhyUs`)
- Use descriptive names that clearly identify the section purpose
- Avoid abbreviations unless they are widely understood

### File Structure
- Each section should have its own directory
- Main component file should be named `index.tsx`
- Export the component as the default export

### Component Implementation
- Components should receive data as props from the LandingPage global
- Use TypeScript for type safety with Payload's auto-generated types
- Follow existing project patterns for styling (Tailwind CSS)
- Include proper error handling for missing or undefined data

### Example Component Structure

```typescript
// src/components/sections/Hero/index.tsx
import React from 'react'
import type { LandingPage } from '@/payload-types'

interface HeroProps {
  hero: LandingPage['hero']
}

export default function Hero({ hero }: HeroProps) {
  if (!hero) return null
  
  return (
    <section className="hero-section">
      {/* Component implementation */}
    </section>
  )
}
```

## Available Sections

The following sections are available in the LandingPage global configuration:

- **Hero** - Main hero section with title, subtitle, description, features, CTAs, and background
- **About** - About section with mission, values, and company description
- **WhyUs** - Why choose us section with title and subtitle
- **Goals** - Goals section with title and subtitle
- **Projects** - Projects section with title, subtitle, and description
- **Services** - Services section with title, subtitle, and description
- **Contact** - Contact section with title, subtitle, and description

## Integration Pattern

Section components are imported and used in the main landing page:

```typescript
// src/app/(frontend)/[locale]/page.tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import WhyUs from '@/components/sections/WhyUs'
import Goals from '@/components/sections/Goals'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'

export default function HomePage({ landingPageData }) {
  return (
    <>
      <Hero hero={landingPageData.hero} />
      <About about={landingPageData.about} />
      <WhyUs whyUs={landingPageData.whyUs} />
      <Goals goals={landingPageData.goals} />
      <Projects projects={landingPageData.projects} />
      <Services services={landingPageData.services} />
      <Contact contact={landingPageData.contact} />
    </>
  )
}
```