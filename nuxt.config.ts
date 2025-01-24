import open from "open";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GOOGLE_SITE_VERIFICATION:
        process.env.GOOGLE_SITE_VERIFICATION || "Default Value",
    },
  },
  hooks: {
    listen(server) {
      open(`http://localhost:3000`);
      // ${server.port || 3000}`
    },
  },
  alias: {
    "@public": "/public",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
