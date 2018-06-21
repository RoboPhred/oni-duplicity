type StructuredStateProps<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never
};

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}

// TODO: Remove and replace with tsconfig.json compolerOptions.resolveJsonModule when
//  https://github.com/Microsoft/TypeScript/pull/24959 is released.
declare module "*.json";

declare module "string-natural-compare" {
  interface NaturalCompare {
    (a: string, b: string): number;
    caseInsensitive(a: string, b: string): number;
  }
  const naturalCompare: NaturalCompare;
  export = naturalCompare;
}

// Cannot use DefinitelyTyped @types/reduce-reducers, as it is pinned to redux 3.7.2 and
//  contains incompatible typedefs for Action
declare module "reduce-reducers" {
  import { AnyAction, Reducer, Action } from "redux";
  function reduceReducers<S extends {}, A extends Action>(
    ...reducers: Reducer<S, A>[]
  ): Reducer<S, AnyAction>;
  export default reduceReducers;
}
