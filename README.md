# API tests with Playwright

API test suite for the [NASA Open API](https://api.nasa.gov/), built with Playwright (API testing only — no browsers).

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
```

No browser installation is required; this project uses Playwright for HTTP requests only.

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm test`         | Run Playwright API tests       |
| `npm run lint`     | Run ESLint                     |
| `npm run format`   | Format code with Prettier      |
| `npm run format:check` | Check formatting (no write) |

## Tech stack

- **Playwright** — API testing via the `request` fixture
- **TypeScript** — test code (transpiled by Playwright)
- **ESLint** — linting (typescript-eslint)
- **Prettier** — code formatting

## Environment

Optional: create a `.env` file for API keys (e.g. NASA API key). Do not commit secrets; `.env` is in `.gitignore`.
