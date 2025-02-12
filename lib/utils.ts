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

export function roundListToThreeSignificantDigits(nums: number[]): number[] {
  return nums.map((num) => {
    if (num === 0) return 0;
    const factor = Math.pow(10, 3);
    return Math.round(num * factor) / factor;
  });
}

export function decimalToPercentage(decimal: number): number {
  return Number((decimal * 100).toFixed(1));
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isActive = (a: string, b: string) => a.endsWith("analysis/" + b);
