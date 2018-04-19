
import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router";
import { autobind } from "core-decorators";

import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Text,
    Dialog,
    Button,
    Alignment,
    Spinner,
    NonIdealState
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import mapStateToProps, { StateProps } from "./selectors";

import AppNavBar from "../AppNavBar";
import AppNavMenu from "../AppNavMenu";

import SaveEditorPage from "../../pages/SaveEditor";
import ChangelogPage from "../../pages/Changelog";
import Error404Page from "../../pages/404";
import { NavMenuEntry } from "../AppNavMenu/interfaces";

type OwnProps = StateProps;
class AppComponent extends React.Component<OwnProps> {
    private _input: HTMLInputElement | null = null;

    render() {
        const {
            saveFileName,
            isSaveSaving
        } = this.props;

        const navMenuEntries: NavMenuEntry[] = [
            {
                // Save Editor
                //  TODO: have save editor itself define these.
                type: "link",
                path: "/editor",
                name: "Save Editor",
                subEntries: [
                    {
                        type: "link",
                        path: "/editor/general",
                        name: "General"
                    },
                    {
                        type: "link",
                        path: "/editor/duplicants",
                        name: "Duplicants"
                    }
                ]
            },
            {
                // Utility items
                type: "group",
                entries: [
                    
                ]
            },
            {
                type: "link",
                path: "/changelog",
                name: "Duplicity Changelog"
            }
        ];

        return (
            <div className="ui-app-root pt-app pt-dark fill-parent layout-vertical">
                <AppNavBar className="layout-item"/>
                <div className="layout-item-fill layout-horizontal">
                    <AppNavMenu className="layout-item" entries={navMenuEntries} />
                    <div className="layout-item-fill">
                        <Switch>
                            <Route path="/editor" component={SaveEditorPage}/>
                            <Route exact path="/404" component={Error404Page}/>
                            <Route exact path="/changelog" component={ChangelogPage} />
                            <Redirect exact from="/" to="/editor"/>
                            <Route component={Error404Page}/>
                        </Switch>
                    </div>
                </div>
                <Dialog isOpen={isSaveSaving} title="Saving File" icon={IconNames.SAVED} isCloseButtonShown={false}>
                    <NonIdealState>
                        <div>
                            <Spinner large={true}/>
                        </div>
                        <div>
                            Saving <code>{saveFileName}</code>
                        </div>
                    </NonIdealState>
                </Dialog>
            </div>
        );
    }


}
export default connect(mapStateToProps)(AppComponent);