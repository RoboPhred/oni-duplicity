import * as React from "react";
import { connect } from "react-redux";

import Flex from "@/components/Flex";

import { getSaveItemEditor } from "@/services/save-structure";

import mapStateToProps, { StateProps } from "./derived-state";

import { getEditor } from "./editors";

import SaveEditorContainer from "./components/SaveEditorContainer";
import SidebarContainer from "./components/SidebarContainer";
import ContentContainer from "./components/ContentContainer";

import SaveStructureTree from "./components/SaveStructureTree";
import SelectPathBreadcrumb from "./components/SelectedPathBreadcrumb";

type Props = StateProps;
class SaveEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedPath: null
    };
  }

  render() {
    const { oniSave, selectedPath } = this.props;

    const editorType =
      (oniSave && getSaveItemEditor(selectedPath, oniSave)) || null;

    const ObjectEditor = getEditor(editorType);

    return (
      <SaveEditorContainer>
        {oniSave && (
          <Flex.Container direction="row" width="100%" height="100%">
            <Flex.Item>
              <SidebarContainer>
                <SaveStructureTree />
              </SidebarContainer>
            </Flex.Item>
            <Flex.Item grow shrink>
              <ContentContainer>
                <SelectPathBreadcrumb />
                <ObjectEditor />
              </ContentContainer>
            </Flex.Item>
          </Flex.Container>
        )}
      </SaveEditorContainer>
    );
  }
}
export default connect(mapStateToProps)(SaveEditor);
