# AI-Assisted Playwright TypeScript POM Framework

A portfolio-ready Playwright framework demonstrating how AI can scaffold, extend, refactor, and review test automation responsibly. The suite uses a deterministic demo application loaded in the browser, so the tests are stable and do not depend on external websites.

## What this framework does

- Implements Page Object Model with `BasePage` and concrete pages.
- Uses a shared `Header` component.
- Runs 10 automated Playwright specs covering authentication, search, cart, and checkout flows.
- Uses stable locators: `getByRole`, `getByTestId`, and accessible labels.
- Avoids hard waits and relies on Playwright web-first auto-retry assertions.
- Includes GitHub Actions CI for push and pull request validation.
- Documents AI usage through reusable prompts and a review checklist.

## Tech stack

- TypeScript
- Playwright Test
- Page Object Model
- GitHub Actions
- ESLint and TypeScript type checking

## Install

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
npm test
```

Run checks before opening a pull request:

```bash
npm run typecheck
npm run lint
npm test
```

View the HTML report:

```bash
npm run report
```

## Project structure

```text
.github/workflows/playwright-tests.yml   CI pipeline
src/components/                          reusable UI components
src/fixtures/testData.ts                 reusable typed test data
src/pages/BasePage.ts                    shared page object base class
src/pages/*.ts                           concrete page objects
tests/e2e/*.spec.ts                      end-to-end test specs
docs/prompts/                            reusable AI prompt templates
docs/reviews/                            AI review and verification checklist
playwright.config.ts                     Playwright configuration
```

## Test coverage included

1. Valid login shows dashboard avatar
2. Invalid login displays an error
3. Remember me checkbox can be selected
4. Logged-in user can log out
5. Search returns product results
6. Price filter keeps results under $100
7. User opens product details from search results
8. Add to cart increments the cart badge
9. Cart shows selected product and expected total
10. Checkout can be opened from cart
11. User can place an order

## CI/CD

The workflow runs on every push and pull request targeting `main`. It installs dependencies, installs Chromium, runs type checking, runs Playwright tests, and uploads HTML reports/traces as artifacts.

## Responsible AI usage

AI was used as a controlled engineering assistant for scaffolding, pattern replication, and review support. The repository keeps human verification explicit through:

- Small, reviewable changes
- Golden-file style Page Objects
- Stable locator rules
- Type checking and CI validation
- `docs/reviews/ai-review-checklist.md`

## Suggested commit history for your GitHub submission

This package includes a real local git history if you unzip it with hidden files preserved. If you recreate it manually, use commits like:

```bash
git add package.json tsconfig.json playwright.config.ts .gitignore eslint.config.mjs
git commit -m "chore: initialize Playwright TypeScript framework"

git add src
git commit -m "feat: add POM pages components fixtures and demo app"

git add tests
git commit -m "test: add auth search and checkout coverage"

git add .github docs README.md
git commit -m "ci: add GitHub Actions and AI review documentation"
```
