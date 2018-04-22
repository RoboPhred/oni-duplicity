
import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    EditableText,
    Button,
    Alignment,
    Icon
} from "@blueprintjs/core";

import { IconNames } from "@blueprintjs/icons";

import { SaveEditorProps, withSaveEditor } from "@/services/save-editor";

import "./style.scss";

import { AppNavBarProps } from "./props";

type Props = AppNavBarProps & SaveEditorProps;
@observer
class AppNavBar extends React.Component<Props> {
    private _input: HTMLElement | null = null;

    render() {
        const {
            className,
            saveEditor: {
                saveName,
                isSaveLoaded
            }
        } = this.props;

        return (
            <Navbar className={`ui-app-navbar ${className || ""}`}>
                <NavbarGroup>
                    <NavbarHeading>ONI Save Editor</NavbarHeading>
                        <EditableText
                            onConfirm={this._onRename}
                            disabled={!isSaveLoaded}
                            placeholder={!isSaveLoaded ? "No save loaded" : "Click to edit save name"}
                            value={saveName || ""}
                        />
                        {
                            isSaveLoaded ?
                                <span className="ui-savename-editbadge">
                                    <Icon
                                        icon={IconNames.EDIT}
                                        iconSize={10}
                                        title="Click on the save name to edit"
                                    />
                                </span>
                            : undefined
                        }
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button icon={IconNames.UPLOAD} onClick={this._onLoadClick}>Load</Button>
                    <Button icon={IconNames.FLOPPY_DISK} disabled={!isSaveLoaded} onClick={this._onSaveClick}>Save</Button>
                    <input
                        ref={el => this._input = el}
                        style={{ display: "none" }}
                        className="pt-button pt-intent-primary"
                        type="file"
                        accept=".sav"
                        onChange={this._onLoadFile}
                    />
                </NavbarGroup>
            </Navbar>
        );
    }

    @autobind()
    private _onSaveClick() {
        this.props.saveEditor.save();
    }

    @autobind()
    private _onLoadClick() {
        if (!this._input) return;
        this._input.click();
    }

    @autobind()
    private _onLoadFile(change: React.ChangeEvent<HTMLInputElement>) {
        const files = change.target.files;
        if (!files || files.length === 0) return;
        this.props.saveEditor.load(files[0]);
    }

    @autobind()
    private _onRename(name: string) {
        const { saveEditor } = this.props;
        saveEditor.renameSave(name);
    }
}
export default withSaveEditor(AppNavBar);
