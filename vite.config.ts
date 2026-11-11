import { defineConfig } from "vite";
import path from "path";
import { createSharedConfig } from "../../vite.shared.config";

const daapRoot = path.resolve(__dirname, "../../");

export default defineConfig({
  root: daapRoot,
  ...createSharedConfig({
    platformDir: __dirname,
    daapSrcDir: path.join(daapRoot, "src"),
    envDir: __dirname,
    inputHtml: path.join(__dirname, "index.html"),
  }),
});
