import * as React from "react";

import { SaveGame } from "oni-save-parser";

import SaveStructureContainer from "./components/SaveStructureContainer";
import SaveStructureItem from "./components/SaveStructureItem";
import { autobind } from "core-decorators";

export interface SaveStructureProps {
  saveGame: SaveGame;
  onSelected(path: string[]): void;
}
type Props = SaveStructureProps;
export default class SaveStructure extends React.Component<Props> {
  render() {
    const { saveGame } = this.props;
    return (
      <SaveStructureContainer>
        <SaveStructureItem
          propKey="SaveGame"
          propValue={saveGame}
          onSelected={this._onSavePropSelected}
        />
      </SaveStructureContainer>
    );
  }

  @autobind()
  private _onSavePropSelected(path: string[]) {
    const { onSelected } = this.props;
    onSelected(path.slice(1));
  }
}
