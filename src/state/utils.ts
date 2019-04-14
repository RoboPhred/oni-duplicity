import { Selector } from "react-redux";
import { createStructuredSelector as createSS } from "reselect";

import { AppState } from "@/state";

export type StructuredStateProps<
  TSelectors extends Record<string, Selector<AppState, TOwnProps, any>>,
  TOwnProps = {}
> = { [K in keyof TSelectors]: ReturnType<TSelectors[K]> };

/**
 * Type wrangling function to provide better type inferencing
 * for createStructuredSelector against our AppState.
 *
 * By inverting the type relationship from the real cSS, we
 * allow the selector to become the primary inferred type
 * and generate the state props from its return types.
 */
export function createStructuredSelector<
  TSelectors extends Record<string, Selector<AppState, any, any>>
>(
  selectors: TSelectors
): (state: AppState) => StructuredStateProps<TSelectors> {
  return createSS(selectors as any) as any;
}
