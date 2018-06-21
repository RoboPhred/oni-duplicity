import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";
import { get } from "lodash-es";

import { saveAs } from "file-saver";
import { SaveGame, parseSaveGame, writeSaveGame } from "oni-save-parser";

import testData from "@/__mocks__/save-game.json";

import Flex from "@/components/Flex";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import SaveEditorContainer from "./components/SaveEditorContainer";
import SidebarContainer from "./components/SidebarContainer";
import ContentContainer from "./components/ContentContainer";
import ContentSeparator from "./components/ContentSeparator";

import SaveStructureTree from "./components/SaveStructureTree";
import ObjectEditor from "./components/ObjectEditor";

type Props = StateProps & DispatchProps;
interface State {
  selectedPath: string[] | null;
}
class SaveEditor extends React.Component<Props, State> {
  private _input: HTMLElement | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedPath: null
    };
  }

  render() {
    const { error, oniSave } = this.props;
    const { selectedPath } = this.state;

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
            {/* <button onClick={this._loadTestData}>Load Test Data</button> */}
            {oniSave && (
              <button onClick={this._onSaveFileClick}>Save File</button>
            )}
          </Flex.Item>
          {oniSave && (
            <Flex.Container direction="row" width="100%" height="100%">
              <Flex.Item>
                <SidebarContainer>
                  <SaveStructureTree
                    saveGame={oniSave}
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
                      obj={get(oniSave, selectedPath) || {}}
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
    const file = files[0];

    const { onLoad } = this.props;
    onLoad(file);
  }

  // @autobind()
  // private _loadTestData() {
  //   this.setState({
  //     error: null,
  //     saveGame: testData as any
  //   });
  // }

  @autobind()
  private _onSaveFileClick() {
    const { onSave } = this.props;
    const fileName = withExtension("my-file", ".sav");
    onSave(fileName);
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveEditor);

function withExtension(name: string, ext: string): string {
  if (name.endsWith(ext)) return name;
  return name + ext;
}
