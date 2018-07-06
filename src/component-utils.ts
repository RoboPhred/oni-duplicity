import { forEach } from "lodash-es";

export function attachSubComponents<
  TComponent extends React.ComponentType<any>,
  TSubComponents extends Record<string, React.ComponentType<any>>
>(
  component: TComponent,
  subComponents: TSubComponents
): TComponent & TSubComponents {
  const c = component as any;
  forEach(subComponents, (component, key) => {
    c[key] = component;
  });
  return c as any;
}
