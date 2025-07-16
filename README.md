# React Vite Template

A comprehensive, production-ready React template built with modern tools and best practices for scalable web applications.

## 🚀 Features

- ⚡ **Vite 7.0** - Lightning fast build tool with HMR and enhanced optimization
- ⚛️ **React 19.1** - Latest React with concurrent features and improved performance
- 🎯 **TypeScript 5.8** - Full type safety with latest language features
- 🎨 **Panda CSS 0.54** - Zero-runtime CSS-in-JS with design tokens and atomic styles
- 🧭 **React Router 7.6** - Enhanced routing with data loading capabilities
- 🔄 **TanStack Query 5.83** - Powerful data fetching, caching, and synchronization
- 📝 **React Hook Form** - Enhanced form management with custom field registration and scrolling
- 🧹 **ESLint 9** - Modern linting with flat config and TypeScript support
- 🔧 **Express 5.1** - SSR, API support, and production-ready middleware
- 🔒 **SSL/HTTPS** - Secure development environment with auto-generated certificates
- 📦 **Modular Architecture** - Clean, scalable project structure with separation of concerns
- 🚀 **SWC Compiler** - Fast TypeScript/JavaScript compilation via Vite plugin
- 🛠️ **Development Tools** - Hot reload, TypeScript paths, and modern dev experience
- 🎯 **Git Hooks** - Automated code quality checks with Husky
- 📝 **Conventional Commits** - Enforced commit message standards with Commitlint
- 🔄 **Package Initialization** - Smart package.json initialization with environment-based naming
- 🌐 **Multi-Environment Support** - Comprehensive environment configuration for development, staging, UAT, and production

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
- **TanStack Query 5.83** - Server state management with caching, background updates, and optimistic updates
- **TanStack Query DevTools** - Development tools for debugging queries
- **React Hook Form** - Performant forms with easy validation and enhanced field management
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
- **CORS 2.8** - Cross-Origin Resource Sharing middleware
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

2. **Set up environment variables:**
   ```bash
   # Copy the environment template
   cp .env.example .env
   
   # Edit .env file and set required variables
   VITE_APP_NAME=your-app-name
   DEV_HOST=localhost
   # ... other variables as needed
   ```

3. **Install dependencies:**
   ```bash
   # Using Yarn (recommended)
   yarn install

   # Using npm
   npm install

   # Using pnpm
   pnpm install
   ```
   
   > **Note:** The `postinstall` script will automatically initialize your package.json with the `VITE_APP_NAME` from your environment variables.

4. **Generate SSL certificates (optional for HTTPS):**
   ```bash
   yarn certs:generate
   ```

5. **Start development server:**
   ```bash
   yarn dev
   ```

6. **Open your browser:**
   The app will be available via the custom development script (check console for URL)

> **Note:** Panda CSS files are automatically generated when you run `yarn install` (via the `postinstall` script) and during build processes. The package initialization script will also set up your package.json with the correct app name from environment variables, so no manual initialization is required!

## 📝 Available Scripts

### Development
- `yarn dev` - Start development server using custom prepare-app script
- `yarn dev:ssr` - Start development server with Server-Side Rendering and Panda CSS watch mode
- `yarn prepare` - Setup Husky Git hooks (runs automatically on install)
- `yarn postinstall` - Initialize package.json with environment-based app name
- `yarn init-pkg` - Force re-initialization of package.json (use with --force flag)

### Build & Production
- `yarn build` - Build for production (TypeScript compilation + Panda CSS generation + Vite build)
- `yarn build:ssr` - Build with Server-Side Rendering support (includes Panda CSS generation)
- `yarn build:client` - Build client bundle only (TypeScript + Vite)
- `yarn build:server` - Build server bundle for SSR

### Preview & Testing
- `yarn preview` - Preview production build using dev script with --preview flag
- `yarn preview:ssr` - Preview SSR build

### Code Quality
- `yarn lint` - Run ESLint for code quality and style checking

### Utilities
- `yarn certs:generate` - Generate SSL certificates for HTTPS development
- `yarn init-pkg` - Initialize package.json with app name from environment variables

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
│   │   ├── react-hook-form/ # Enhanced React Hook Form hooks
│   │   │   ├── components/ # Form provider components
│   │   │   ├── use-form.tsx # Enhanced useForm hook
│   │   │   ├── use-form-context.tsx # Enhanced form context hook
│   │   │   ├── types.ts   # Form hook type definitions
│   │   │   └── index.ts   # Exports all form hooks
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
│   ├── initialize-package.ts # Package.json initialization script
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
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── .package-initialized   # Package initialization marker file
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

