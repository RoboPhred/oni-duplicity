// Temporary fix for withComponent not inheriting
//  new component props.
// See https://github.com/styled-components/styled-components/pull/1739

type SCC<P, T, O> = import("styled-components").StyledComponentClass<P, T, O>;
type TOSP<O, T> = import("styled-components").ThemedOuterStyledProps<O, T>;

declare type StyledWithComponentTag<
  TTag extends keyof JSX.IntrinsicElements,
  TProps
> = SCC<JSX.IntrinsicElements[TTag], any, JSX.IntrinsicElements[TTag] & TProps>;

// Cannot use ReactComponentProps as typescript fails to infer the presense of ThemedOuterStyledProps
//  This is still mucking up the type of 'ref'
// Ref is not being inferred correctly: it is being pulled from P, which is not
//  the actual class being produced.
//  Ref gets replaced by one pointing to the class in question, which in our
//  case is T.  Pull out ref, and merge in the correct one.
declare type StyledComponentProps<T> = T extends SCC<infer P, infer Q, infer O>
  ? TOSP<Omit<O, "ref">, Q> & { ref: React.Ref<T> }
  : never;
