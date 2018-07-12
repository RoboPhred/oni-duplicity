import * as React from "react";

import SaveStructureTreeContainer from "./components/SaveStructureTreeContainer";
import SaveStructureItem from "./components/SaveStructureItem";

type Props = {};
export default class SaveStructureTree extends React.Component<Props> {
  private _containerRef = React.createRef<HTMLElement>();

  render() {
    return (
      <SaveStructureTreeContainer innerRef={this._containerRef}>
        <SaveStructureItem
          saveItemPath={[]}
          scrollContainer={this._containerRef}
        />
      </SaveStructureTreeContainer>
    );
  }
}
