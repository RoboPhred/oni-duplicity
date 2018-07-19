import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import NonIdealState from "@/components/NonIdealState";
import FormGroup from "@/components/FormGroup";
import EditModeCondition from "@/components/EditModeCondition";

import NumericField from "@/pages/SaveEditor/components/fields/NumericField";

import EditorContainer from "../../components/EditorContainer";
import GameObjectHeader from "../components/GameObjectHeader";

type Props = StateProps;
class DefaultGameObjectEditor extends React.Component<Props> {
  render() {
    const { gameObjectPath, gameObjectName } = this.props;
    if (!gameObjectPath) {
      <NonIdealState intent={Intent.Dangerous} header="No GameObject Selected">
        No object is selected, or the selected object is not a GameObject.
      </NonIdealState>;
    }

    return (
      <EditorContainer
        header={<GameObjectHeader>{gameObjectName}</GameObjectHeader>}
      >
        <FormGroup label="Position">
          <FormGroup label="X" inline>
            <NumericField
              precision="single"
              path={[...gameObjectPath, "position", "x"]}
            />
          </FormGroup>
          <FormGroup label="Y" inline>
            <NumericField
              precision="single"
              path={[...gameObjectPath, "position", "y"]}
            />
          </FormGroup>
          <EditModeCondition editMode="advanced">
            <FormGroup label="Z" inline>
              <NumericField
                precision="single"
                path={[...gameObjectPath, "position", "z"]}
              />
            </FormGroup>
          </EditModeCondition>
        </FormGroup>
        <FormGroup label="Scale">
          <FormGroup label="X" inline>
            <NumericField
              precision="single"
              path={[...gameObjectPath, "scale", "x"]}
            />
          </FormGroup>
          <FormGroup label="Y" inline>
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
