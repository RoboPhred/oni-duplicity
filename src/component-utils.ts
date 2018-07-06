import { forEach } from "lodash-es";

export type ComponentWithSub<
  TComponent extends React.ComponentType<any>,
  TSubName extends string,
  TSub extends React.ComponentType<any>
> = TComponent & { [key in TSubName]: TSub };

export function attachSubComponent<
  TComponent extends React.ComponentType<any>,
  Name extends string,
  SComponent extends React.ComponentType<any>
>(
  component: TComponent,
  name: Name,
  subComponent: SComponent
): ComponentWithSub<TComponent, Name, SComponent> {
  const c = component as any;
  c[name] = subComponent;
  return c as any;
}

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
