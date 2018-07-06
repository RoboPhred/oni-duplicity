// Temporary fix for withComponent not inheriting
//  new component props.
// See https://github.com/styled-components/styled-components/pull/1739

type StyledComponentClass<
  P,
  T,
  O
> = import("styled-components").StyledComponentClass<P, T, O>;

declare type StyledWithComponent<
  TTag extends keyof JSX.IntrinsicElements,
  TProps
> = StyledComponentClass<
  JSX.IntrinsicElements[TTag],
  any,
  JSX.IntrinsicElements[TTag] & TProps
>;
