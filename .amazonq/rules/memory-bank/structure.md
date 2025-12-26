# Project Structure and Architecture

## Directory Organization

### Core Application Structure
```
src/
├── app/                 # Global Redux configuration
│   ├── store.ts        # Redux store setup with middleware
│   └── hooks.ts        # Typed Redux hooks (useAppDispatch, useAppSelector)
│
├── core/               # Infrastructure layer
│   ├── graphql/        # Apollo Client configuration
│   │   └── client.ts   # GraphQL client setup
│   ├── queries/        # GraphQL query definitions
│   │   ├── launches.query.ts
│   │   ├── rockets.query.ts
│   │   └── users.query.ts
│   └── services/       # Data access layer
│       ├── spacex.service.ts
│       └── users.service.ts
│
├── features/           # Domain logic with Redux slices
│   ├── launches/       # Launch-related state management
│   ├── rockets/        # Rocket-related state management
│   └── users/          # User-related state management
│
├── pages/              # Route-level components
│   ├── LaunchesPage.tsx
│   ├── LaunchDetailPage.tsx
│   ├── RocketsPage.tsx
│   ├── UsersPage.tsx
│   └── AboutPage.tsx
│
├── ui/                 # Reusable UI components
│   ├── components/     # Feature-specific components
│   └── layout/         # Layout components
│
├── routes/             # Routing configuration
├── types/              # TypeScript type definitions
└── styles/             # Global styling
```

## Architectural Patterns

### Layered Architecture
- **Presentation Layer**: Pages and UI components
- **Domain Layer**: Features with Redux slices and thunks
- **Infrastructure Layer**: Core services and GraphQL client

### Data Flow Pattern
1. UI components dispatch Redux actions
2. Thunks execute GraphQL queries via services
3. Apollo Client fetches from SpaceX API
4. Redux slices update global state
5. Components re-render with new data

### Component Organization
- **Pages**: Route-level containers
- **Features**: Domain-specific components with state
- **UI Components**: Reusable, stateless components
- **Layout**: Application shell and navigation

### State Management Strategy
- **Global State**: Redux Toolkit for application-wide data
- **Local State**: React hooks for component-specific state
- **Server State**: Apollo Client cache for GraphQL data
- **Derived State**: Selectors for computed values

## Core Relationships

### Redux Integration
- Store configured in `app/store.ts`
- Typed hooks in `app/hooks.ts`
- Feature slices in `features/*/` directories
- Async thunks for API calls

### GraphQL Integration
- Client setup in `core/graphql/client.ts`
- Query definitions in `core/queries/`
- Service layer abstracts GraphQL operations
- Type-safe queries with TypeScript

### Routing Structure
- React Router configuration in `routes/index.tsx`
- Page components handle route rendering
- Navigation through layout components