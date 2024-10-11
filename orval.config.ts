import { defineConfig } from "orval";

export default defineConfig({
  main: {
    input: "./src/shared/api/schema.yaml",
    output: {
      mode: "split",
      mock: false,
      target: "./src/shared/api/endpoints.ts",
      schemas: "./src/shared/api/models",

      override: {
        mutator: {
          path: "./src/shared/api/http-client.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "eslint ./src/shared/api/**/*.ts --ext ts --fix",
    },
  },
});
