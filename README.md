# React Vite Template

A comprehensive, production-ready React template built with modern tools and best practices for scalable web applications.

## 🚀 Features

- ⚡ **Vite 7.0** - Lightning fast build tool with HMR and enhanced optimization
- ⚛️ **React 19.1** - Latest React with concurrent features and improved performance
- 🎯 **TypeScript 5.8** - Full type safety with latest language features
- 🎨 **Panda CSS 0.54** - Zero-runtime CSS-in-JS with design tokens and atomic styles
- 🧭 **React Router 7.6** - Enhanced routing with data loading capabilities
- 🔄 **TanStack Query 5.81** - Powerful data fetching, caching, and synchronization
- 🧹 **ESLint 9** - Modern linting with flat config and TypeScript support
- 🔧 **Express 5.1** - SSR, API support, and production-ready middleware
- 🔒 **SSL/HTTPS** - Secure development environment with auto-generated certificates
- 📦 **Modular Architecture** - Clean, scalable project structure with separation of concerns
- 🚀 **SWC Compiler** - Fast TypeScript/JavaScript compilation via Vite plugin
- 🛠️ **Development Tools** - Hot reload, TypeScript paths, and modern dev experience
- 🎯 **Git Hooks** - Automated code quality checks with Husky
- 📝 **Conventional Commits** - Enforced commit message standards with Commitlint

## 📋 Tech Stack

### Core Framework
- **React 19.1** - Latest UI library with concurrent features, automatic batching, and improved hydration
- **TypeScript 5.8** - Type-safe JavaScript with latest language features
- **Vite 7.0** - Next-generation build tool with instant HMR and optimized production builds

### Styling & Design
- **Panda CSS 0.54** - Zero-runtime CSS-in-JS with design tokens, utility classes, and component variants
- **PostCSS 8.5** - Modern CSS processing with autoprefixer and optimization

### Routing & State Management
- **React Router 7.6** - Declarative routing with data loading and streaming capabilities
- **TanStack Query 5.81** - Server state management with caching, background updates, and optimistic updates
- **TanStack Query DevTools** - Development tools for debugging queries
- **Ky 1.8** - Modern, lightweight HTTP client with automatic retries

### Development & Quality
- **ESLint 9** - Code linting with flat config and TypeScript rules
- **TypeScript ESLint 8.34** - Advanced TypeScript-specific linting rules
- **SWC 3.10** - Fast TypeScript/JavaScript compiler via Vite plugin
- **TSX 4.20** - TypeScript execution for build scripts
- **Husky 9.1** - Git hooks for automated code quality checks
- **Commitlint 19.8** - Conventional commit message linting and enforcement
- **Lint-staged 16.1** - Run linters on staged files only for faster commits
- **Dependabot** - Automated dependency updates via GitHub

### Server & Production
- **Express 5.1** - Node.js server framework with middleware support
- **Cookie Parser 1.4** - Secure cookie handling and parsing
- **Compression 1.8** - Response compression for better performance
- **Sirv 3.0** - Static file serving for production
- **Dotenv 17.0** - Environment variable management

### Utilities & Helpers
- **Humps 2.0** - String case conversion utilities
- **Query String 9.2** - URL query string parsing and stringifying
- **Minimatch 10.0** - Glob pattern matching
- **AbortController Polyfill** - Fetch cancellation support

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **Yarn** (recommended) or **npm** or **pnpm**

### Installation

1. **Clone or download this template:**
   ```bash
   git clone <repository-url>
   cd react-vite-template
   ```

2. **Install dependencies:**
   ```bash
   # Using Yarn (recommended)
   yarn install

   # Using npm
   npm install

   # Using pnpm
   pnpm install
   ```

3. **Generate SSL certificates (optional for HTTPS):**
   ```bash
   yarn certs:generate
   ```

4. **Initialize Panda CSS (first time only):**
   ```bash
   yarn panda
   ```

5. **Generate Panda CSS files:**
   ```bash
   yarn prepare
   ```

6. **Start development server:**
   ```bash
   yarn dev
   ```

7. **Open your browser:**
   The app will be available via the custom development script (check console for URL)

## 📝 Available Scripts

### Development
- `yarn dev` - Start development server using custom prepare-app script
- `yarn dev:ssr` - Start development server with Server-Side Rendering
- `yarn prepare` - Setup Husky Git hooks and generate Panda CSS files (runs automatically on install)

### Panda CSS
- `yarn panda` - Initialize Panda CSS (run once when first setting up the project)
- `yarn panda --watch` - Watch mode for Panda CSS during development (regenerates styles on file changes)

### Build & Production
- `yarn build` - Build for production (TypeScript compilation + Vite build)
- `yarn build:ssr` - Build with Server-Side Rendering support
- `yarn build:client` - Build client bundle only (TypeScript + Vite)
- `yarn build:server` - Build server bundle for SSR

