
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

import NoSaveLoadedPage from "../../pages/NoSaveLoaded";
import LoadingSaveFilePage from "../../pages/LoadingSaveFile";
import SaveEditorPage from "../../pages/SaveEditor";
import ChangelogPage from "../../pages/Changelog";
import ErrorPage from "../../pages/Error";
import Error404Page from "../../pages/404";
import { NavMenuEntry } from "../AppNavMenu/interfaces";

type OwnProps = StateProps;
class AppComponent extends React.Component<OwnProps> {
    private _input: HTMLInputElement | null = null;

    render() {
        const {
            saveFileName,
            isSaveChosen,
            isSaveLoading,
            isSaveSaving,
            loadError
        } = this.props;

        let rootComponent: React.ComponentType;
        let requireExactPath = true;
        let redirectOn404: string | null = null;

        // TODO: Load from somewhere
        let navMenuEntries: NavMenuEntry[] = [];
        
        if (loadError) {
            // Show error screen
            rootComponent = ErrorPage;
        }
        else if (!isSaveChosen) {
            // Show file chooser.
            rootComponent = NoSaveLoadedPage
            redirectOn404 = "/editor";
        }
        else if (isSaveLoading) {
            // Show loading screen.
            rootComponent = LoadingSaveFilePage;
        }
        else {
            // Show editor
            rootComponent = SaveEditorPage;
            requireExactPath = false;
            navMenuEntries = [
                {
                    path: "/editor/duplicants",
                    name: "Duplicants"
                }
            ];
        }

        return (
            <div className="ui-app-root pt-app pt-dark fill-parent layout-vertical">
                <AppNavBar className="layout-item"/>
                <div className="layout-item-fill layout-horizontal">
                    <AppNavMenu className="layout-item" entries={navMenuEntries} />
                    <div className="layout-item-fill">
                        <Switch>
                            <Route exact={requireExactPath} path="/editor" component={rootComponent}/>
                            <Route exact path="/404" component={Error404Page}/>
                            <Route exact path="/changelog" component={ChangelogPage} />
                            <Redirect exact from="/" to="/editor"/>
                            { redirectOn404 ? <Redirect to={redirectOn404}/> : <Route component={Error404Page}/> }
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