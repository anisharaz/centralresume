import { v4 } from "uuid";

export function GenerateGrantToken(): string {
  return "gt_" + v4();
}
