import * as React from "react";
import { connect } from "react-redux";

import SaveStructureLink from "@/pages/SaveEditor/components/SaveStructureLink";

import mapStateToProps, { StateProps } from "./derived-state";

type Props = StateProps;
class SelectedPathBreadcrumb extends React.Component<Props> {
  render() {
    const { selectedPath } = this.props;

    let path: string[] = [];
    let elements: React.ReactChild[] = [];
    for (const pathPart of selectedPath) {
      // Create a new path at each juncture so that the data is not mutated.
      path = [...path, pathPart];
      elements.push(
        <SaveStructureLink key={path.join(".")} path={path}>
          {pathPart}
        </SaveStructureLink>
      );
      elements.push(".");
    }
    if (elements.length > 0) {
      // Remove final seperator dot.
      elements.pop();
    }

    return <span>{elements}</span>;
  }
}
export default connect(mapStateToProps)(SelectedPathBreadcrumb);
