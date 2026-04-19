import { Plugin } from "vite";
import fs from "fs";
import path from "path";

/**
 * A Vite plugin to merge multiple JSON files into a single JSON file.
 * It reads all JSON files from the specified source folder, merges them based on 
 * a suffix in their file names, and outputs the merged JSON files to the specified 
 * output folder with the given output file name.
 *
 * @param options - The options for the plugin, including 
 *   - source folder, 
 *   - output folder, 
 *   - output file name, and 
 *   - optional suffix separator.
 * @returns A Vite plugin object.
 */

interface MergeJsonOptions {
  sourceFolder: string;
  outputFolder: string;
  outputFileName: string;
  suffixSeparator?: string;
}

function getAllJsonFiles(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllJsonFiles(fullPath));
    } else if (path.extname(item) === ".json") {
      files.push(fullPath);
    }
  }
  return files;
}

function getSuffix(fileName: string, separator: string): string {
  const base = path.basename(fileName, ".json");
  if (!separator) {
    return base;
  }
  const parts = base.split(separator);
  return parts.length > 1 ? parts[parts.length - 1] : base;
}

function mergeJson(files: string[]): any {
  const result: any = {};
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const obj = JSON.parse(content);
    Object.assign(result, obj); // shallow merge, last wins on key conflicts
  }
  return result;
}

export default function mergeJsonPlugin(options: MergeJsonOptions): Plugin {
  return {
    name: "merge-json",
    buildStart() {
      const sourcePath = path.resolve(options.sourceFolder);
      const outputBasePath = path.resolve(options.outputFolder);
      const suffixSeparator = options.suffixSeparator ?? "-";
      const files = getAllJsonFiles(sourcePath);
      const groups: { [suffix: string]: string[] } = {};
      for (const file of files) {
        const suffix = getSuffix(file, suffixSeparator);
        if (!groups[suffix]) {
          groups[suffix] = [];
        }
        groups[suffix].push(file);
      }
      for (const suffix in groups) {
        const merged = mergeJson(groups[suffix]);
        const outputPath = path.join(
          outputBasePath,
          suffix,
          options.outputFileName,
        );
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2));
      }
    },
  };
}
