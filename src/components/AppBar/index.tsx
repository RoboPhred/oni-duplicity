
import * as React from "react";

import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

export interface SaveEditorAppBarProps {
    className?: string;
    currentSave?: string | null;
    saveEnabled: boolean;
    onSaveClicked: () => void;
}
export default class SaveEditorAppBar extends React.Component<SaveEditorAppBarProps> {
    render() {
        const {
            className,
            currentSave,
            saveEnabled,
            onSaveClicked
        } = this.props;
        return (
            <AppBar
                className={className}
                title={`ONI Save Editor${currentSave ? ": " + currentSave : ''}`}
                iconElementLeft={<div/>}
                iconElementRight={<FlatButton label="save" disabled={!saveEnabled} onClick={onSaveClicked}/>}
            />
        )
    }
}