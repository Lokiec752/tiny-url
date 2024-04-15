import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    port: 4444,
    host: true,
    proxy: {
      "/api": "http://tiny-url-be:3333",
    },
  },
  plugins: [react()],
});
