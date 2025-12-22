# SpaceX Missions Dashboard

Web application built with **React + TypeScript** that consumes the **public SpaceX GraphQL API** to display launches, missions, and rockets. The goal of this project is to demonstrate best practices in **frontend architecture**, **state management with Redux Toolkit**, **GraphQL consumption**, **routing**, **Tailwind CSS styling**, and **E2E testing with Playwright**.

---

## Tech Stack

* **React 18 + TypeScript**
* **Redux Toolkit** (global state management and async thunks)
* **Apollo Client** (GraphQL)
* **React Router**
* **Tailwind CSS** (basic UI styling)
* **Playwright** (end-to-end testing)

---

## Project Architecture

The project follows a modular architecture focused on **clear separation of concerns**:

```
src/
├─ app/                # Global configuration (Redux)
│  ├─ store.ts
│  └─ hooks.ts
│
├─ core/               # Infrastructure layer
│  ├─ graphql/         # Apollo Client and queries
│  │  ├─ client.ts
│  │  └─ queries/
│  │     ├─ launches.query.ts
│  │     └─ rockets.query.ts
│  │
│  └─ services/        # Data access layer
│     └─ spacex.service.ts
│
├─ features/           # Domain logic + state (Redux)
│  ├─ launches/
│  │  ├─ launches.slice.ts
│  │  └─ launches.thunks.ts
│  └─ rockets/
│     ├─ rockets.slice.ts
│     └─ rockets.thunks.ts
│
├─ pages/              # Application views
│  ├─ LaunchesPage.tsx
│  ├─ LaunchDetailPage.tsx
│  ├─ MissionsPage.tsx
│  ├─ RocketsPage.tsx
│  └─ AboutPage.tsx
│
├─ routes/             # Routing configuration
│  └─ index.tsx
│
├─ types/              # Domain types
│  ├─ launch.types.ts
│  └─ rocket.types.ts
│
├─ styles/             # Global styles
│  ├─ index.css
│  └─ tailwind.css
│
├─ tests/
│  └─ e2e/             # Playwright E2E tests
│
├─ main.tsx
└─ App.css
```

---

## Data Flow (Redux + GraphQL)

1. The **UI component** dispatches an action.
2. The **thunk** executes a GraphQL query through `spacex.service`.
3. Apollo Client fetches data from the SpaceX API.
4. The **slice** updates the global store.
5. **Selectors** expose state to the UI.
6. The UI re-renders.

This flow represents the **binding between the UI and the Redux store**.

---

## Features

* SpaceX launches listing
* Launch detail view
* Rockets listing
* Loading / error / success state handling
* Client-side routing

---

## Installation & Run

```bash
npm install
npm run dev
```

---

## Testing

End-to-end tests using Playwright:

```bash
npx playwright test
```

Example test cases:

* Validate that lists and filters render correctly.

---

## Project Purpose

This project was developed as a **technical exercise** to demonstrate:

* Proper **GraphQL** consumption
* Correct use of **Redux Toolkit**
* Scalable frontend architecture
* Clear separation between UI, domain, and infrastructure layers
* Automated testing capabilities

---

## API Reference

* SpaceX GraphQL API:
  [https://studio.apollographql.com/public/SpaceX-pxxbxen/variant/current/explorer](https://studio.apollographql.com/public/SpaceX-pxxbxen/variant/current/explorer)
