
import * as React from "react";
import { connect} from "react-redux";

import DuplicantsList from "./components/DuplicantsList";

class DuplicantsPage extends React.Component {
    render() {
        return (
            <div className="fill-parent layout-vertical">
                <DuplicantsList className="layout-item-fill"/>
            </div>
        );
    }
}

export default DuplicantsPage