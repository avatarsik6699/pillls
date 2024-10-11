import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "APP_");

  return {
    base: "/pillls",
    plugins: [
      // Allows using React dev server along with building a React application with Vite.
      // https://npmjs.com/package/@vitejs/plugin-react-swc
      react(),
      // Allows using the compilerOptions.paths property in tsconfig.json.
      // https://www.npmjs.com/package/vite-tsconfig-paths
      tsconfigPaths(),
      // Allows using self-signed certificates to run the dev server using HTTPS.
      // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
      // basicSsl(),
    ],
    publicDir: "./public",
    server: {
      // Exposes your dev server and makes it accessible for the devices in the same network.
      host: true,
    },
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
