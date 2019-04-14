type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};

type ArrayValues<T> = T extends Array<infer U> ? U : never;

type PropsOfComponent<T> = T extends React.Component<infer P> ? P : never;

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
