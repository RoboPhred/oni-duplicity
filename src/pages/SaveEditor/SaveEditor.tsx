import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";

import SelectedPathBreadcrumb from "@/components/SelectedPathBreadcrumb";
import ResizePanel from "@/components/ResizePanel";

import { getEditor } from "./components/editors";

import SaveEditorContainer from "./components/SaveEditorContainer";
import ContentContainer from "./components/ContentContainer";
import EditorContainer from "./components/EditorContainer";

import Sidebar from "./components/Sidebar";
import Separator from "@/components/Separator";

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

    const ObjectEditor = getEditor(editorType);

    return (
      <SaveEditorContainer>
        <ResizePanel>
          <Sidebar />
        </ResizePanel>
        <ContentContainer>
          <SelectedPathBreadcrumb />
          <Separator width="100%" />
          <EditorContainer>
            <ObjectEditor {...editorProps} />
          </EditorContainer>
        </ContentContainer>
      </SaveEditorContainer>
    );
  }
}
export default connect(mapStateToProps)(SaveEditor);
