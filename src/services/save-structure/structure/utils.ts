import { isObject } from "lodash-es";

export function gameObjectIs(type: string): (obj: any) => boolean {
  return obj => isObject(obj) && obj.name === type;
}
