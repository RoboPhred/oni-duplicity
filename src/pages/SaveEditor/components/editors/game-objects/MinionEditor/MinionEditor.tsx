import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";

import VerticalTabs from "@/components/VerticalTabs";
import EditModeCondition from "@/components/EditModeCondition";

import EditorContainer from "../../components/EditorContainer";

import GameObjectHeader from "../components/GameObjectHeader";

import MinionHeader from "./components/MinionEditableName";

import MinionAppearanceTab from "./components/MinionAppearanceTab";
import MinionHealthTab from "./components/MinionHealthTab";
import MinionTraitsEditor from "./components/MinionTraitsEditor";
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
          <MinionHeader minionNamePath={minionNamePath} />
        </GameObjectHeader>

        <VerticalTabs width="100%">
          <VerticalTabs.Tab tabKey="appearance" header="Appearance">
            <MinionAppearanceTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="health" header="Health">
            <MinionHealthTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="traits" header="Traits">
            <MinionTraitsEditor />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="skills" header="Skills" />

          <VerticalTabs.Tab tabKey="aptitude" header="Aptitude" />

          <EditModeCondition editMode="advanced">
            <VerticalTabs.Tab tabKey="position" header="Position">
              <MinionPositionTab gameObjectPath={gameObjectPath} />
            </VerticalTabs.Tab>
          </EditModeCondition>
        </VerticalTabs>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantEditor);
