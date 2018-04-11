
import * as React from "react";
import { RouteComponentProps, Switch, Route, Redirect, withRouter } from "react-router";

import {
    Card,
    Elevation,
    Menu
} from "@blueprintjs/core";

import ActiveAwareLink from "../../components/ActiveAwareLink";

import DuplicantsPage from "./pages/Duplicants";
import Error404Page from "./pages/404";


class SaveEditorPageComponent extends React.Component {
    render() {
        return (
            <div className="ui-page ui-page-saveeditor fill-parent layout-horizontal">
                <div className="ui-nav-menu layout-item">
                    <ActiveAwareLink to="/duplicants" >Duplicants</ActiveAwareLink>
                    <ActiveAwareLink to="/404" >Not Duplicants</ActiveAwareLink>
                </div>
                <div className="layout-item-fill">
                    <Switch>
                        <Redirect exact from="/" to="/duplicants" />
                        <Route path="/duplicants" component={DuplicantsPage} />
                        <Route exact path="/404" component={Error404Page} />
                        <Redirect to="/404" />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default SaveEditorPageComponent;