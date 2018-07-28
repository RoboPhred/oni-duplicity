import { includes } from "lodash";

export enum Intent {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Dangerous = "dangerous",
  Hint = "hint"
}

export function isIntent(str: string | null | undefined): str is Intent {
  return includes(Intent, str);
}
