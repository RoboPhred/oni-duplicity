// Temporary fix for withComponent not inheriting
//  new component props.
// See https://github.com/styled-components/styled-components/pull/1739

type SCC<P, T, O> = import("styled-components").StyledComponentClass<P, T, O>;

declare type StyledWithComponentTag<
  TTag extends keyof JSX.IntrinsicElements,
  TProps
> = SCC<JSX.IntrinsicElements[TTag], any, JSX.IntrinsicElements[TTag] & TProps>;

type TOSP<O, T> = import("styled-components").ThemedOuterStyledProps<O, T>;
// Typescript has a bug trying to deep-infer props through React.ComponentClass<infer R>,
//  so we have to be explicit and reproduce it at this level.
declare type PropsOfStyledComponent<T> = T extends React.ComponentClass<
  TOSP<infer O, infer T>
>
  ? import("styled-components").ThemedOuterStyledProps<O, T>
  : never;
