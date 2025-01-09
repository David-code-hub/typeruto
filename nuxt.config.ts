import open from "open";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    listen(server) {
      open(`http://localhost:${server!.port || 3000}`);
    },
  },
  alias: {
    "@public": "/public",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
});
