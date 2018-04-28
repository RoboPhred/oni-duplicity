
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

import SiteSwitch from "@/site-graph/components/SiteSwitch";
import siteRoot from "@/site-graph/root";

import AppNavBar from "../AppNavBar";
import AppNavMenu from "../AppNavMenu";
import SavingDialog from "../SavingDialog";


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

        return (
            <div className="ui-app-root pt-app pt-dark fill-parent layout-vertical">
                <AppNavBar className="layout-item" />
                <div className="layout-item-fill layout-horizontal">
                    <AppNavMenu className="layout-item" siteGraph={siteRoot.children!} />
                    <div className="layout-item-fill">
                        <SiteSwitch siteGraph={siteRoot.children!}>
                            { /* TODO: Use an index path concept for site graph. */}
                            <Redirect exact from="/" to="/editor" />
                        </SiteSwitch>
                    </div>
                    {process.env.NODE_ENV === "development" ? <DevTools /> : undefined}
                </div>
                <Dialog isOpen={isSaveSaving} title="Saving File" icon={IconNames.SAVED} isCloseButtonShown={false}>
                    <SavingDialog />
                </Dialog>
            </div>
        );
    }
}
// Need withRouter to force update.  Yes, we need one on either side of ../App.tsx
export default withRouter(withSaveEditor(AppComponent));
