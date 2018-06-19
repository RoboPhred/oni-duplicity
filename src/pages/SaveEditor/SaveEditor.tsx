import * as React from "react";

import { autobind } from "core-decorators";
import { get } from "lodash-es";

import Files from "react-files";

import { SaveGame, parseSaveGame } from "oni-save-parser";

import testData from "@/__mocks__/save-game.json";

import SaveEditorContainer from "./components/SaveEditorContainer";
import SidebarContainer from "./components/SidebarContainer";
import ContentContainer from "./components/ContentContainer";

import SaveStructure from "./components/SaveStructure";
import ObjectEditor from "./components/ObjectEditor";

type Props = {};
interface State {
  error: Error | null;
  saveGame: SaveGame | null;
  selectedPath: string[] | null;
}
export default class SaveEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
      saveGame: null,
      selectedPath: null
    };
  }

  render() {
    const { error, saveGame, selectedPath } = this.state;

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
        <SaveEditorContainer>
          <SidebarContainer>
            <SaveStructure
              saveGame={saveGame}
              onSelected={this._onPathSelected}
            />
          </SidebarContainer>
          <ContentContainer>
            {selectedPath && (
              <ObjectEditor value={get(saveGame, selectedPath)} />
            )}
          </ContentContainer>
        </SaveEditorContainer>
      );
    } else {
      return (
        <div>
          <Files accepts={[".sav"]} clickable onChange={this._onFilesChanged}>
            Click or drag file to load
          </Files>
          <button onClick={this._loadTestData}>Load Test Data</button>
        </div>
      );
    }
  }

  @autobind()
  private _onPathSelected(path: string[]) {
    this.setState({
      selectedPath: path
    });
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

  @autobind()
  private _loadTestData() {
    this.setState({
      error: null,
      saveGame: testData as any
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