### Preview & Testing
- `yarn preview` - Preview production build using dev script with --preview flag
- `yarn preview:ssr` - Preview SSR build

### Code Quality
- `yarn lint` - Run ESLint for code quality and style checking

### Utilities
- `yarn certs:generate` - Generate SSL certificates for HTTPS development

## 🏗️ Project Structure

```
react-vite-template/
├── .github/                # GitHub configuration
│   └── dependabot.yml     # Dependabot configuration for dependency updates
├── .husky/                 # Git hooks configuration
│   ├── commit-msg         # Commit message validation
│   └── pre-commit         # Pre-commit linting
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/                   # Source code
│   ├── @types/            # TypeScript type definitions
│   │   ├── abort-controller-polyfill.d.ts
│   │   ├── global.d.ts
│   │   ├── react-query.d.ts
│   │   ├── react-router.d.ts
│   │   └── vite-env.d.ts
│   ├── components/        # Reusable UI components
│   │   ├── elements/      # Basic UI elements
│   │   ├── layouts/       # Layout components
│   │   ├── modules/       # Feature-specific components
│   │   │   └── home/      # Home page components
│   │   └── shapes/        # Shape/graphic components
│   ├── constants/         # App constants and configuration
│   │   ├── config.ts      # App configuration
│   │   ├── cookies.ts     # Cookie constants
│   │   └── routes.ts      # Route constants
│   ├── hooks/             # Custom React hooks
│   │   └── react-query/   # TanStack Query hooks
│   │       ├── index.ts
│   │       ├── types.ts
│   │       ├── use-infinite-query.ts
│   │       ├── use-mutation.ts
│   │       ├── use-query.ts
│   │       └── use-suspense-infinite-query.ts
│   ├── models/            # TypeScript interfaces and types
│   │   └── api.ts         # API response types
│   ├── react-query/       # TanStack Query configuration
│   │   ├── client.ts      # Query client setup
│   │   ├── config.ts      # Query configuration
│   │   └── wrapper.tsx    # Query provider wrapper
│   ├── repositories/      # Data access layer
│   │   ├── auth/          # Authentication repositories
│   │   └── common/        # Common repository patterns
│   ├── routes/            # Route definitions
│   │   └── index.tsx      # Route configuration
│   ├── utils/             # Utility functions
│   │   ├── cookie/        # Cookie utilities
│   │   ├── react-query/   # Query utilities
│   │   ├── react-router/  # Router utilities
│   │   ├── string/        # String utilities
│   │   └── url/           # URL utilities
│   ├── entry-client.tsx   # Client-side entry point
│   ├── entry-server.tsx   # Server-side entry point
│   └── main.tsx           # Application entry point
├── server/                # Express server code
│   ├── api/               # API routes
│   │   ├── auth.ts        # Authentication endpoints
│   │   └── index.ts       # API router
│   ├── constants.ts       # Server constants
│   ├── index.tsx          # Server entry point
│   └── utils.ts           # Server utilities
├── scripts/               # Build and development scripts
│   ├── generate-ssl-certs.ts # SSL certificate generation
│   └── prepare-app/       # App preparation scripts
│       ├── index.ts
│       └── utils.ts
├── styled-system/         # Generated Panda CSS files
│   ├── css/               # CSS utilities
│   ├── patterns/          # Layout patterns
│   ├── tokens/            # Design tokens
│   └── types/             # Type definitions
├── certs/                 # SSL certificates (generated)
├── dist/                  # Build output
├── .env                   # Environment variables
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── .commitlintrc.json     # Commitlint configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── panda.config.ts        # Panda CSS configuration
├── postcss.config.cjs     # PostCSS configuration
├── setup-host.sh          # Host setup script
├── tsconfig.json          # Base TypeScript configuration
├── tsconfig.app.json      # App TypeScript config
├── tsconfig.node.json     # Node TypeScript config
├── vite.config.ts         # Vite configuration
└── yarn.lock              # Yarn lock file
```

## 🎨 Styling with Panda CSS

This template uses Panda CSS for zero-runtime CSS-in-JS with design tokens and utility classes.

### Initial Setup

When first setting up the project, you need to initialize Panda CSS:

```bash
# Initialize Panda CSS (first time only)
yarn panda

# For development with auto-regeneration
yarn panda --watch
```

This generates the `styled-system/` directory with all CSS utilities, patterns, and type definitions.

### Basic Usage

