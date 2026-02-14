import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.{test,spec}.js', 'tests/api/**/*.axios.{test,spec}.js'],
    environment: 'node',
  },
});
