import { AnyAction } from "redux";

export type Reducer<TState> = (
  state: TState | undefined,
  action: AnyAction
) => TState;
export function reduceReducers<TState>(
  ...reducers: Reducer<TState>[]
): Reducer<TState> {
  return (state: TState | undefined, action: AnyAction) => {
    const result = reducers.reduce(
      (state, reducer) => reducer(state, action),
      state
    );
    return result!;
  };
}
