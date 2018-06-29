import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import SaveStructureLink from "@/components/SaveStructureLink";

import mapStateToProps, { StateProps } from "./derived-state";

type Props = StateProps;
class SelectedPathBreadcrumb extends React.Component<Props> {
  render() {
    const { selectedPath } = this.props;

    let path: string[] = [];
    let elements: React.ReactChild[] = [];
    for (let i = 0; i < selectedPath.length; i++) {
      const isLast = i + 1 === selectedPath.length;
      const pathPart = selectedPath[i];

      path = [...path, pathPart];
      elements.push(
        <SaveStructureLink
          intent={isLast ? Intent.Primary : Intent.Default}
          key={path.join(".")}
          path={path}
        >
          {pathPart}
        </SaveStructureLink>
      );
      if (!isLast) {
        elements.push(".");
      }
    }

    return <span>{elements}</span>;
  }
}
export default connect(mapStateToProps)(SelectedPathBreadcrumb);
