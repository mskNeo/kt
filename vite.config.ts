import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      styles: "/src/styles",
      components: "/src/components",
      assets: "/src/assets",
      hooks: "/src/hooks",
      contexts: "/src/contexts",
    },
  },
});
