import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";

import NonIdealState from "@/components/NonIdealState";
import VerticalTabs from "@/components/VerticalTabs";

import EditorContainer from "../../components/EditorContainer";

import GameObjectHeader from "../components/GameObjectHeader";

import MinionHeader from "./components/MinionEditableName";
import MinionAppearanceTab from "./components/MinionAppearanceTab";
import MinionAptitudesTab from "./components/MinionAptitudesTab";
import MinionEffectsTab from "./components/MinionEffectsTab";
import MinionHealthTab from "./components/MinionHealthTab";
import MinionJobsTab from "./components/MinionJobsTab";
import MinionSkillsTab from "./components/MinionSkillsTab";
import MinionTraitsTab from "./components/MinionTraitsTab";
import MinionPositionTab from "./components/MinionPositionTab";

type Props = StateProps;
class DuplicantEditor extends React.Component<Props> {
  render() {
    const { minionNamePath, gameObjectPath } = this.props;
    if (!minionNamePath) {
      return (
        <NonIdealState intent={Intent.Dangerous} header="Malformed Data">
          Duplicant is missing the MinionIdentity behavior.
        </NonIdealState>
      );
    }

    return (
      <EditorContainer
        header={
          <GameObjectHeader>
            <MinionHeader minionNamePath={minionNamePath} />
          </GameObjectHeader>
        }
      >
        <VerticalTabs width="100%" height="100%">
          <VerticalTabs.Tab tabKey="appearance" header="Appearance">
            <MinionAppearanceTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="health" header="Health">
            <MinionHealthTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="traits" header="Traits">
            <MinionTraitsTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="skills" header="Skills">
            <MinionSkillsTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="jobs" header="Jobs">
            <MinionJobsTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="aptitude" header="Aptitudes">
            <MinionAptitudesTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="effects" header="Effects">
            <MinionEffectsTab />
          </VerticalTabs.Tab>

          <VerticalTabs.Tab tabKey="position" header="Position">
            <MinionPositionTab />
          </VerticalTabs.Tab>
        </VerticalTabs>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantEditor);
