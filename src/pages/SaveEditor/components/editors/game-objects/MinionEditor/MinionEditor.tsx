import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import VerticalTabs from "@/components/VerticalTabs";

import EditableTextField from "../../../fields/EditableTextField";

import EditorContainer from "../../components/EditorContainer";
import EditorHeader from "../../components/EditorHeader";

import GameObjectHeader from "../components/GameObjectHeader";

import MinionPositionTab from "./components/MinionPositionTab";

type Props = StateProps;
class DuplicantEditor extends React.Component<Props> {
  render() {
    const { minionNamePath, gameObjectPath } = this.props;
    if (!minionNamePath) {
      return "Error: Malformed data";
    }

    return (
      <EditorContainer>
        <GameObjectHeader>
          <EditorHeader>
            Name:&nbsp;
            <EditableTextField intent={Intent.Primary} path={minionNamePath} />
          </EditorHeader>
        </GameObjectHeader>

        <VerticalTabs width="100%">
          <VerticalTabs.Tab tabKey="position" header="Position">
            <MinionPositionTab gameObjectPath={gameObjectPath} />
          </VerticalTabs.Tab>
          <VerticalTabs.Tab tabKey="test2" header="Test 2">
            This is Test 2
          </VerticalTabs.Tab>
          <VerticalTabs.Tab tabKey="test3" header="Test 3">
            This is Test 3
          </VerticalTabs.Tab>
          <VerticalTabs.Tab tabKey="test4" header="Test 4">
            This is Test 4
          </VerticalTabs.Tab>
        </VerticalTabs>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantEditor);
