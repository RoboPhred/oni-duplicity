
import * as React from "react";

import {
    NonIdealState,
    Text
} from "@blueprintjs/core";

const style_line_1: React.CSSProperties = {
    fontSize: "20pt"
};

const style_line_2: React.CSSProperties = {
    fontSize: "12pt"
};

const style_content: React.CSSProperties = {
    marginTop: "8px"
};

class DuplicantsPage extends React.Component {
    render() {
        return (
            <NonIdealState visual="error">
                <div>
                    <div style={style_line_1}>I don't know how you got here...</div>
                    <div style={style_line_2}>But weasels were probably involved.</div>
                </div>
                <div style={style_content}>
                    <div>No idea what this page is supposed to be, sorry.</div>
                    <div>Try choosing something else to edit.</div>
                </div>
            </NonIdealState>
        )
    }
}

export default DuplicantsPage