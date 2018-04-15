
import * as React from "react";

import {
    Tabs,
    Tab
} from "@blueprintjs/core";


import DuplicantRolesPageProps from "./props";


import RolesPage from "./pages/Roles";

type Props = DuplicantRolesPageProps;
class DuplicantRolesPage extends React.Component<Props> {
    render() {
        const {
            duplicantID
        } = this.props;
        return (
            <div className="ui-duplicant-roles fill-parent">
                <Tabs className="fill-parent layout-horizontal" vertical={true} renderActiveTabPanelOnly={true} id="DuplicantRolePages">
                    <Tab className="layout-item-fill" id="roles" title="Roles" panel={<RolesPage duplicantID={duplicantID} />} />
                    <Tab id="aptitudes" title="Aptitudes" disabled/>
                </Tabs>
            </div>
        )
    }
}
export default DuplicantRolesPage;