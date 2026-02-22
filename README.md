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

## Environment

Tests require a NASA API key. Create a `.env` file in the project root (do not commit it; `.env` is in `.gitignore`):

```
NASA_API_KEY=your_key_here
```

Get a key at [api.nasa.gov](https://api.nasa.gov/).

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm test`         | Run Playwright API tests       |
| `npm run lint`     | Run ESLint                     |
| `npm run format`   | Format code with Prettier      |
| `npm run format:check` | Check formatting (no write) |

## API coverage

| Spec | NASA API |
|------|----------|
| `insight-weather.spec.ts` | InSight Mars Weather |
| `neo-feed.spec.ts` | Asteroids NeoWs — Neo Feed |
| `neo-browse.spec.ts` | Asteroids NeoWs — Neo Browse |
| `neo-lookup.spec.ts` | Asteroids NeoWs — Neo Lookup |

## Tech stack

- **Playwright** — API testing via the `request` fixture
- **TypeScript** — test code (transpiled by Playwright)
- **Ajv** — JSON schema validation of responses
- **ESLint** — linting (typescript-eslint)
- **Prettier** — code formatting

## GitHub Actions

A manual workflow runs the API tests and publishes the Playwright HTML report as an artifact.

1. In the repo: **Settings → Secrets and variables → Actions** → add secret `NASA_API_KEY`.
2. **Actions** tab → select **NASA API tests** → **Run workflow** → **Run workflow**.
3. After the run, download the **playwright-report** artifact, unzip, and open `index.html` to view the report.

Artifacts are kept for 7 days.
