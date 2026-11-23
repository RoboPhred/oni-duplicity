type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

type ArrayValues<T> = T extends Array<infer U> ? U : never;

type PropsOfComponent<T> = T extends React.Component<infer P> ? P : never;

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  __REDUX_DEVTOOLS_EXTENSION__?: any;
  loadMockSave?: Function;
  loadMockError?: Function;
}

declare module "worker-loader*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}

declare module "@changelog" {
  const content: string;
  export = content;
}

/** App version string injected at build time, e.g. "v3.18.1-tosjkg v0". */
declare const __APP_VERSION__: string;
