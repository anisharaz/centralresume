import { v4 } from "uuid";

export function GenerateGrantToken(): string {
  return "gt_" + v4();
}


export function GenerateClientSecret(): string {
  return "ocs_" + v4();
}

export function GenerateAccessToken() {
  return "at_"+ v4();
}