import * as React from "react";

import { SaveGame } from "oni-save-parser";

import SaveStructureContainer from "./components/SaveStructureContainer";
import SaveStructureItem from "./components/SaveStructureItem";

type Props = {};
export default class SaveStructure extends React.Component<Props> {
  render() {
    return (
      <SaveStructureContainer>
        <SaveStructureItem saveItemPath={[]} />
      </SaveStructureContainer>
    );
  }
}