```tsx
import { css } from '@/styled-system/css'
import { Stack, HStack } from '@/styled-system/patterns'

function MyComponent() {
  return (
    <Stack gap="4" p="6">
      <h1 className={css({ fontSize: '2xl', color: 'blue.500' })}>
        Hello World
      </h1>
      <HStack gap="2">
        <button className={css({ bg: 'blue.500', color: 'white', px: '4', py: '2' })}>
          Click me
        </button>
      </HStack>
    </Stack>
  )
}
```

### Configuration

Customize Panda CSS in `panda.config.ts`:

```ts
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      // Add your custom design tokens here
    },
  },
  outdir: "styled-system",
})
```

## 🧭 Routing

This template uses React Router v7 with file-based routing patterns.

### Route Definition

Routes are defined in `src/routes/index.tsx`:

```tsx
import { createBrowserRouter } from 'react-router'

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]

export default routes
```

## 🔄 Data Fetching

This template follows a repository pattern where data fetching logic is defined in repositories first, then consumed through repository hooks in components.

### Repository Structure

The template implements a clean separation of concerns:

```
repositories/
├── auth/           # Authentication-related data operations
│   ├── models/     # Type definitions and constants
│   ├── mutations/  # Authentication mutations (login, logout)
│   └── index.ts    # Exports all auth operations
├── common/         # Shared/common data operations
│   ├── models/     # Shared type definitions
│   ├── queries/    # Common queries (profile, etc.)
│   ├── mutations/  # Common mutations
│   └── index.ts    # Exports all common operations
```

### Repository Hooks (useR* pattern)

All data operations are encapsulated in repository hooks with the `useR*` naming convention:

#### Profile Query Hook

```tsx
// src/repositories/common/queries/use-r-get-profile.ts
import { type UseQueryOptions, useQuery } from "@/hooks/react-query";
import type { ApiError, ApiResult } from "@/models/api";
import { GET_PROFILE_KEY, type Profile } from "../models";

export function useRGetProfile(
  options: UseQueryOptions<ApiResult<Profile>, ApiError> = {},
) {
  const { meta, ...resOptions } = options;

  return useQuery<ApiResult<Profile>, ApiError>({
    queryKey: GET_PROFILE_KEY,
    meta: { ...meta, apiVersion: "2" },
    ...resOptions,
  });
}
```

#### Authentication Mutation Hook

```tsx
// src/repositories/auth/mutations/use-r-login.ts
import { useMutation, type UseMutationOptions } from "@/hooks/react-query";
import type { ApiError, ApiResult } from "@/models/api";
import { fetcherMutation } from "@/utils/react-query";

import type { LoginParam, LoginResponse } from "../models";

function useRLogin(
  options: UseMutationOptions<
    ApiResult<LoginResponse>,
    ApiError,
    LoginParam
  > = {},
) {
  return useMutation<ApiResult<LoginResponse>, ApiError, LoginParam>({
    mutationFn: async ({ context, variables }) =>
      await fetcherMutation({
        context: { ...context, path: "login" },
        variables,
      }),
    ...options,
  });
}
```

### Component Usage

Components consume repository hooks for clean separation:

#### Profile Component

```tsx
import { useRGetProfile } from '@/repositories/common'

function UserProfile() {
  const { data: profileResult, isLoading, error } = useRGetProfile({
    // Additional options can be passed here
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (isLoading) return <div>Loading profile...</div>
  if (error) return <div>Error: {error.message}</div>

  const profile = profileResult?.data
  if (!profile) return <div>No profile found</div>

  return (
    <div>
      <h1>Welcome, {profile.name}!</h1>
      <p>Role: {profile.role}</p>
      {profile.role === 'partner_agent' && (
        <p>Partner: {profile.partner}</p>
      )}
    </div>
  )
}
```

#### Login Component

