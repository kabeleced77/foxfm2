import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";
import mergeJsonPlugin from "./vite-plugins/mergeJsonPlugin";

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: generateManifest,
    }),
    mergeJsonPlugin({
      sourceFolder: "_locales", // Example: your locales folder
      outputFolder: "dist/_locales",    // Example: output folder
      outputFileName: "messages.json",   // Example: output file name
      suffixSeparator: "-", // Optional: separator for suffixes in file names
    }),
  ],
});
