# Project Context

## Project Type
Mobile app (React Native / Expo)

## Stack

### Language & Runtime
- TypeScript ~5.9.2
- React 19.1.0 / React Native 0.81.5
- Node.js (dev tooling)

### Framework
- Expo ~54.0.33 with Expo Router ~6.0.23 (file-based routing)
- React Navigation (@react-navigation/native ^7, @react-navigation/bottom-tabs ^7)

### Styling
- Tailwind CSS ^4.1.18 via `uniwind` ^1.3.1 (Tailwind for React Native)
- `tailwind-merge` ^3.4.1, `class-variance-authority` ^0.7.1, `clsx` ^2.1.1
- `prettier-plugin-tailwindcss` for class sorting
- Global styles in `styles/global.css`

### Database & ORM
- SQLite via `expo-sqlite` ^16.0.10
- Drizzle ORM ^0.45.1 with `drizzle-kit` ^0.31.9
- Schema defined in `libs/database/schema/`
- Migrations in `libs/database/migrations/`
- Dialect: SQLite, driver: expo

### State Management
- `zustand` ^5.0.11 — stores in `shared/stores/`
- `@tanstack/react-query` ^5.90.21 — server/async state
- `react-hook-form` ^7.71.2 — form state
- `react-native-mmkv` ^4.1.2 — persistent key-value storage

### Testing
- No testing framework detected

### Build & Tooling
- pnpm (pnpm-lock.yaml, pnpm-workspace.yaml)
- Metro bundler (`metro.config.js`)
- Babel (`babel.config.js`)
- ESLint ^9.25.0 with `eslint-config-expo`, `eslint-plugin-import`
- Prettier ^3.8.1

### Analytics & Monitoring
- PostHog (`posthog-react-native` ^4.36.0, `posthog-react-native-session-replay`)
- Sentry (`@sentry/react-native` ^8.1.0)

### Deployment
- Expo managed workflow (targets iOS and Android)
- Native directories: `ios/`, `android/`

## Project Structure

```
app/                   # Expo Router screens (file-based routing)
  (home)/              # Tab group for home/dashboard
  onboarding/          # Onboarding flow screens
  transactions/        # Transaction detail/list screens
  add-transaction.tsx  # Add transaction modal screen
  add-category.tsx     # Add category modal screen
  ...
components/            # Reusable UI components
  screens/             # Screen-specific component compositions
  ui/                  # Generic UI primitives
  app-providers/       # React context/provider wrappers
libs/                  # Core business logic
  database/            # Drizzle client, schema, migrations, repositories
  analytics/           # PostHog analytics wrapper
  fetcher/             # Data fetching utilities
  telemetry/           # Sentry telemetry
shared/                # Cross-cutting utilities
  constants/           # App-wide constants
  hooks/               # Custom React hooks
  stores/              # Zustand stores
  types/               # Shared TypeScript types
  utils/               # Helper functions
styles/                # Global CSS (Tailwind base)
assets/                # Static assets (images, fonts)
types/                 # Global type declarations
```

## Environment Variables

| Key | Purpose |
|-----|---------|
| `EXPO_PUBLIC_APP_ENVIRONMENT` | App environment (`development`, `production`, etc.) |
| `EXPO_PUBLIC_POSTHOG_API_KEY` | PostHog analytics API key |
| `EXPO_PUBLIC_SENTRY_DSN` | Sentry error reporting DSN (currently commented out) |
| `SENTRY_AUTH_TOKEN` | Sentry upload auth token (currently commented out) |

> All `EXPO_PUBLIC_*` variables are bundled into the client app at build time.

## Development Commands

```bash
pnpm start              # Start Expo dev server
pnpm android            # Run on Android emulator/device
pnpm ios                # Run on iOS simulator/device
pnpm web                # Run in browser
pnpm lint               # Run ESLint
pnpm db:generate        # Generate Drizzle migration (requires --name flag)
```
