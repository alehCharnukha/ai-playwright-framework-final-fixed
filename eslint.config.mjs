import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['playwright-report/**', 'test-results/**', 'node_modules/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error'
    }
  }
);
