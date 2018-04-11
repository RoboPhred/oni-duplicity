
import { Dispatch as TypedDispatch } from "react-redux";

import { Selector, createStructuredSelector as createSS, createSelector, ParametricSelector } from "reselect";

import { AppState } from "./state";

export type Dispatch = TypedDispatch<AppState>;

export function createStructuredSelector<StateProps>(selectors: {[K in keyof StateProps]: Selector<AppState, StateProps[K]>}, selectorCreator?: typeof createSelector): Selector<AppState, StateProps>;
export function createStructuredSelector<Props, StateProps>(selectors: {[K in keyof StateProps]: ParametricSelector<AppState, Props, StateProps[K]>}, selectorCreator?: typeof createSelector): ParametricSelector<AppState, Props, StateProps>;
export function createStructuredSelector<StateProps>(selectors: any, selectorCreator?: typeof createSelector): Selector<AppState, StateProps> {
    return createSS(selectors, selectorCreator);
}
