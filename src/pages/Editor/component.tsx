
import * as React from "react";
import { RouteComponentProps, Switch, Route, Redirect, withRouter } from "react-router";

import {
    Card,
    Elevation,
    Menu,

    // FIXME: direct color access.  Use CSS.
    //  Need to use sass to pull values out of blueprintjs
    Colors
} from "@blueprintjs/core";

import ActiveAwareLink from "../../components/ActiveAwareLink";

import DuplicantsPage from "./pages/Duplicants";
import Error404Page from "./pages/404";

const style_menu_container = {
    padding: "15px",
    background: Colors.DARK_GRAY5
}

class EditorPageComponent extends React.Component {
    render() {
        return (
            <div className="fill-parent layout-horizontal">
                <div style={style_menu_container} className="layout-item">
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

export default EditorPageComponent;