import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import FormGroup from "@/components/FormGroup";

import NumericField from "@/pages/SaveEditor/components/fields/NumericField";

import EditorContainer from "../components/EditorContainer";
import EditorHeader from "../components/EditorHeader";
import GameObjectHeader from "../components/GameObjectHeader";

type Props = StateProps;
class GameObjectEditor extends React.Component<Props> {
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
        <FormGroup>
          <FormGroup.Label>Position</FormGroup.Label>
          <FormGroup.Content>
            <FormGroup>
              <FormGroup.Label>X</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...gameObjectPath, "position", "x"]}
                />
              </FormGroup.Content>
            </FormGroup>
            <FormGroup>
              <FormGroup.Label>Y</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...gameObjectPath, "position", "y"]}
                />
              </FormGroup.Content>
            </FormGroup>
            <FormGroup>
              <FormGroup.Label>Z</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...gameObjectPath, "position", "z"]}
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
                  path={[...gameObjectPath, "scale", "x"]}
                />
              </FormGroup.Content>
            </FormGroup>
            <FormGroup>
              <FormGroup.Label>Y</FormGroup.Label>
              <FormGroup.Content>
                <NumericField
                  precision="single"
                  path={[...gameObjectPath, "scale", "y"]}
                />
              </FormGroup.Content>
            </FormGroup>
          </FormGroup.Content>
        </FormGroup>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(GameObjectEditor);
