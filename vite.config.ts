import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, ".")],
      },
    },
  },
  root: "./src", // where to look for index.html
  build: {
    outDir: "../build", // where to put build results
    emptyOutDir: true,
  },
  base: "./", // where to start asset urls
  publicDir: "../public", // where are the public files
});
