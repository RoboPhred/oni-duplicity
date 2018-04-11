
import * as React from "react";

import {
    NonIdealState,
    Text
} from "@blueprintjs/core";

class DuplicantsPage extends React.Component {
    render() {
        return (
            <NonIdealState className="ui-page ui-page-404" visual="error">
                <div>
                    <div className="ui-title">I don't know how you got here...</div>
                    <div className="ui-title-secondary">But weasels were probably involved.</div>
                </div>
                <div className="ui-body">
                    <div>No idea what this page is supposed to be, sorry.</div>
                    <div>Try choosing something else to edit.</div>
                </div>
            </NonIdealState>
        )
    }
}

export default DuplicantsPage