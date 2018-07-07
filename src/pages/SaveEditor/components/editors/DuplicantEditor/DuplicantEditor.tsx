import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
import FormGroup from "@/components/FormGroup";

import EditableTextField from "@/pages/SaveEditor/components/fields/EditableTextField";
import NumericField from "@/pages/SaveEditor/components/fields/NumericField";

import EditorContainer from "../components/EditorContainer";
import EditorHeader from "../components/EditorHeader";

type Props = StateProps;
class DuplicantEditor extends React.Component<Props> {
  render() {
    const { minionNamePath, minionGameObjectPath } = this.props;
    if (!minionNamePath) {
      return "Error: Malformed data";
    }

    return (
      <EditorContainer>
        <EditorHeader>
          <Text>Name: </Text>
          <EditableTextField intent={Intent.Primary} path={minionNamePath} />
        </EditorHeader>
        <FormGroup>
          <FormGroup.Label>Position</FormGroup.Label>
          <FormGroup.Content>
            <FormGroup>
              <FormGroup.Label>X</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...minionGameObjectPath, "position", "x"]}
                />
              </FormGroup.Content>
            </FormGroup>
            <FormGroup>
              <FormGroup.Label>Y</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...minionGameObjectPath, "position", "y"]}
                />
              </FormGroup.Content>
            </FormGroup>
            <FormGroup>
              <FormGroup.Label>Z</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...minionGameObjectPath, "position", "z"]}
                />
              </FormGroup.Content>
            </FormGroup>
          </FormGroup.Content>
        </FormGroup>
        <FormGroup>
          <FormGroup.Label>Scale</FormGroup.Label>
          <FormGroup.Content>
            <FormGroup>
              <FormGroup.Label>X</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...minionGameObjectPath, "scale", "x"]}
                />
              </FormGroup.Content>
            </FormGroup>
            <FormGroup>
              <FormGroup.Label>Y</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...minionGameObjectPath, "scale", "y"]}
                />
              </FormGroup.Content>
            </FormGroup>
          </FormGroup.Content>
        </FormGroup>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantEditor);
