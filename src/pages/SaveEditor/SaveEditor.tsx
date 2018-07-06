import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import SelectedPathBreadcrumb from "@/components/SelectedPathBreadcrumb";
import Text from "@/components/Text";
import Input from "@/components/Input";
import ResizePanel from "@/components/ResizePanel";

import { getEditor } from "./components/editors";

import SaveEditorContainer from "./components/SaveEditorContainer";
import SidebarContainer from "./components/SidebarContainer";
import ContentContainer from "./components/ContentContainer";
import EditorContainer from "./components/EditorContainer";

import SaveStructureTree from "./components/SaveStructureTree";

type Props = StateProps & DispatchProps;
class SaveEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedPath: null
    };
  }

  render() {
    const { editorType, editorProps } = this.props;

    const ObjectEditor = getEditor(editorType);

    return (
      <SaveEditorContainer>
        <ResizePanel>
          <SidebarContainer>
            <div>
              <Text.Label htmlFor="advanced_mode" intent={Intent.Secondary}>
                Advanced Mode
              </Text.Label>
              <Input
                id="advanced_mode"
                type="checkbox"
                onChange={this._onAdvancedModeChange}
              />
            </div>
            <SaveStructureTree />
          </SidebarContainer>
        </ResizePanel>
        <ContentContainer>
          <SelectedPathBreadcrumb />
          <EditorContainer>
            <ObjectEditor {...editorProps} />
          </EditorContainer>
        </ContentContainer>
      </SaveEditorContainer>
    );
  }

  @autobind()
  private _onAdvancedModeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { setEditMode } = this.props;
    setEditMode(e.target.checked ? "advanced" : "normal");
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveEditor);
