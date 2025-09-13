// middleware.ts
import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const locales = ["vi", "en"];
const defaultLocale = "vi";

function getLocale(request: Request): string {
  const negotiator = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") || "",
    },
  });
  const languages = negotiator.languages();
  if (languages.includes("vi")) return "vi";
  const matched = match(languages, locales, defaultLocale);
  // Nếu không khớp rõ ràng, luôn trả về 'vi'
  console.log("matched", matched);
  return locales.includes(matched) ? matched : defaultLocale;
}

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const pathnameHasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
