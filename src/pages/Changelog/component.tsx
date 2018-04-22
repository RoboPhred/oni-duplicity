
import * as React from "react";
import Markdown from "react-markdown";

const changelog = require("@/../CHANGELOG.md");

import "./style.scss";

export default class ChangelogPage extends React.Component {
    render() {
        return <Markdown className="ui-page ui-page-changelog fill-parent" source={changelog}/>
    }
}