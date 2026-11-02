import { defineConfig } from 'vitest/config';

const runtime = globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } };

export default defineConfig({
  base: runtime.process?.env?.GITHUB_ACTIONS ? '/upload_taxes/' : '/',
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        simulator: 'simulateur.html',
        obs: 'obs.html',
        overlay: 'overlay.html',
        embed: 'embed.html',
        widgets: 'widgets.html',
        share: 'partager.html',
      },
    },
  },
  test: { environment: 'node' },
});
