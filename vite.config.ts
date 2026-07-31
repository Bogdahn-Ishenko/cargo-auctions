import path from "node:path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          query: ["@tanstack/react-query"],
          router: ["@tanstack/react-router"],
          ui: ["@remixicon/react", "radix-ui", "sonner"],
          vendor: ["@hookform/resolvers", "react", "react-dom", "react-hook-form", "zod", "zustand"],
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
})
