import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const publicDirectory = join(root, "public");
const distributionDirectory = join(root, "node_modules", "maplibre-gl", "dist");
const modules = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];

await mkdir(publicDirectory, { recursive: true });
await Promise.all(
  modules.map((module) =>
    copyFile(join(distributionDirectory, module), join(publicDirectory, module)),
  ),
);

console.log(`Prepared ${modules.map((module) => `public/${module}`).join(" and ")}`);
