
import * as React from "react";

import {
    autobind
} from "core-decorators";

import Paper from "material-ui/Paper";

import {
    OniSave,
    GameObject
} from "oni-save-parser";


import {
    getBehavior,
    MinionIdentityBehavior,
    MinionResumeBehavior
} from "../../../../../behaviors";

import DuplicantEditor from "../DuplicantEditor";


const style_portrait: React.CSSProperties = {
    position: "relative",
    width: 150,
    height: 150,
    margin: 10,
    textAlign: "center",
    cursor: "pointer"
};

const style_portrait_container: React.CSSProperties = {
    boxSizing: "border-box",
    // Room for 2 portraits and their margins
    height: 150*2 + 10*4
}
const style_portrait_title: React.CSSProperties = {
    padding: 5
};

const style_portrait_role: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center"
};


export interface SaveEditorProps {
    save: OniSave;
}

interface State {
    selectedMinion: GameObject | null;
}

export default class DupEditorPage extends React.Component<SaveEditorProps, State> {

    constructor(props: SaveEditorProps) {
        super(props);
        this.state = {
            selectedMinion: null
        };
    }

    render() {
        const {
            save,
        } = this.props;

        const {
            selectedMinion
        } = this.state;

        const minions = save.body.gameState.gameObjects.get('Minion');
        if (!minions) {
            return <div>Error: No Minion game object data in save file.</div>
        }


        const minionPortraits = minions.map((minion, i) => (
            <div key={i} className="layout-item">
                {this._renderMinionPortrait(minion)}
            </div>
        ));

        return (
            <div className="fill-parent layout-vertical">
                <div style={style_portrait_container} className="layout-horizontal layout-wrap scrolling-content">
                    {minionPortraits}
                </div>
                <div className="layout-item-constrain scrolling-content">
                    {selectedMinion ? <DuplicantEditor minion={selectedMinion} /> : undefined}
                </div>
            </div>
        );
    }

    private _renderMinionPortrait(minion: GameObject): React.ReactFragment {
        return <MinionPortrait minion={minion} onClick={this._selectMinion} />;
    }

    @autobind()
    private _selectMinion(minion: GameObject) {
        this.setState(s => ({
            ...s,
            selectedMinion: minion
        }));
    }
}


interface MinionPortraitProps {
    minion: GameObject;
    onClick(minion: GameObject): void;
}
class MinionPortrait extends React.Component<MinionPortraitProps> {
    render() {
        const {
            minion
        } = this.props;

        const identity = getBehavior(minion, MinionIdentityBehavior);
        const name = identity ? identity.parsedData.name : "<NO-IDENTITY>";
        const resume = getBehavior(minion, MinionResumeBehavior);
        const role = resume ? resume.parsedData.currentRole : "<NO-ROLE>";

        return (
            <Paper style={style_portrait} onClick={this._onClick}>
                <div style={style_portrait_title}>{name}</div>
                {/* TODO render a picture.  Plenty of data in identity to do so. */}
                <div style={style_portrait_role}>{role}</div>
            </Paper>
        );
    }

    @autobind()
    private _onClick() {
        const {
            minion,
            onClick
        } = this.props;
        onClick(minion);
    }
}