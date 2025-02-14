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

export const explanationDescriptionMapper = (type: string): string => {
  const mapping: { [key: string]: string } = {
    renogram:
      "The charts show the importance distribution of the features. This is what the model used to base its decision on.",
    image:
      "The images show the highlighted regions of interest on each 2 minute summed frame. The model used these to base its decision on.",
  };
  return mapping[type] || "The model used these to base its decision on.";
};

export const typeMapper = (category: string): string => {
  const mapping: { [key: string]: string } = {
    image: "Image analysis",
    renogram: "Renogram analysis",
  };
  return mapping[category] || "Unknown Type";
};

export const predictionColorMapper = (prediction: string): string => {
  const mapping: { [key: string]: string } = {
    healthy: "text-primary-green",
    sick: "text-red-500",
  };
  return mapping[prediction] || "text-primary-brand";
};

export const shapColorMapper = (shapValue: number, prediction: string) => {
  if (prediction === "healthy") {
    return shapValue >= 0 ? "#4EBD7F" : "#EF4444";
  } else {
    return shapValue >= 0 ? "#EF4444" : "#4EBD7F";
  }
};
