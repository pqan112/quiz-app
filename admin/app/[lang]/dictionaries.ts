// app/[lang]/dictionaries.ts
const dictionaries = {
  vi: () => import("./dictionaries/vi.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: "vi" | "en") =>
  dictionaries[locale]();
