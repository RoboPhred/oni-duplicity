
import * as React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";

import {
    Card,
    Elevation,
    Menu,
    MenuDivider
} from "@blueprintjs/core";

import mapStateToProps, { StateProps } from "./selectors";


import NoSaveLoadedPage from "./components/NoSaveLoaded";
import ErrorPage from "./components/Error";
import LoadingSaveFilePage from "./components/LoadingSaveFile";

import GeneralPage from "./pages/General";
import DuplicantsPage from "./pages/Duplicants";

import Error404Page from "../404";

type Props = StateProps;
class SaveEditorPageComponent extends React.Component<Props> {
    render() {
        const {
            loadError,
            isSaveChosen,
            isSaveLoading
        } = this.props;

        let rootComponent: React.ReactChild;

        if (loadError) {
            // Show error screen
            return <ErrorPage />;
        }

        if (!isSaveChosen) {
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
                    <Route component={Error404Page} />
                </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SaveEditorPageComponent);
