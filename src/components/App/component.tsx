
import * as React from "react";
import { observer } from "mobx-react";
import { Route, Redirect, Switch, RouteComponentProps, withRouter } from "react-router";

import {
    Dialog,
    Spinner,
    NonIdealState
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import DevTools from "mobx-react-devtools";


import { SaveEditorProps, withSaveEditor } from "@/services/save-editor";

import AppNavBar from "../AppNavBar";
import AppNavMenu from "../AppNavMenu";

import SaveEditorPage from "../../pages/SaveEditor";
import ChangelogPage from "../../pages/Changelog";
import Error404Page from "../../pages/404";
import { NavMenuEntry } from "../AppNavMenu/interfaces";

type Props = SaveEditorProps & RouteComponentProps<any>;
@observer
class AppComponent extends React.Component<Props> {
    private _input: HTMLInputElement | null = null;

    render() {
        const {
            saveEditor: {
                isSaveSaving,
                saveName
            }
        } = this.props;

        // TODO: This should be defined elsewhere, probably alongside static route configuration.
        const navMenuEntries: NavMenuEntry[] = [
            {
                // Save Editor
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
                    },
                    {
                        type: "link",
                        path: "/editor/geysers",
                        name: "Geysers"
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
                    <div>
                        <DevTools/>
                    </div>
                </div>
                <Dialog isOpen={isSaveSaving} title="Saving File" icon={IconNames.SAVED} isCloseButtonShown={false}>
                    <NonIdealState>
                        <div>
                            <Spinner large={true}/>
                        </div>
                        <div>
                            Saving <code>{saveName}</code>
                        </div>
                    </NonIdealState>
                </Dialog>
            </div>
        );
    }
}
// Need withRouter to force update.  Yes, we need one on either side of ../App.tsx
export default withRouter(withSaveEditor(AppComponent));