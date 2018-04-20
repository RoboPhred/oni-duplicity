
import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

import {
    NonIdealState,
    Button,
    Intent
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";


import { SaveEditorProps, withSaveEditor } from "@/services/save-editor";


const saveDescription = "Oxygen Not Included saves can be found in your documents folder under";
// TODO: Show correct path based on user's OS.
const savePath = "Klei/OxygenNotIncluded/save_files";

type Props = SaveEditorProps;
@observer
class NoSaveLoadedPageComponent extends React.Component<Props> {
    private _input: HTMLInputElement | null = null;
    
    render() {
        return (
            <NonIdealState
                visual={IconNames.FLOPPY_DISK}
                action={
                    <Button intent={Intent.PRIMARY} onClick={this._onLoadClick}>Load a .sav file</Button>
                }
                description="No save has been loaded."
            >
                <div>{saveDescription} <code>{savePath}</code></div>
                <input
                    ref={el => this._input = el}
                    style={{display: "none"}}
                    className="pt-button pt-intent-primary"
                    type="file"
                    accept=".sav"
                    onChange={this._onLoadFile}
                />
            </NonIdealState>
        );
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
}
export default withSaveEditor(NoSaveLoadedPageComponent);
