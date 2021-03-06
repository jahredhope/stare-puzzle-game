import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    outDir: "docs",
    target: "esnext",
    polyfillDynamicImport: false,
  },
  base: "https://jahredhope.github.io/stare-puzzle-game/",
});
