
import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

import { GameObjectModel } from "@/services/save-editor";

import DuplicantPortrait from "../DuplicantPortrait";

import "./style.scss";

export interface DuplicantsListProps {
    className?: string;
    duplicants: GameObjectModel[];
    selectedDuplicant?: number | GameObjectModel | null;
    onDuplicantClick?(duplicant: GameObjectModel): void;
}

type Props = DuplicantsListProps;
@observer
class DuplicantsList extends React.Component<Props> {
    render() {
        const {
            className,
            duplicants
        } = this.props;

        let selectedDuplicant = this.props.selectedDuplicant;
        if (typeof selectedDuplicant === "number") {
            selectedDuplicant = duplicants.find(x => x.kPrefabID === selectedDuplicant);
        }

        const elements = duplicants.map(x => <DuplicantPortrait key={x.kPrefabID} className={x === selectedDuplicant ? "pt-active" : ""} duplicant={x} onClick={this._onDuplicantClick} />);

        return (
            <div className={`${className || ''} ui-duplicant-list`}>
                <div className={`fill-parent layout-horizontal layout-wrap container-scroll`}>
                    {elements}
                </div>
            </div>
        );
    }

    @autobind()
    private _onDuplicantClick(duplicant: GameObjectModel) {
        const {
            onDuplicantClick
        } = this.props;

        if (onDuplicantClick) {
            onDuplicantClick(duplicant);
        }
    }
}
export default DuplicantsList;
