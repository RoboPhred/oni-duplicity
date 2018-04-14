
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
import ChangelogPage from "./pages/Changelog";
import Error404Page from "./pages/404";


class SaveEditorPageComponent extends React.Component {
    render() {
        return (
            <div className="ui-page ui-page-saveeditor fill-parent layout-horizontal">
                <div className="ui-nav-menu layout-item">
                    <ActiveAwareLink className="pt-menu-item" to="/duplicants" >Duplicants</ActiveAwareLink>
                    <MenuDivider />
                    <ActiveAwareLink className="pt-menu-item" to="/changelog" >Duplicity Changelog</ActiveAwareLink>
                </div>
                <div className="layout-item-fill">
                    <Switch>
                        <Redirect exact from="/" to="/duplicants" />
                        <Route path="/duplicants" component={DuplicantsPage} />
                        <Route path="/changelog" component={ChangelogPage} />
                        <Route exact path="/404" component={Error404Page} />
                        <Redirect to="/404" />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default SaveEditorPageComponent;