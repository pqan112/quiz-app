// next-intl.config.ts (đổi đuôi từ .js sang .ts)
import en from "./messages/en.json";
import vi from "./messages/vi.json";

const config = {
  locales: ["en", "vi"],
  defaultLocale: "en",
  messages: {
    en,
    vi,
  },
  localePrefix: "as-needed",
};

export default config;
