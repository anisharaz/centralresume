import { ResumeDataType } from "../types";
import { RESUME_TYPE } from "@/lib/zod/schemas";
export class Resume {
  private data: RESUME_TYPE;
  constructor(resumeData: RESUME_TYPE) {
    this.data = resumeData;
  }

  /**
   * getByTag
   */
  public getByTag(tag: string): ResumeDataType {
    function filterByTag({ data, tag }: { data: any; tag: string }): any {
      if (Array.isArray(data)) {
        const filteredArray = data
          .map((item) => filterByTag({ data: item, tag }))
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
          const filtered = filterByTag({ data: data[key], tag });
          result[key] = filtered;
        }

        return result;
      }

      return data;
    }
    return filterByTag({ data: this.data, tag });
  }

  /**
   * extractTags
   * Extracts all tags from the resume data.
   */
  public extractTags(): string[] {
    function extractAllTags(resume: any): string[] {
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
      collectedTags.forEach((tag) => {
        if (tag === null) {
          collectedTags.delete(tag);
        }
      });
      return Array.from(collectedTags);
    }
    return extractAllTags(this.data);
  }

  /**
   * getResume
   */
  public getResume() {
    return this.data;
  }
}
