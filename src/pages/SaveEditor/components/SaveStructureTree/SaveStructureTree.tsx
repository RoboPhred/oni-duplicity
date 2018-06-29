import * as React from "react";

import SaveStructureContainer from "./components/SaveStructureContainer";
import SaveStructureItem from "./components/SaveStructureItem";

type Props = {};
export default class SaveStructureTree extends React.Component<Props> {
  render() {
    return (
      <SaveStructureContainer>
        <SaveStructureItem saveItemPath={[]} />
      </SaveStructureContainer>
    );
  }
}
