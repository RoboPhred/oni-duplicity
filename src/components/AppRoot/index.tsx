
import * as React from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {
    saveAs
} from "file-saver";

import {
    OniSave,
    parseOniSave,
    writeOniSave
} from "oni-save-parser";

import {
    autobind
} from "core-decorators";

import SaveEditorAppBar from "../AppBar";
import SaveEditor from "../SaveEditor";

type State = {
    saveFileName: string | null;
    save: OniSave | null;
    error?: Error | null;
};

export default class AppRoot extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            saveFileName: null,
            save: null
        };
    }

    render() {
        const {
            saveFileName,
            error
        } = this.state;

        let frag: React.ReactFragment;

        if (error) {
            frag = (
                <div>
                    <div>Error: {error.message}</div>
                    <div><code>{error.stack}</code></div>
                </div>
            );
        } else if (!saveFileName) {
            frag = this._renderFileChooser();
        } else {
            frag = this._renderEditor();
        }

        return (
            <MuiThemeProvider>
                <div className="fill-parent layout-vertical">
                    <SaveEditorAppBar className="layout-item" currentSave={saveFileName} saveEnabled={saveFileName != null} onSaveClicked={this._onSave}/>
                    <div className="layout-item-fill">
                        {frag}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    private _renderFileChooser(): React.ReactFragment {
        return (
            <div>
                <div>Choose a file</div>
                <div>
                    <input type="file" accept=".sav" onChange={this._onLoad} />
                </div>
            </div>
        );
    }

    private _renderEditor(): React.ReactFragment {
        const {
            save
        } = this.state;

        if (!save) {
            return <div>Error: No save loaded</div>;
        }

        return (
            <SaveEditor className="fill-parent" save={save}/>
        )
    }

    @autobind()
    private _onLoad(event: React.ChangeEvent<HTMLInputElement>): void {
        const file = event.target!.files![0];
        const reader = new FileReader();
        reader.onload = () => this._parseSave(reader.result);
        reader.readAsArrayBuffer(file);
        this.setState(s => ({
            ...s,
            saveFileName: file.name
        }));
    }

    @autobind()
    private _onSave() {
        if (!this.state.save) {
            return;
        }

        const data = writeOniSave(this.state.save);
        const blob = new Blob([data]);

        saveAs(blob, this.state.saveFileName || "my-file.sav");
    }

    private _parseSave(data: ArrayBuffer): void {
        try {
            const save = parseOniSave(data);
            this.setState(s => ({
                ...s,
                save
            }));
        } catch (e) {
            this.setState(s => ({
                error: e
            }));
        }
    }
}
