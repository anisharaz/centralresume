import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { dummyResumeData } from "./dummy-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function filterByTag(data: any, tag: string): any {
  if (Array.isArray(data)) {
    const filteredArray = data
      .map((item) => filterByTag(item, tag))
      .filter((item) => {
        // Keep only non-empty objects and primitives
        return (
          item !== null &&
          (typeof item !== "object" ||
            (Array.isArray(item)
              ? item.length > 0
              : Object.keys(item).length > 0))
        );
      });
    return filteredArray.length > 0 ? filteredArray : [];
  } else if (typeof data === "object" && data !== null) {
    if ("tags" in data && !data.tags.includes(tag)) {
      return null; // remove object from output
    }

    const result: Record<string, any> = {};
    for (const key in data) {
      if (key === "tags") continue; // remove tags field
      const filtered = filterByTag(data[key], tag);
      result[key] = filtered;
    }

    return result;
  }

  return data;
}

export const filteredDummyResumeData = filterByTag(
  JSON.parse(JSON.stringify(dummyResumeData)),
  "#devops"
);
