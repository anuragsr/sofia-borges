import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";
import { resolve } from "path";

const options = { pretty: true }; // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" };

export default defineConfig({
  plugins: [pugPlugin(options, locals)],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
      },
    },
  },
});
