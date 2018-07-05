import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import HintText from "@/components/HintText";

import mapStateToProps, { StateProps } from "./derived-state";

import EditorContainer from "../components/EditorContainer";
import EditorHeader from "../components/EditorHeader";

import ItemEditableText from "../components/fields/ItemEditableText";

type Props = StateProps;
class DuplicantEditor extends React.Component<Props> {
  render() {
    const { minionNamePath } = this.props;
    if (!minionNamePath) {
      return "Error: Malformed data";
    }

    return (
      <EditorContainer>
        <EditorHeader>
          <ItemEditableText intent={Intent.Primary} path={minionNamePath} />
          <HintText> - click to edit</HintText>
        </EditorHeader>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantEditor);
