import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/',
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
