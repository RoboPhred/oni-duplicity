
import * as React from "react";
import { autobind } from "core-decorators";
import { observer, Observer } from "mobx-react";
import { GeyserBehavior, getGeyserTypeName } from "oni-save-parser";

import { NonIdealState, Card, ICardProps } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { SaveEditorProps, withSaveEditor, GameObjectModel } from "@/services/save-editor";

import GameObjectGrid from "../../components/GameObjectGrid";
import GeyserEditor from "./components/GeyserEditor";

import "./style.scss";

type Props = SaveEditorProps;
interface State {
    selectedGeyser: GameObjectModel | null;
}
class GeysersPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedGeyser: null
        };
    }

    render() {
        const {
            selectedGeyser
        } = this.state;
        const {
            saveEditor
        } = this.props;

        const geysers = saveEditor.gameObjects.filter(isGeyser);

        if (geysers.length === 0) {
            return (
                <NonIdealState visual={IconNames.SEARCH_AROUND}>
                    <div>No geysers found.</div>
                    <div>Geysers are not spawned into the game until they are discovered.</div>
                </NonIdealState>
            );
        }

        let content: React.ReactFragment;
        if (selectedGeyser != null) {
            content = <GeyserEditor className="fill-parent" gameObject={selectedGeyser} />
        }
        else {
            content = (
                <NonIdealState visual={IconNames.SEARCH_AROUND}>
                    Select a geyser to edit
                </NonIdealState>
            );
        }

        return (
            <div className="ui-page ui-page-geysers fill-parent layout-vertical">
                <GameObjectGrid
                    className="layout-item ui-geyser-list"
                    gameObjects={geysers}
                    renderItem={this._renderGeyserGridItem}
                    onClick={this._onGeyserSelected}
                />
                <div className="layout-item-fill">
                    {content}
                </div>
            </div>
        );
    }

    @autobind()
    private _renderGeyserGridItem(gameObject: GameObjectModel): React.ReactChild {
        const geyserBehavior = gameObject.getBehavior(GeyserBehavior);
        const config = geyserBehavior && geyserBehavior.templateData.configuration;
        if (!config) {
            return <div className="ui-geyser-portrait">Undiscovered</div>;
        }

        const x = gameObject.position.x.toFixed();
        const y = gameObject.position.y.toFixed();

        return (
            <Observer>
                {() =>
                    <Card className="ui-geyser-portrait" interactive={true}>
                        <h5 className="ui-geyser-type">{getGeyserTypeName(config.typeId.hash)}</h5>
                        <div className="ui-geyser-position">({x}, {y})</div>
                    </Card>
                }
            </Observer>
        );
    }

    @autobind()
    private _onGeyserSelected(selectedGeyser: GameObjectModel) {
        this.setState(s => ({
            ...s,
            selectedGeyser
        }));
    }
}

export default withSaveEditor(GeysersPage);

function isGeyser(gameObject: GameObjectModel) {
    if (gameObject.type.startsWith("GeyserGeneric_")) return true;
    // TODO: ONI code also contains MethaneGeyser and ChlorineGeyser.
    //  I think these are left-over from the prototype geysers, but
    //  need to confirm this.
    return false;
}
