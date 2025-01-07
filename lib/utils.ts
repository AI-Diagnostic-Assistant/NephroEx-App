import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToNo(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("no", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
