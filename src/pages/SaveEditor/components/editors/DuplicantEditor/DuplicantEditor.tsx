import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
import TextField from "@/pages/SaveEditor/components/fields/TextField";

import EditorContainer from "../components/EditorContainer";
import EditorHeader from "../components/EditorHeader";

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
          <Text intent={Intent.Secondary}>Duplicant Name: </Text>
          <TextField path={minionNamePath} />
        </EditorHeader>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantEditor);
