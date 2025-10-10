import { ResumeDataType } from "@/types";
import { RESUME_SCHEMA_TYPE } from "@/types";
export const CORE_RESUME_VERSION = "1.0";

export class Resume {
  private data: RESUME_SCHEMA_TYPE;

  constructor(resumeData: RESUME_SCHEMA_TYPE) {
    this.data = this.sanitizeTags(resumeData);
  }

  /**
   * Recursively sanitize the resume data to remove empty or duplicate tags
   */
  private sanitizeTags(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeTags(item));
    } else if (typeof data === "object" && data !== null) {
      const sanitized: Record<string, any> = {};
      for (const key in data) {
        if (key === "tags" && Array.isArray(data[key])) {
          const filteredUniqueTags = Array.from(
            new Map(
              data[key]
                .filter(
                  (tagObj: any) =>
                    typeof tagObj?.tag === "string" && tagObj.tag.trim() !== ""
                )
                .map((tagObj: { tag: string }) => [tagObj.tag, tagObj])
            ).values()
          );
          sanitized[key] = filteredUniqueTags;
        } else {
          sanitized[key] = this.sanitizeTags(data[key]);
        }
      }
      return sanitized;
    }
    return data;
  }

  /**
   * copyTag: copy a tag to new name wherever it exists
   */
  public copyTag({
    fromTag,
    newTagName,
  }: {
    fromTag: string;
    newTagName: string;
  }) {
    function addTagWhereExists(data: any): any {
      if (Array.isArray(data)) {
        return data.map((item) => addTagWhereExists(item));
      } else if (typeof data === "object" && data !== null) {
        const result: Record<string, any> = {};
        for (const key in data) {
          if (key === "tags" && Array.isArray(data[key])) {
            const tags: { tag: string }[] = data[key];
            const hasFrom = tags.some((t) => t.tag === fromTag);
            const hasNew = tags.some((t) => t.tag === newTagName);
            result[key] = hasFrom
              ? hasNew
                ? tags
                : [...tags, { tag: newTagName }]
              : tags;
          } else {
            result[key] = addTagWhereExists(data[key]);
          }
        }
        return result;
      }
      return data;
    }

    this.data = addTagWhereExists(this.data);
  }

  /**
   * getByTag: filter resume by tag
   */
  public getByTag(tag: string): ResumeDataType {
    function filterByTag({ data, tag }: { data: any; tag: string }): any {
      if (Array.isArray(data)) {
        const filteredArray = data
          .map((item) => filterByTag({ data: item, tag }))
          .filter(
            (item) =>
              item !== null &&
              (typeof item !== "object" ||
                (Array.isArray(item)
                  ? item.length > 0
                  : Object.keys(item).length > 0))
          );
        return filteredArray.length > 0 ? filteredArray : [];
      } else if (typeof data === "object" && data !== null) {
        if (
          "tags" in data &&
          Array.isArray(data.tags) &&
          !data.tags.some((t: { tag: string }) => t.tag === tag)
        ) {
          return null;
        }

        const result: Record<string, any> = {};
        for (const key in data) {
          if (key === "tags") continue; // Exclude tag field
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
   * extractTags: collect all tag strings from resume
   */
  public extractTags(): string[] {
    const collectedTags = new Set<string>();

    function extractAllTags(data: any): void {
      if (Array.isArray(data)) {
        for (const item of data) {
          extractAllTags(item);
        }
      } else if (typeof data === "object" && data !== null) {
        for (const key in data) {
          if (key === "tags" && Array.isArray(data[key])) {
            for (const tagObj of data[key]) {
              if (typeof tagObj?.tag === "string") {
                collectedTags.add(tagObj.tag);
              }
            }
          } else {
            extractAllTags(data[key]);
          }
        }
      }
    }

    extractAllTags(this.data);
    return Array.from(collectedTags);
  }

  /**
   * Get the sanitized resume
   */
  public getResume() {
    return this.data;
  }
}
