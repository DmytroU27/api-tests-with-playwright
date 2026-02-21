import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules/', 'test-results/', 'playwright-report/', 'blob-report/'],
  },
];