### Automatic Setup

Panda CSS is automatically configured and initialized in this template:

- **Installation**: Panda CSS files are generated automatically when you run `yarn install` (via the `prepare` script)
- **Development**: `yarn dev:ssr` includes automatic watch mode for style regeneration
- **Build**: All build commands automatically regenerate Panda CSS files before building

No manual initialization is required! Just install dependencies and start developing.

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

The template also includes enhanced React Query hooks in `src/hooks/react-query/`:
- **`useQuery`** - Enhanced query hook with custom error handling
- **`useMutation`** - Enhanced mutation hook with custom context
- **`useInfiniteQuery`** - Enhanced infinite query hook 
- **`useSuspenseQuery`** - Enhanced suspense query hook for React 18+ Suspense

## 📝 Form Management with React Hook Form

This template includes enhanced React Hook Form hooks with additional features for better form handling and user experience.

### Enhanced Form Hooks

The template provides custom React Hook Form hooks located in `src/hooks/react-hook-form/`:

- **`useForm`** - Enhanced version of React Hook Form's useForm with field reference management
- **`useFormContext`** - Enhanced form context hook for accessing form state across components
- **`FormProvider`** - Enhanced form provider with automatic field registration and scrolling

### Key Features

1. **Automatic Field Reference Management** - Automatically tracks field DOM references
2. **Custom Scroll to Field** - Enhanced error scrolling without using default scroll functionality
3. **Type Safety** - Full TypeScript support with enhanced type definitions
4. **Field Registration** - Automatic field registration for better form management

### Basic Usage

```tsx
import { useForm, FormProvider } from '@/hooks/react-hook-form'
import { css } from '@/styled-system/css'

interface FormData {
  email: string
  password: string
  confirmPassword: string
}

function LoginForm() {
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data)
  }

  return (
    <FormProvider {...form} scrollToFieldOnError={true}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={css({ mb: '4' })}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...form.register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            ref={(el) => {
              form.fieldsRef.current.email = el
            }}
            className={css({ 
              border: '1px solid',
              borderColor: form.formState.errors.email ? 'red.500' : 'gray.300',
              p: '2',
              rounded: 'md'
            })}
          />
          {form.formState.errors.email && (
            <span className={css({ color: 'red.500', fontSize: 'sm' })}>
              {form.formState.errors.email.message}
            </span>
          )}
        </div>

        <div className={css({ mb: '4' })}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...form.register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            ref={(el) => {
              form.fieldsRef.current.password = el
            }}
            className={css({ 
              border: '1px solid',
              borderColor: form.formState.errors.password ? 'red.500' : 'gray.300',
              p: '2',
              rounded: 'md'
            })}
          />
          {form.formState.errors.password && (
            <span className={css({ color: 'red.500', fontSize: 'sm' })}>
              {form.formState.errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={css({
            bg: 'blue.500',
            color: 'white',
            px: '4',
            py: '2',
            rounded: 'md',
            _disabled: { opacity: 0.5 }
          })}
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </FormProvider>
  )
}
```

### Using Form Context

Access form state in child components using the enhanced form context:

```tsx
import { useFormContext } from '@/hooks/react-hook-form'

function FormField({ name, label, ...props }) {
  const { register, formState, fieldsRef } = useFormContext()
  
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...register(name, props.validation)}
        ref={(el) => {
          fieldsRef.current[name] = el
        }}
        className={css({
          border: '1px solid',
          borderColor: formState.errors[name] ? 'red.500' : 'gray.300',
          p: '2',
          rounded: 'md'
        })}
      />
      {formState.errors[name] && (
        <span className={css({ color: 'red.500', fontSize: 'sm' })}>
          {formState.errors[name]?.message}
        </span>
      )}
    </div>
  )
}
```

### Enhanced Features

#### Field Reference Management

The enhanced hooks automatically manage field references:

```tsx
const form = useForm()

// fieldsRef is automatically available
console.log(form.fieldsRef.current) // { email: HTMLInputElement, password: HTMLInputElement }
```

#### Custom Scroll to Field on Error

When `scrollToFieldOnError` is enabled, the form will automatically scroll to the first field with an error:

```tsx
<FormProvider {...form} scrollToFieldOnError={true}>
  {/* Form fields */}
</FormProvider>
```

#### Type Safety

Full TypeScript support with enhanced type definitions:

