import * as React from "react";

import { autobind } from "core-decorators";
import { get } from "lodash-es";

import { saveAs } from "file-saver";
import { SaveGame, parseSaveGame, writeSaveGame } from "oni-save-parser";

import testData from "@/__mocks__/save-game.json";

import Flex from "@/components/Flex";

import SaveEditorContainer from "./components/SaveEditorContainer";
import SidebarContainer from "./components/SidebarContainer";
import ContentContainer from "./components/ContentContainer";
import ContentSeparator from "./components/ContentSeparator";

import SaveStructureTree from "./components/SaveStructureTree";
import ObjectEditor from "./components/ObjectEditor";

type Props = {};
interface State {
  error: Error | null;
  saveGame: SaveGame | null;
  selectedPath: string[] | null;
}
export default class SaveEditor extends React.Component<Props, State> {
  private _input: HTMLElement | null = null;

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

    return (
      <SaveEditorContainer>
        <Flex.Container direction="column" width="100%" height="100%">
          <Flex.Item>
            <input
              ref={el => (this._input = el)}
              style={{ display: "none" }}
              className="pt-button pt-intent-primary"
              type="file"
              accept=".sav"
              onChange={this._onLoadFile}
            />
            <button onClick={this._onLoadFileClick}>Load File</button>
            <button onClick={this._loadTestData}>Load Test Data</button>
            {saveGame && (
              <button onClick={this._onSaveFileClick}>Save File</button>
            )}
          </Flex.Item>
          {saveGame && (
            <Flex.Container direction="row" width="100%" height="100%">
              <Flex.Item>
                <SidebarContainer>
                  <SaveStructureTree
                    saveGame={saveGame}
                    onSelected={this._onPathSelected}
                  />
                </SidebarContainer>
              </Flex.Item>
              <ContentSeparator />
              <Flex.Item grow shrink>
                <ContentContainer>
                  {selectedPath && (
                    <ObjectEditor
                      path={selectedPath}
                      obj={get(saveGame, selectedPath) || {}}
                    />
                  )}
                </ContentContainer>
              </Flex.Item>
            </Flex.Container>
          )}
        </Flex.Container>
      </SaveEditorContainer>
    );
  }

  @autobind()
  private _onPathSelected(path: string[]) {
    this.setState({
      selectedPath: path
    });
  }

  @autobind()
  private _onLoadFileClick() {
    if (!this._input) {
      return;
    }
    this._input.click();
  }

  @autobind()
  private _onLoadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

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

  @autobind()
  private _onSaveFileClick() {
    const { saveGame } = this.state;
    if (!saveGame) {
      return;
    }

    const data = writeSaveGame(saveGame);
    const blob = new Blob([data]);
    saveAs(blob, withExtension("my-file", ".sav"));
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

function withExtension(name: string, ext: string): string {
  if (name.endsWith(ext)) return name;
  return name + ext;
}
