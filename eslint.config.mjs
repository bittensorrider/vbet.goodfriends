import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Option 1: Disable the rule completely
      "@typescript-eslint/no-explicit-any": "off",
      
      // Option 2: Make it a warning instead of error
      // "@typescript-eslint/no-explicit-any": "warn",
      
      // Option 3: Allow 'any' but with a comment explaining why
      // "@typescript-eslint/no-explicit-any": ["error", { "fixToUnknown": false, "ignoreRestArgs": true }],
    },
  },
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "dist/**",
    "out/**",
  ]),
]);
