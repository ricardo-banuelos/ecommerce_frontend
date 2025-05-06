import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { rules } from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Turn off or reduce strictness of common annoying rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn", // downgrade from error to warning
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn", // allow any but with warning
      "no-console": "warn", // allow console but with warning
      "@next/next/no-img-element": "off", // allow regular img tags
      "prefer-const": "warn", // downgrade from error to warning
      "no-unused-vars": "off", // turn off in favor of typescript version
      // Add any other rules you want to relax here
    }
  }
];

export default eslintConfig;