```tsx
import { useRLogin } from '@/repositories/auth'
import { useQueryClient } from '@tanstack/react-query'

function LoginForm() {
  const queryClient = useQueryClient()
  
  const loginMutation = useRLogin({
    onSuccess: (result) => {
      // Handle successful login
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      console.log('Login successful:', result.data)
    },
    onError: (error) => {
      console.error('Login failed:', error.message)
    }
  })

  const handleSubmit = (formData: { email: string; password: string }) => {
    loginMutation.mutate({
      variables: formData,
      context: {
        // Additional context if needed
      }
    })
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit({ email: 'user@example.com', password: 'password' })
    }}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

### Key Benefits of Repository Pattern

1. **Separation of Concerns** - Data fetching logic separated from UI components
2. **Reusability** - Repository hooks can be used across multiple components
3. **Type Safety** - Full TypeScript support with proper error handling
4. **Consistent API** - All data operations follow the same pattern
5. **Centralized Configuration** - Query keys, options, and metadata managed in repositories
6. **Easy Testing** - Repository hooks can be tested independently

### Available Repository Hooks

- **`useRGetProfile`** - Fetch user profile data
- **`useRLogin`** - Authenticate user login
- **`useRLogout`** - Handle user logout
- *Add more repository hooks as you build features*

## 🔧 Development Setup

### Custom Development Server

This template uses a custom development script (`scripts/prepare-app`) that handles:
- Environment setup
- SSL certificate management
- Host configuration
- Development server initialization

### HTTPS Development

Generate SSL certificates for HTTPS development:

```bash
yarn certs:generate
```

The certificates will be stored in the `certs/` directory.

### Environment Variables

The template includes environment variable support. Copy `.env.example` to `.env` and configure:

```env
# Example environment variables
DEV_HOST=localhost
PORT=3000
# Add your environment-specific variables here
```

### Host Setup

Use the provided script for host configuration:

```bash
./setup-host.sh
```

## 🎯 Git Workflow & Code Quality

This template enforces code quality and consistent commit messages through automated Git hooks.

### Git Hooks with Husky

The template includes pre-configured Git hooks that run automatically:

- **Pre-commit** - Runs ESLint on staged files only (via lint-staged) to check code quality before commits
- **Commit-msg** - Validates commit messages against conventional commit standards

### Lint-staged Integration

The template uses lint-staged to run linters only on staged files, making commits faster:

```json
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "eslint",
      "prettier --write"
    ]
  }
}
```

This ensures that only the files you're committing are linted, improving performance for large codebases.

### Conventional Commits with Commitlint

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Valid commit message examples
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login validation issue"
git commit -m "docs: update installation instructions"
git commit -m "style: format code with prettier"
git commit -m "refactor: restructure auth components"
git commit -m "test: add unit tests for user service"
git commit -m "chore: update dependencies"
```

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types:
- **feat** - A new feature
- **fix** - A bug fix
- **docs** - Documentation only changes
- **style** - Code style changes (formatting, semicolons, etc.)
- **refactor** - Code refactoring without feature changes
- **test** - Adding or updating tests
- **chore** - Maintenance tasks, dependency updates
- **ci** - CI/CD configuration changes
- **perf** - Performance improvements
- **build** - Build system changes

### Bypassing Hooks (Not Recommended)

In rare cases, you can bypass hooks:

```bash
# Skip pre-commit hooks
git commit --no-verify -m "emergency fix"

# Skip commit message validation
git commit --no-verify -m "quick fix"
```

## 🤖 Automated Dependency Management

### Dependabot Configuration

The template includes automated dependency updates via GitHub Dependabot:

- **Weekly npm package updates** - Keeps dependencies current with security patches
- **Monthly GitHub Actions updates** - Maintains CI/CD workflow dependencies
- **Automatic labeling** - PRs are labeled for easy categorization
- **Smart versioning** - Follows semantic versioning strategies

Configuration is located in `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Keep npm dependencies updated
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "npm"
  
  # Keep GitHub Actions updated  
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
    labels:
      - "dependencies"
      - "github-actions"
```

## 🏗️ Building for Production

### Client-Side Rendering (SPA)
```bash
yarn build
```
This runs TypeScript compilation followed by Vite build.

### Server-Side Rendering (SSR)
```bash
yarn build:ssr
```
This builds both client and server bundles:
- Client bundle: `dist/client/`
- Server bundle: `dist/server/`

### Individual Builds
```bash
# Build only the client
yarn build:client

# Build only the server
yarn build:server
```

## 📁 Key Configuration Files

- **`panda.config.ts`** - Panda CSS configuration with design tokens and patterns
- **`vite.config.ts`** - Vite configuration with React SWC and TypeScript paths
- **`eslint.config.js`** - ESLint flat configuration with TypeScript rules
- **`.commitlintrc.json`** - Commitlint configuration for conventional commits
- **`.husky/`** - Git hooks configuration directory
- **`tsconfig.json`** - Base TypeScript configuration
- **`tsconfig.app.json`** - App-specific TypeScript settings
- **`tsconfig.node.json`** - Node.js TypeScript settings
- **`postcss.config.cjs`** - PostCSS configuration for CSS processing

## 📚 Key Concepts

### Repository Pattern
The template implements a repository pattern for data access, separating business logic from data fetching.

### Modular Components
Components are organized by feature modules for better scalability.

### Type Safety
Full TypeScript integration ensures type safety across the entire application.

### Performance
- SWC for fast compilation
- Vite for instant HMR
- TanStack Query for efficient data caching
- Code splitting with React Router

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `yarn lint`
5. Submit a pull request

## 📄 License

This template is available as open source under the terms of the [MIT License](LICENSE).

## 📞 Support

For questions and support:
- Check the documentation for each technology used
- Open an issue on GitHub
- Review the example implementations in the template

---

Built with ❤️ using modern React ecosystem tools.
