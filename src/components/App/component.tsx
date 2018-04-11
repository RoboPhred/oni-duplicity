
import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router";

import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Text,
    Button,
    Alignment,

    // FIXME: direct color access.  Use CSS.
    //  Need to use sass to pull values out of blueprintjs
    Colors
} from "@blueprintjs/core";

import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";

import ErrorPage from "../../pages/error";
import NoSaveLoadedPage from "../../pages/NoSaveLoaded";
import LoadingSaveFilePage from "../../pages/LoadingSaveFile";
import EditorPage from "../../pages/Editor";

const style_container: React.CSSProperties = {
    background: Colors.DARK_GRAY1
};

const style_navbar: React.CSSProperties = {
    background: Colors.COBALT3
};

type OwnProps = StateProps & DispatchProps;
class AppComponent extends React.Component<OwnProps> {
    render() {
        const {
            saveFileName,
            isSaveEnabled,
            isSaveChosen,
            isSaveLoading,
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
            rootComponent = EditorPage;
            requireExactPath = false;
        }


        return (
            <div style={style_container} className="pt-dark fill-parent layout-vertical">
                <Navbar style={style_navbar} className="layout-item">
                    <NavbarGroup>
                        <NavbarHeading>ONI Save Editor</NavbarHeading>
                        <Text ellipsize={true}>{saveFileName || ""}</Text>
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <Button icon="floppy-disk" disabled={!isSaveEnabled}>Save</Button>
                    </NavbarGroup>
                </Navbar>
                <div className="layout-item-fill">
                    <Switch>
                        <Route exact={requireExactPath} path="/" component={rootComponent}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);