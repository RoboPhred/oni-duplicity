import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import FormGroup from "@/components/FormGroup";
import EditModeCondition from "@/components/EditModeCondition";

import NumericField from "@/pages/SaveEditor/components/fields/NumericField";

import EditorContainer from "../../components/EditorContainer";
import EditorHeader from "../../components/EditorHeader";
import GameObjectHeader from "../components/GameObjectHeader";

type Props = StateProps;
class DefaultGameObjectEditor extends React.Component<Props> {
  render() {
    const { gameObjectPath, gameObjectName } = this.props;
    if (!gameObjectPath) {
      return "Error: Malformed data";
    }

    return (
      <EditorContainer>
        <GameObjectHeader>
          <EditorHeader intent={Intent.Primary}>{gameObjectName}</EditorHeader>
        </GameObjectHeader>
        <FormGroup label="Position">
          <FormGroup label="X">
            <NumericField
              precision="single"
              path={[...gameObjectPath, "position", "x"]}
            />
          </FormGroup>
          <FormGroup label="Y">
            <NumericField
              precision="single"
              path={[...gameObjectPath, "position", "y"]}
            />
          </FormGroup>
          <EditModeCondition editMode="advanced">
            <FormGroup label="Z">
              <NumericField
                precision="single"
                path={[...gameObjectPath, "position", "z"]}
              />
            </FormGroup>
          </EditModeCondition>
        </FormGroup>
        <FormGroup label="Scale">
          <FormGroup label="X">
            <NumericField
              precision="single"
              path={[...gameObjectPath, "scale", "x"]}
            />
          </FormGroup>
          <FormGroup label="Y">
            <NumericField
              precision="single"
              path={[...gameObjectPath, "scale", "y"]}
            />
          </FormGroup>
        </FormGroup>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(DefaultGameObjectEditor);
