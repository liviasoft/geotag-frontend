// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "vuetify-nuxt-module", "nuxt3-leaflet"],
  routeRules: {
    '/': { ssr: false }
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      POCKETBASE_URL: process.env.POCKETBASE_URL,
    }
  }
  // experimental: {
  //   watcher: "chokidar",
  // },
})