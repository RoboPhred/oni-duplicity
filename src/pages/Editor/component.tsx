
import * as React from "react";
import { RouteComponentProps, Switch, Route, Redirect, withRouter } from "react-router";

import {
    Card,
    Elevation,
    Menu
} from "@blueprintjs/core";

import MenuItemLink from "../../components/MenuItemLink";

import DuplicantsPage from "./pages/Duplicants";
import Error404Page from "./pages/404";

class EditorPageComponent extends React.Component {
    render() {
        return (
            <div className="fill-parent layout-horizontal">
                <Card className="layout-item" elevation={Elevation.TWO}>
                    <Menu>
                        <MenuItemLink to="/duplicants" >Duplicants</MenuItemLink>
                        <MenuItemLink to="/404" >Not Duplicants</MenuItemLink>
                    </Menu>
                </Card>
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

export default EditorPageComponent;