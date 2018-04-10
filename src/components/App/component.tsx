
import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Text,
    Button,
    Alignment
} from "@blueprintjs/core";

import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";

import NoSaveLoadedPage from "../../pages/NoSaveLoaded";
import LoadingSaveFilePage from "../../pages/LoadingSaveFile";
import EditorPage from "../../pages/Editor";


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
        if (!isSaveChosen) {
            // Show file chooser.
            rootComponent = NoSaveLoadedPage
        }
        else if (isSaveLoading) {
            // Show loading screen.
            rootComponent = LoadingSaveFilePage;
        }
        else if (loadError) {
            // Show error screen
            rootComponent = () => <div>
                <div>TODO error screen</div>
                <code>{loadError.stack}</code>
            </div>;
        }
        else {
            // Show editor
            rootComponent = EditorPage;
        }


        return (
            <div className="fill-parent">
                <Navbar>
                    <NavbarGroup>
                        <NavbarHeading>ONI Save Editor</NavbarHeading>
                        <Text ellipsize={true}>{saveFileName || ""}</Text>
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <Button icon="floppy-disk" disabled={!isSaveEnabled}>Save</Button>
                    </NavbarGroup>
                </Navbar>
                <Route path="/" component={rootComponent}/>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);