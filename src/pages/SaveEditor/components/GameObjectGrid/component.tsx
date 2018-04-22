
import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";

import { GameObjectModel } from "@/services/save-editor";

export interface GameObjectGridProps {
    className?: string;
    gameObjects: GameObjectModel[];
    onClick?(gameObject: GameObjectModel): void;
    renderItem: (gameObject: GameObjectModel) => React.ReactChild;
}

@observer
export default class GameObjectGrid extends React.Component<GameObjectGridProps> {
    render() {
        const {
            className,
            gameObjects,
            renderItem
        } = this.props;

        const elements = gameObjects.map(x => <GameObjectGridElement key={x.kPrefabID} gameObject={x} onClick={this._onItemClick} renderItem={renderItem}/>);
        return (
            <div className={`${className || ''} ui-gameobject-grid`}>
                <div className={`fill-parent layout-horizontal layout-wrap container-scroll`}>
                    {elements}
                </div>
            </div>
        );
    }

    @autobind()
    private _onItemClick(gameObject: GameObjectModel) {
        const { onClick } = this.props;
        if (onClick) onClick(gameObject);
    }
}

interface GameObjectGridElementProps {
    gameObject: GameObjectModel;
    renderItem(gameObject: GameObjectModel): React.ReactChild;
    onClick(gameObject: GameObjectModel): void;
}
class GameObjectGridElement extends React.Component<GameObjectGridElementProps> {
    render() {
        const {gameObject, renderItem, onClick} = this.props;
        return <div onClick={onClick.bind(null, gameObject)}>{renderItem(gameObject)}</div>;
    }
}
