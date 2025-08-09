import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "https://activity-5-mais-pra-ti.vercel.app/",
  assetsInclude: "https://activity-5-mais-pra-ti.vercel.app/assets/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"), // Página inicial
        favorites: path.resolve(__dirname, "src/components/MyFavorites"), // Página "Sobre"
        movieDetails: path.resolve(__dirname, "src/components/MovieDetails"), // Página "Contato"
      },
    },
  },
});
