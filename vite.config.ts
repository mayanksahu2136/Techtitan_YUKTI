import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    minify: "terser",
    terserOptions: { compress: { drop_console: true } },
    rollupOptions: { output: { manualChunks: { vendor: ["react", "react-dom", "react-router-dom"] } } },
    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: false,
  },
}));
