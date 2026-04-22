import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the app from "/<repo>/".
  // We derive repo name from GITHUB_REPOSITORY to avoid hardcoding.
  base: process.env.GITHUB_PAGES
    ? `/${String(process.env.GITHUB_REPOSITORY || "").split("/").pop() || "economicCalendar"}/`
    : "/"
});