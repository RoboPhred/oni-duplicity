
import * as React from "react";
import { observer } from "mobx-react";

import {
    Card,
    Elevation,
    Menu,
    MenuDivider
} from "@blueprintjs/core";

import { withSaveEditor, SaveEditorProps } from "@/services/save-editor";

import NoSaveLoadedPage from "./components/NoSaveLoaded";
import LoadingSaveFilePage from "./components/LoadingSaveFile";


import ErrorPage from "../Error";

type Props = SaveEditorProps;
@observer
class SaveEditorPageComponent extends React.Component<Props> {
    render() {
        const {
            saveEditor: {
                loadError,
                isSaveLoading,
                isSaveLoaded
            },
            children
        } = this.props;

        let rootComponent: React.ReactChild;

        if (loadError) {
            // Show error screen
            return <ErrorPage error={loadError} />;
        }
        else if (isSaveLoading) {
            return <LoadingSaveFilePage />;
        }
        else if (!isSaveLoaded) {
            return <NoSaveLoadedPage />
        }

        return (
            <div className="ui-page ui-page-saveeditor fill-parent">
                {children}
            </div>
        )
    }
}
export default withSaveEditor(SaveEditorPageComponent);