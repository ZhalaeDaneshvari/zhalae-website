import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "zhalae-website";
const base = process.env.GITHUB_ACTIONS === "true" ? `/${repoName}/` : "/";

export default defineConfig({
  base,
  plugins: [react()],
});