declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
}

declare module "react-files" {
  export interface FilesProps {
    className?: string;
    onChange?(files: File[]): void;
    onError?(error: Error, file: File): void;
    accepts?: string[];
    multiple?: boolean;
    maxFiles?: number;
    maxFileSize?: number;
    minFileSize?: number;
    clickable?: boolean;
  }

  const Files: React.ComponentClass<FilesProps>;
  export default Files;
}
