import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the app from "/<repo>/".
  // For local dev / other hosts it stays "/".
  base: process.env.GITHUB_PAGES ? "/economicCalendarr/" : "/"
});