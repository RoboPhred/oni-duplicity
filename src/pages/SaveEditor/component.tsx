
import * as React from "react";
import { observer } from "mobx-react";
import { Switch, Route, Redirect, RouteComponentProps, withRouter } from "react-router";

import {
    Card,
    Elevation,
    Menu,
    MenuDivider
} from "@blueprintjs/core";

import { withSaveEditor, SaveEditorProps } from "@/services/save-editor";

import NoSaveLoadedPage from "./components/NoSaveLoaded";
import LoadingSaveFilePage from "./components/LoadingSaveFile";

import GeneralPage from "./pages/General";
import DuplicantsPage from "./pages/Duplicants";
import GeysersPage from "./pages/Geysers";

import ErrorPage from "../Error";
import Error404Page from "../404";

type Props = SaveEditorProps & RouteComponentProps<any>;
@observer
class SaveEditorPageComponent extends React.Component<Props> {
    render() {
        const {
            saveEditor: {
                loadError,
                saveName,
                isSaveLoading
            }
        } = this.props;

        let rootComponent: React.ReactChild;

        if (loadError) {
            // Show error screen
            return <ErrorPage error={loadError} />;
        }

        if (!saveName) {
            return <NoSaveLoadedPage />
        }

        else if (isSaveLoading) {
            return <LoadingSaveFilePage />;
        }

        return (
            <div className="ui-page ui-page-saveeditor fill-parent">
                <Switch>
                    <Redirect exact from="/editor" to="/editor/duplicants" />
                    <Route exact path="/editor/general" component={GeneralPage} />
                    <Route exact path="/editor/duplicants" component={DuplicantsPage} />
                    <Route exact path="/editor/geysers" component={GeysersPage} />
                    <Route component={Error404Page} />
                </Switch>
            </div>
        )
    }
}
export default withRouter(withSaveEditor(SaveEditorPageComponent));