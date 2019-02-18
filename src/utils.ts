import { forEach } from "lodash-es";

export function attachProps<
  TTarget,
  TSubComponents extends Record<string, any>
>(component: TTarget, subComponents: TSubComponents): TTarget & TSubComponents {
  const c = component as any;
  forEach(subComponents, (component, key) => {
    c[key] = component;
  });
  return c as any;
}
