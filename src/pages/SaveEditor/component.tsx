
import * as React from "react";
import { RouteComponentProps, Switch, Route, Redirect, withRouter } from "react-router";

import {
    Card,
    Elevation,
    Menu,
    MenuDivider
} from "@blueprintjs/core";

import ActiveAwareLink from "../../components/ActiveAwareLink";

import DuplicantsPage from "./pages/Duplicants";
import Error404Page from "../404";

class SaveEditorPageComponent extends React.Component {
    render() {
        return (
            <div className="ui-page ui-page-saveeditor fill-parent">
                <Switch>
                    <Redirect exact from="/editor" to="/editor/duplicants" />
                    <Route exact path="/editor/duplicants" component={DuplicantsPage} />
                    <Route component={Error404Page}/>
                </Switch>
            </div>
        )
    }
}

export default SaveEditorPageComponent;
