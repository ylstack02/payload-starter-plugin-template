# Admin App Foundation Structure

This document describes the multi-tenant admin application built with Next.js App Router, Tailwind CSS, and Shadcn/ui components.

## Directory Structure

```
dev/
├── app/
│   ├── (admin)/                    # Custom admin app namespace
│   │   ├── layout.tsx              # Admin app root layout with ThemeProvider
│   │   ├── globals.css             # Tailwind styles and CSS variables
│   │   ├── page.tsx                # Admin root (redirects to login)
│   │   ├── login/
│   │   │   └── page.tsx            # Login page
│   │   └── tenant/
│   │       └── [tenantSlug]/
│   │           └── page.tsx        # Tenant-specific dashboard
│   ├── (payload)/                  # Auto-generated Payload admin (unchanged)
│   │   ├── admin/
│   │   ├── api/
│   │   └── layout.tsx
│   └── my-route/
├── components/
│   ├── RouteGuard.tsx              # Client-side route protection wrapper
│   ├── ThemeProvider.tsx           # Next-themes provider setup
│   └── ui/                         # Shadcn/ui primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── label.tsx
├── lib/
│   └── utils.ts                    # Utility functions (cn helper, etc.)
├── middleware.ts                   # Next.js middleware for auth cookie checking
└── .env.example                    # Environment variable template
```

## Key Features

### Tenant-Aware Routing

Routes are organized by tenant slug:
- `/admin/login` - Public login page
- `/admin/tenant/[tenantSlug]` - Tenant-specific dashboard
- `/admin/tenant/[tenantSlug]/...` - Nested admin routes per tenant

### Authentication & Authorization

1. **Middleware Protection**: `dev/middleware.ts` checks for the `ADMIN_COOKIE_NAME` cookie on all `/admin` requests
2. **Route Guard Component**: `RouteGuard` wrapper provides client-side auth verification
3. **Login Flow**: Users redirect to login if no valid cookie is present

### Styling & Theming

- **Tailwind CSS**: Configured with custom color tokens sourced from CSS variables
- **Theme Variables**: Defined in `globals.css` with light/dark mode support
- **Next-themes**: Provides theme switching capability
- **Shadcn/ui**: Pre-built accessible components (Button, Card, Input, Label, etc.)

### Environment Variables

Required variables in `dev/.env`:

```
PAYLOAD_SERVER_URL=http://localhost:3000          # Your Payload API URL
PAYLOAD_REST_PATH=/api/payload                     # Payload API REST path
ADMIN_COOKIE_NAME=payload-token                    # Name of auth cookie
```

## Component Architecture

### UI Components (`dev/components/ui/`)

Built on Radix UI with Tailwind CSS styling:

- **Button**: Flexible button with variants (default, destructive, outline, ghost, link)
- **Card**: Container for grouped content
- **Input**: Text input with focus states
- **Label**: Form label with accessibility support
- **Dialog**: (Can be extended from `@radix-ui/react-dialog`)

### Providers

**ThemeProvider**: Wraps the app with `next-themes` to enable:
- Light/dark mode toggling
- System preference detection
- Persistent theme selection

**RouteGuard**: Client-side auth wrapper that:
- Verifies auth status on mount
- Redirects to login if unauthorized
- Supports optional fallback UI

## Styling System

### CSS Custom Properties

Colors are defined as HSL variables for easy theming:

```css
--color-primary: 0 0% 9%;
--color-secondary: 0 0% 96.1%;
--color-accent: 0 0% 9%;
/* ... etc ... */
```

These map to Tailwind classes:
- `text-primary` → primary text color
- `bg-secondary` → secondary background
- `border-border` → border color

### Adding Theme Colors

Update `tailwind.config.ts` to add new theme tokens:

```typescript
theme: {
  extend: {
    colors: {
      newColor: 'hsl(var(--color-new-color) / <alpha-value>)',
    },
  },
}
```

Then add the CSS variable in `globals.css`:

```css
--color-new-color: 0 0% 50%;
```

## Extending the Admin App

### Adding New Pages

Create routes following Next.js App Router conventions:

```
dev/app/(admin)/tenant/[tenantSlug]/users/page.tsx
dev/app/(admin)/tenant/[tenantSlug]/products/page.tsx
dev/app/(admin)/tenant/[tenantSlug]/settings/page.tsx
```

### Using the RouteGuard

```tsx
import { RouteGuard } from '@/components/RouteGuard'

export default function ProtectedPage() {
  return (
    <RouteGuard>
      <h1>This page requires authentication</h1>
    </RouteGuard>
  )
}
```

### Styling Components

Use Tailwind classes directly or via the `cn` utility:

```tsx
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function MyComponent() {
  return (
    <Button 
      className={cn('w-full', someCondition && 'opacity-50')}
      variant="outline"
    >
      Click me
    </Button>
  )
}
```

## Separated from Payload Admin

The custom admin app (`(admin)`) is completely separate from the auto-generated Payload admin (`(payload)`):

- **Payload Admin**: Generated at `/` (payload routes) - DO NOT MODIFY
- **Custom Admin**: Located at `/admin` - For custom business logic and UI
- Both run in the same Next.js instance but serve different purposes

This separation allows:
- Freedom to design the custom admin interface
- Preservation of auto-generated Payload admin
- Potential for different styling and functionality

## Deployment

The admin app is included in standard Next.js deployments:

```bash
# Build
npm run build

# Start
npm start
```

Ensure environment variables are set in your deployment environment:
- `PAYLOAD_SERVER_URL`
- `PAYLOAD_REST_PATH`
- `ADMIN_COOKIE_NAME`
