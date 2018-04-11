
import * as React from "react";
import { connect } from "react-redux";

import {
    Tabs,
    Tab,
} from "@blueprintjs/core";

import { getBehavior, MinionIdentityBehavior } from "../../../../../../services/save-editor/utils";


import DuplicantEditorProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";


import GeneralPage from "./pages/General";
import SkillsPage from "./pages/Skills";


type Props = DuplicantEditorProps & StateProps;
class DuplicantEditor extends React.Component<Props> {
    render() {
        const {
            className,
            duplicant
        } = this.props;

        if (!duplicant) return <div>Error: specified duplicant does not exist.</div>;

        // TODO: Get these from a selector.
        //  Trouble is, we do not have a unique key to ID these guys off of.  Everything
        //  is in a game behavior, and that's an array we need to scan through.
        const identity = getBehavior(duplicant, MinionIdentityBehavior);
        const name = identity ? identity.parsedData.name : "<NO-IDENTITY>";

        return (
            <div className={`ui-duplicant-editor ${className}`}>
                <h2 className="ui-title">{name}</h2>
                <Tabs id="DuplicantEditCategories" className="ui-category-tabs layout-item-fill">
                    <Tab id="general" title="General" panel={<GeneralPage />} />
                    <Tab id="skills" title="Skills" panel={<SkillsPage />} />
                </Tabs>
            </div>
        );
    }
}
export default connect(mapStateToProps)(DuplicantEditor);