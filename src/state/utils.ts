
import { Dispatch as TypedDispatch } from "react-redux";

import { Selector, createStructuredSelector as createSS, createSelector } from "reselect";

import { AppState } from "./state";

export type Dispatch = TypedDispatch<AppState>;

export function createStructuredSelector<T>(
    selectors: {[K in keyof T]: Selector<AppState, T[K]>},
    selectorCreator?: typeof createSelector,
): Selector<AppState, T> {
    return createSS(selectors, selectorCreator);
}
