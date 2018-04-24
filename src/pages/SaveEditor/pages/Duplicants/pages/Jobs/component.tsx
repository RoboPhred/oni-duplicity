
import * as React from "react";

import {
    Tabs,
    Tab
} from "@blueprintjs/core";

import { GameObjectModel } from "@/services/save-editor";

import RolesPage from "./pages/Roles";
import AptitudePage from "./pages/Aptitudes";

export interface DuplicantRolesPageProps {
    duplicant: GameObjectModel;
}

type Props = DuplicantRolesPageProps;
class DuplicantRolesPage extends React.Component<Props> {
    render() {
        const { duplicant } = this.props;
        return (
            <div className="ui-duplicant-roles fill-parent">
                <Tabs className="fill-parent layout-horizontal" vertical={true} renderActiveTabPanelOnly={true} id="DuplicantRolePages">
                    <Tab className="layout-item-fill" id="roles" title="Roles" panel={<RolesPage duplicant={duplicant} />} />
                    <Tab className="layout-item-fill" id="aptitudes" title="Aptitudes" panel={<AptitudePage duplicant={duplicant} />} />
                </Tabs>
            </div>
        )
    }
}
export default DuplicantRolesPage;