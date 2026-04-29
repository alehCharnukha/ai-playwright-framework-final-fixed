# AI Review & Verification Checklist

- Scope: AI changed only the requested files.
- Structure: Page Objects/components contain locators and actions; tests do not use raw selectors.
- Locators: prefer `getByRole`, `getByLabel`, and `getByTestId`.
- Timing: no `waitForTimeout`; use Playwright auto-retry assertions.
- Data: use fixtures instead of hardcoded credentials or product data.
- Imports: verify paths are real and no duplicate classes were created.
- Validation: run `npm run typecheck` and `npm test` before merge.
