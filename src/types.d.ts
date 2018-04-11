
declare module "react-files";


declare module "worker-loader!*" {
    class WebpackWorker extends Worker {
        constructor();
    }

    export = WebpackWorker;
}

interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
}