```tsx
interface FormData {
  email: string
  password: string
}

const form = useForm<FormData>() // Fully typed
const { register, formState } = form // All methods are typed
```

### Key Benefits

1. **Enhanced UX** - Automatic scrolling to error fields for better user experience
2. **Better Performance** - Efficient field reference management
3. **Type Safety** - Full TypeScript integration with enhanced types
4. **Flexibility** - Works with existing React Hook Form patterns
5. **Customizable** - Easy to extend and customize for specific needs

## � Smart Package Initialization

This template includes an intelligent package initialization system that automatically configures your `package.json` based on environment variables.

### How It Works

1. **Environment Detection**: The script checks for `VITE_APP_NAME` in your environment variables
2. **Smart Initialization**: Only runs on fresh installs (no marker file present) or when explicitly requested
3. **Package Configuration**: Updates `package.json` with your app name and resets version to `0.0.0`
4. **Marker Creation**: Creates `.package-initialized` file to prevent repeated initialization

### Usage

**Automatic (Recommended)**:
```bash
# First, copy the environment template
cp .env.example .env

# Edit .env file and set your app name
# VITE_APP_NAME=my-awesome-app

# Install dependencies - initialization happens automatically
yarn install
```

**Manual**:
```bash
# Force re-initialization
yarn init-pkg --force
```

### Environment Requirements

Make sure to set the required environment variable:

```env
# .env (copy from .env.example first)
VITE_APP_NAME=your-app-name
```

If `VITE_APP_NAME` is not set, the script will warn you and exit, requiring manual setup.

> **Important**: Always copy from `.env.example` to `.env` first, then edit the values as needed. The `.env` file is not tracked in git for security reasons.

## �🔧 Development Setup

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

The template includes comprehensive environment variable support with multi-environment configuration. 

> **⚠️ Important**: The `.env` file is not included in the repository for security reasons. You must copy `.env.example` to `.env` and configure the values for your environment.

Copy `.env.example` to `.env` and configure:

```env
# App Configuration
VITE_APP_NAME=your-app-name           # Required: Used for package.json initialization
VITE_API_HOST=http://localhost:3000   # API host URL
VITE_API_BASE_PATH=/api              # API base path
VITE_API_TIMEOUT=3500                # API request timeout in ms
VITE_BASE_PATH=/                     # App base path
VITE_BASE_REDIRECT_PATH=/login       # Default redirect path
VITE_SSR_API_BASE_PATH=/api          # SSR API base path

# Development Configuration  
DEV_HOST=localhost                   # Development host (can be custom domain)
PORT=3000                           # Server port
```

### Multi-Environment Support

The template supports multiple environments with different configuration files:

- **Development**: `.env` or `.env.local`
- **Staging**: `.env.staging` + fallback to `.env` and `.env.local`
- **UAT**: `.env.uat` + fallback to `.env` and `.env.local`  
- **Production**: `.env.production` + fallback to `.env` and `.env.local`

Environment is determined by the `--mode` flag when running the development server.

### Package Initialization

The template includes an intelligent package initialization system:

- **Automatic**: Runs via `postinstall` script when you first install dependencies
- **Environment-Based**: Uses `VITE_APP_NAME` from your environment variables
- **Smart Detection**: Only runs on fresh installs or when explicitly requested
- **Manual Override**: Use `yarn init-pkg --force` to reinitialize

**Important**: Make sure to set `VITE_APP_NAME` in your `.env` file before running `yarn install` for automatic package initialization.

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

- **Monthly npm package updates** - Keeps dependencies current with security patches
- **Monthly GitHub Actions updates** - Maintains CI/CD workflow dependencies
- **Automatic labeling** - PRs are labeled for easy categorization
- **Smart versioning** - Follows semantic versioning strategies
- **Scoped commits** - Commit messages include scope and development prefixes

Configuration is located in `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Keep npm dependencies updated
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "monthly"
    open-pull-requests-limit: 10
    versioning-strategy: auto
    labels:
      - "dependencies"
      - "npm"
    commit-message:
      prefix: "npm"
      prefix-development: "dev"
      include: "scope"
  
  # Keep GitHub Actions updated  
  - package-ecosystem: "github-actions"
    directory: "/.github"
    schedule:
      interval: "monthly"
    open-pull-requests-limit: 5
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
- **`.env.example`** - Environment variables template with all supported variables
- **`setup-host.sh`** - Host setup script for development environment
- **`scripts/initialize-package.ts`** - Package.json initialization script

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
