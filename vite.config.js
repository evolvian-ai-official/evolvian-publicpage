// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/blog/", // ✅ FIX: asegura paths correctos en producción correcto

  plugins: [
    mdx(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_headers",
          dest: ".",
        },
      ],
    }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
