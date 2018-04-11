
import * as React from "react";
import { connect } from "react-redux";

import {
    Tabs,
    Tab,
} from "@blueprintjs/core";


import DuplicantsList from "./components/DuplicantsList";


const DummyTab = () => {
    return <div>Dummy Tab</div>;
};

type Props = {};
interface State {
    selectedTabId: string;
}
class DuplicantsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedTabId: "general"
        };
    }
    render() {
        const {
            selectedTabId
        } = this.state;
        return (
            <div className="ui-page ui-page-duplicants fill-parent layout-vertical">
                <DuplicantsList className="layout-item"/>
                <Tabs id="DuplicantEditCategories" className="ui-duplicant-editcategories layout-item-fill">
                    <Tab id="general" title="General" panel={<DummyTab/>}/>
                    <Tab id="skills" title="Skills" panel={<DummyTab/>}/>
                </Tabs>
            </div>
        );
    }
}

export default DuplicantsPage

