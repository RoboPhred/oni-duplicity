
import * as React from "react";

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

import DupEditor from '../DupEditor';

type State = {
    saveFileName: string | null;
    save: OniSave | null;
    error?: Error | null;
};

export default class SaveEditor extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            saveFileName: null,
            save: null
        };
        this._onFileUploaded = this._onFileUploaded.bind(this);
    }

    render() {
        let frag: React.ReactFragment;

        if (this.state.error) {
            frag = (
                <div>
                    <div>Error: {this.state.error.message}</div>
                    <div><code>{this.state.error.stack}</code></div>
                </div>
            );
        } else if (!this.state.save) {
            frag = this._renderFileChooser();
        } else {
            frag = this._renderEditor();
        }

        return (
            <div className="fill-parent">
                {frag}
            </div>
        );
    }

    private _renderFileChooser(): React.ReactFragment {
        return (
            <div>
                <div>Choose a file</div>
                <div>
                    <input type="file" accept=".sav" onChange={this._onFileUploaded} />
                </div>
            </div>
        );
    }

    private _renderEditor(): React.ReactFragment {
        const minions = this.state.save!.body.gameState.gameObjects.get('Minion')!;

        const minionEditors: React.ReactFragment[] = minions.map((minion, i) => (
            <div key={i} className="layout-item">
                <DupEditor minion={minion} />
            </div>
        ));

        return (
            <div className="fill-parent layout-vertical">
                <div>
                    <button onClick={this._saveModifications}>Export Save</button>
                </div>
                <div className="layout-item-fill">
                    {minionEditors}
                </div>
            </div>
        );
    }

    private _onFileUploaded(event: React.ChangeEvent<HTMLInputElement>): void {
        const file = event.target!.files![0];
        const reader = new FileReader();
        reader.onload = () => this._parseSave(reader.result);
        reader.readAsArrayBuffer(file);
        this.setState(s => ({
            ...s,
            saveFileName: file.name
        }));
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

    @autobind()
    private _saveModifications() {
        if (!this.state.save) {
            return;
        }

        const data = writeOniSave(this.state.save);
        const blob = new Blob([data]);

        saveAs(blob, this.state.saveFileName || "my-file.sav");
    }
}
