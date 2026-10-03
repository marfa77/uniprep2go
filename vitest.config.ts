import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // Tests must never reach production Redis or send real Telegram messages, even if the shell exported .env.local.
    env: {
      KV_REST_API_URL: "",
      KV_REST_API_TOKEN: "",
      KV_REST_API_READ_ONLY_TOKEN: "",
      KV_URL: "",
      REDIS_URL: "",
      UPSTASH_REDIS_REST_URL: "",
      UPSTASH_REDIS_REST_TOKEN: "",
      TELEGRAM_BOT_TOKEN: "",
    },
  },
});
