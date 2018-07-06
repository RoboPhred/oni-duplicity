import * as React from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import ResizePanel from "@/components/ResizePanel";

import mapStateToProps, { StateProps } from "./derived-state";

import SelectedPathBreadcrumb from "@/components/SelectedPathBreadcrumb";

import { getEditor } from "./components/editors";

import SaveEditorContainer from "./components/SaveEditorContainer";
import SidebarContainer from "./components/SidebarContainer";
import ContentContainer from "./components/ContentContainer";

import SaveStructureTree from "./components/SaveStructureTree";

type Props = StateProps;
class SaveEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedPath: null
    };
  }

  render() {
    const { editorType, editorProps } = this.props;

    const ObjectEditor = styled(getEditor(editorType))`
      flex: 1 1 auto;
    `;

    return (
      <SaveEditorContainer>
        <ResizePanel>
          <SidebarContainer>
            <SaveStructureTree />
          </SidebarContainer>
        </ResizePanel>
        <ContentContainer>
          <SelectedPathBreadcrumb />
          <ObjectEditor {...editorProps} />
        </ContentContainer>
      </SaveEditorContainer>
    );
  }
}
export default connect(mapStateToProps)(SaveEditor);
