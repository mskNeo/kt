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
      hooks: "/src/hooks",
      contexts: "/src/contexts",
      constants: "/src/constants",
      store: "/src/store",
    },
  },
});
