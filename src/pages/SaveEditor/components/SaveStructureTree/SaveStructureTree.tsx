import * as React from "react";

import SaveStructureTreeContainer from "./components/SaveStructureTreeContainer";
import SaveStructureItem from "./components/SaveStructureItem";

type Props = {};
export default class SaveStructureTree extends React.Component<Props> {
  render() {
    return (
      <SaveStructureTreeContainer>
        <SaveStructureItem saveItemPath={[]} />
      </SaveStructureTreeContainer>
    );
  }
}
