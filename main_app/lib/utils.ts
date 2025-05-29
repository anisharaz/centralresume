import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateDuration = (startDate: Date, endDate?: Date) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);

  if (years > 0 && months > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${months} mo${
      months > 1 ? "s" : ""
    }`;
  } else if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} mo${months > 1 ? "s" : ""}`;
  } else {
    return "Less than 1 month";
  }
};

export function extractAllTags(resume: any): string[] {
  const collectedTags: Set<string> = new Set();

  function extractTags(obj: any): void {
    if (!obj) return;

    if (Array.isArray(obj)) {
      for (const item of obj) {
        extractTags(item);
      }
    } else if (typeof obj === "object") {
      for (const key in obj) {
        if (key === "tags" && Array.isArray(obj[key])) {
          for (const tag of obj[key]) {
            collectedTags.add(tag);
          }
        } else {
          extractTags(obj[key]);
        }
      }
    }
  }
  extractTags(resume);
  return Array.from(collectedTags);
}
