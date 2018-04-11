
import * as React from "react";
import { connect } from "react-redux";


import {
    Tabs,
    Tab,
    Colors
} from "@blueprintjs/core";

import DuplicantsList from "./components/DuplicantsList";

// FIXME: direct color access.  Use CSS.
//  Need to use sass to pull values out of blueprintjs
const style = {
    background: Colors.DARK_GRAY3
};

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
            <div style={style} className="fill-parent layout-vertical">
                <DuplicantsList className="layout-item"/>
                <Tabs id="DuplicantFacets" className="layout-item-fill container-inset">
                    <Tab id="general" title="General" panel={<DummyTab/>}/>
                    <Tab id="skills" title="Skills" panel={<DummyTab/>}/>
                </Tabs>
            </div>
        );
    }
}

export default DuplicantsPage

