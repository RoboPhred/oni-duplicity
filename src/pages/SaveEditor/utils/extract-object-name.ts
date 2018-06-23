import { isObject } from "lodash-es";

export default function extractObjectName(obj: any) {
  if (obj === undefined) {
    return "[no data]";
  }

  if (obj === null) {
    return "[null]";
  }

  if (Array.isArray(obj) && obj.length === 2 && typeof obj[0] === "string") {
    // A tuple.  Probably.
    return obj[0];
  }

  if (isObject(obj)) {
    // A behavior.  With any luck.
    return obj.name || obj.type || undefined;
  }

  return String(obj);
}
