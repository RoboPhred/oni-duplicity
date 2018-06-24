import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import Modal from "react-modal";

import Flex from "@/components/Flex";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import SaveEditorContainer from "./components/SaveEditorContainer";
import SidebarContainer from "./components/SidebarContainer";
import ContentContainer from "./components/ContentContainer";

import SaveStructureTree from "./components/SaveStructureTree";
import SelectedItemEditor from "./components/SelectedItemEditor";

type Props = StateProps & DispatchProps;
class SaveEditor extends React.Component<Props> {
  private _input: HTMLElement | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedPath: null
    };
  }

  render() {
    const {
      error,
      oniSave,
      loadingState,
      onDismissError,
      onLoadTestData
    } = this.props;

    switch (loadingState) {
      case "loading":
        return (
          <Modal isOpen={true} contentLabel="Loading">
            <p>Loading File</p>
          </Modal>
        );
      case "saving":
        return (
          <Modal isOpen={true} contentLabel="Saving">
            <p>Saving File</p>
          </Modal>
        );
    }

    if (error) {
      return (
        <Modal isOpen={true} onRequestClose={onDismissError}>
          <Flex.Container direction="column" width="100%" height="100%">
            <Flex.Item grow>
              <h2>Error</h2>
              <code>{error.stack || error.message || String(error)}</code>
            </Flex.Item>
            <Flex.Item>
              <button onClick={onDismissError}>Close</button>
            </Flex.Item>
          </Flex.Container>
        </Modal>
      );
    }

    return (
      <SaveEditorContainer>
        <Flex.Container direction="column" width="100%" height="100%">
          <Flex.Item>
            <input
              ref={el => (this._input = el)}
              style={{ display: "none" }}
              type="file"
              accept=".sav"
              onChange={this._onLoadFile}
            />
            <button onClick={this._onLoadFileClick}>Load File</button>
            <button onClick={onLoadTestData}>Load Test Data</button>
            {oniSave && (
              <button onClick={this._onSaveFileClick}>Save File</button>
            )}
          </Flex.Item>
          {oniSave && (
            <Flex.Container direction="row" width="100%" height="100%">
              <Flex.Item>
                <SidebarContainer>
                  <SaveStructureTree />
                </SidebarContainer>
              </Flex.Item>
              <Flex.Item grow shrink>
                <ContentContainer>
                  <SelectedItemEditor />
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
    const { onSelectPath } = this.props;
    onSelectPath(path);
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
