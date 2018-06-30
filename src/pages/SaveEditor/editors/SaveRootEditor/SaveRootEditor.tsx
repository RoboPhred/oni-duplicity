import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import Text from "@/components/Text";
import InfoText from "@/components/InfoText";

import mapStateToProps, { StateProps } from "./derived-state";

import SaveRootEditorContainer from "./components/SaveRootEditorContainer";

import SaveGameTitle from "./components/SaveGameTitle";

type Props = StateProps;
class SaveRootEditor extends React.Component<Props> {
  render() {
    const { oniSave } = this.props;
    return (
      <SaveRootEditorContainer>
        {oniSave ? (
          this._renderContent()
        ) : (
          <Text intent={Intent.Hint}>No Save Loaded</Text>
        )}
      </SaveRootEditorContainer>
    );
  }

  private _renderContent() {
    const oniSave = this.props.oniSave!;
    const numGameObjects = oniSave.gameObjects.reduce(
      (count, set) => count + set.gameObjects.length,
      0
    );
    return (
      <React.Fragment>
        <SaveGameTitle intent={Intent.Primary}>
          {oniSave.header.gameInfo.baseName}
        </SaveGameTitle>
        <InfoText value={oniSave.header.gameInfo.numberOfCycles}>
          cycles
        </InfoText>
        <InfoText value={oniSave.header.gameInfo.numberOfDuplicants}>
          duplicants
        </InfoText>
        <InfoText value={numGameObjects}>game objects</InfoText>
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps)(SaveRootEditor);
