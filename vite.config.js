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
        home: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        work: resolve(__dirname, "work.html"),
        course: resolve(__dirname, "course.html"),
        hire: resolve(__dirname, "hire.html"),
      },
    },
  },
});
