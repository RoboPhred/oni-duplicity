import * as React from "react";

import { autobind } from "core-decorators";

import Files from "react-files";

import { SaveGame, parseSaveGame } from "oni-save-parser";

type Props = {};
interface State {
  error: Error | null;
  saveGame: SaveGame | null;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
      saveGame: null
    };
  }
  render() {
    const { error, saveGame } = this.state;

    if (error) {
      return (
        <div>
          <h2>Error</h2>
          <code>{error.stack || error.message || String(error)}</code>
        </div>
      );
    }
    if (saveGame) {
      return (
        <pre>
          <code>
            {JSON.stringify(
              {
                ...saveGame,
                world: {
                  ...saveGame.world,
                  streamed: undefined
                }
              },
              null,
              2
            )}
          </code>
        </pre>
      );
    } else {
      return (
        <Files accepts={[".sav"]} clickable onChange={this._onFilesChanged}>
          Click or drag file to load
        </Files>
      );
    }
  }

  @autobind()
  private _onFilesChanged(files: File[]) {
    readFile(files[0])
      .then(data => parseSaveGame(data))
      .then(saveGame => {
        this.setState({
          saveGame
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }
}

function readFile(file: File): Promise<ArrayBuffer> {
  const reader = new FileReader();
  return new Promise<ArrayBuffer>((accept, reject) => {
    reader.onload = () => {
      accept(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
  });
}
