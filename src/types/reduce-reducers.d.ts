// Cannot use DefinitelyTyped @types/reduce-reducers, as it is pinned to redux 3.7.2 and
//  contains incompatible typedefs for Action
declare module "reduce-reducers" {
  import { AnyAction, Reducer, Action } from "redux";
  function reduceReducers<S extends {}, A extends Action>(
    ...reducers: Reducer<S, A>[]
  ): Reducer<S, AnyAction>;
  export default reduceReducers;
}
