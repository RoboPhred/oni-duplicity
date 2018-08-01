import * as React from "react";
import { connect } from "react-redux";
import { Trans } from "react-i18next";

import mapStateToProps, { StateProps } from "./derived-state";

import SelectedPathBreadcrumb from "@/components/SelectedPathBreadcrumb";
import ResizePanel from "@/components/ResizePanel";

import { editorFromSaveItem } from "./components/editors";

import SaveEditorContainer from "./components/SaveEditorContainer";
import ContentContainer from "./components/ContentContainer";
import EditorContainer from "./components/EditorContainer";

import Sidebar from "./components/Sidebar";
import Separator from "@/components/Separator";
import NonIdealState from "@/components/NonIdealState";
import { Intent } from "@/style";

type Props = StateProps;
class SaveEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedPath: null
    };
  }

  render() {
    const { selectedPath, oniSave } = this.props;

    if (!oniSave) {
      return (
        <SaveEditorContainer>
          <NonIdealState intent={Intent.Dangerous}>
            <Trans i18nKey="save-file.not-loaded">
              No save has been loaded
            </Trans>
          </NonIdealState>
        </SaveEditorContainer>
      );
    }

    const ObjectEditor = editorFromSaveItem(selectedPath, oniSave);

    return (
      <SaveEditorContainer>
        <ResizePanel>
          <Sidebar />
        </ResizePanel>
        <ContentContainer>
          <SelectedPathBreadcrumb />
          <Separator width="100%" />
          <EditorContainer>
            <ObjectEditor />
          </EditorContainer>
        </ContentContainer>
      </SaveEditorContainer>
    );
  }
}
export default connect(mapStateToProps)(SaveEditor);
