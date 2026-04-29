import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const checkedRoots = ['src', 'tests'];
const forbiddenPatterns = [
  { pattern: /waitForTimeout\s*\(/, message: 'Do not use hard waits; use Playwright web-first assertions.' },
  { pattern: /waitForSelector\s*\(/, message: 'Do not use manual selector waits; use locator assertions.' },
  { pattern: /page\.locator\s*\(/, message: 'Do not use raw page.locator calls; use getByRole/getByLabel/getByTestId in page objects.' },
  { pattern: /\.locator\s*\(/, message: 'Do not use raw locator calls; use role, label, or test id locators.' }
];

function collectTypeScriptFiles(directory) {
  return readdirSync(directory).flatMap(entry => {
    const absolutePath = join(directory, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      return collectTypeScriptFiles(absolutePath);
    }

    return absolutePath.endsWith('.ts') ? [absolutePath] : [];
  });
}

const violations = [];

for (const root of checkedRoots) {
  for (const filePath of collectTypeScriptFiles(root)) {
    const content = readFileSync(filePath, 'utf8');

    for (const { pattern, message } of forbiddenPatterns) {
      if (pattern.test(content)) {
        violations.push(`${filePath}: ${message}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error('Quality gate failed:\n' + violations.map(v => `- ${v}`).join('\n'));
  process.exit(1);
}

console.log('Quality gate passed: no hard waits or raw locators found in src/ or tests/.');
