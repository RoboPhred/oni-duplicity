type StructuredStateProps<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Utility type returning the unioned values of the object or array index.
 * This will effectively flatten an object, as {foo: string, bar: number} becomes (string | number).
 *
 * Arrays are treated to avoid capturing the "length" and other non-indexer properties.
 */
type Indexer<T> = T extends (infer V)[]
  ? V
  : T extends { [key: string]: infer V } ? V : never;

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
