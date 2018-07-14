// Temporary fix for withComponent not inheriting
//  new component props.
// See https://github.com/styled-components/styled-components/pull/1739

type SCC<P, T, O> = import("styled-components").StyledComponentClass<P, T, O>;
type TOSP<O, T> = import("styled-components").ThemedOuterStyledProps<O, T>;

declare type StyledWithComponentTag<
  TTag extends keyof JSX.IntrinsicElements,
  TProps
> = SCC<JSX.IntrinsicElements[TTag], any, JSX.IntrinsicElements[TTag] & TProps>;

// Typescript has a bug trying to deep-infer props through React.ComponentClass<infer R>,
//  so we have to be explicit and reproduce it at this level.
declare type PropsOfStyledComponent<T> = T extends React.ComponentClass<
  TOSP<infer O, infer T>
>
  ? import("styled-components").ThemedOuterStyledProps<O, T>
  : never;

// Cannot use ReactComponentProps as typescript fails to infer the presense of ThemedOuterStyledProps
//  This is still mucking up the type of 'ref'
declare type StyledComponentProps<T> = T extends SCC<infer P, infer T, infer O>
  ? TOSP<O, T>
  : never;
