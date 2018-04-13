
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
import mapDispatchToProps, { DispatchProps } from "./dispatch";

import ErrorPage from "../../pages/error";
import NoSaveLoadedPage from "../../pages/NoSaveLoaded";
import LoadingSaveFilePage from "../../pages/LoadingSaveFile";
import SaveEditorPage from "../../pages/SaveEditor";

type OwnProps = StateProps & DispatchProps;
class AppComponent extends React.Component<OwnProps> {
    render() {
        const {
            saveFileName,
            isSaveEnabled,
            isSaveChosen,
            isSaveLoading,
            isSaveSaving,
            loadError
        } = this.props;

        let rootComponent: React.ComponentType;
        let requireExactPath = true;

        if (loadError) {
            // Show error screen
            rootComponent = ErrorPage;
        }
        else if (!isSaveChosen) {
            // Show file chooser.
            rootComponent = NoSaveLoadedPage
        }
        else if (isSaveLoading) {
            // Show loading screen.
            rootComponent = LoadingSaveFilePage;
        }
        else {
            // Show editor
            rootComponent = SaveEditorPage;
            requireExactPath = false;
        }

        return (
            <div className="fill-parent layout-vertical pt-dark ui-app-root">
                <Navbar className="layout-item ui-app-navbar">
                    <NavbarGroup>
                        <NavbarHeading>ONI Save Editor</NavbarHeading>
                        <Text ellipsize={true}>{saveFileName || ""}</Text>
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <Button icon={IconNames.FLOPPY_DISK} disabled={!isSaveEnabled} onClick={this._onSaveClick}>Save</Button>
                    </NavbarGroup>
                </Navbar>
                <div className="layout-item-fill">
                    <Switch>
                        <Route exact={requireExactPath} path="/" component={rootComponent}/>
                        <Redirect to="/"/>
                    </Switch>
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

    @autobind()
    private _onSaveClick() {
        this.props.saveSavefile({});
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);