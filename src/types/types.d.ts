/**
 * Properties passed to a component when withStyles is used.
 */
type StyleProps<T> = T extends (theme: any) => infer R
  ? ObjStyleProps<R>
  : ObjStyleProps<T>;
type ObjStyleProps<T> = { classes: { [K in keyof T]: string } };

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};

type ArrayValues<T> = T extends Array<infer U> ? U : never;

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  __REDUX_DEVTOOLS_EXTENSION__?: any;
  loadMockSave?: Function;
  loadMockError?: Function;
}
