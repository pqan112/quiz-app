import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePath(
  path: string,
  params: Record<string, string | number>
): string {
  return path.replace(/:(\w+)/g, (_, key) => {
    if (params[key] === undefined) {
      throw new Error(`Missing parameter '${key}' for path '${path}'`);
    }
    return encodeURIComponent(String(params[key]));
  });
}
