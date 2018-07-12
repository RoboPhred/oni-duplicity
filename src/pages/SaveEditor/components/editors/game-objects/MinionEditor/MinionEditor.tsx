import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";

import VerticalTabs from "@/components/VerticalTabs";

import EditorContainer from "../../components/EditorContainer";

import GameObjectHeader from "../components/GameObjectHeader";

import MinionHeader from "./components/MinionEditableName";

import MinionAppearanceTab from "./components/MinionAppearanceTab";
import MinionHealthTab from "./components/MinionHealthTab";
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
            <br />
            TODO scale
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="health" header="Health">
            <MinionHealthTab />
            TODO health points, stanima, diseases (surface and ingested), so on.
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="position" header="Position">
            <MinionPositionTab gameObjectPath={gameObjectPath} />
          </VerticalTabs.Tab>
        </VerticalTabs>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantEditor);
