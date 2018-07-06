import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";

import { Intent } from "@/theme";

import Text from "@/components/Text";
import SaveStructureLink from "@/components/SaveStructureLink";

type Props = StateProps;
class SelectedPathBreadcrumb extends React.Component<Props> {
  render() {
    const { breadcrumb } = this.props;
    let links: React.ReactNode[] = [];
    for (let i = 0; i < breadcrumb.length; i++) {
      let isFinal = i + 1 === breadcrumb.length;
      const x = breadcrumb[i];
      const key = x.path.join(".");
      links.push(
        <SaveStructureLink
          intent={isFinal ? Intent.Primary : Intent.Secondary}
          key={key}
          path={x.path}
        >
          {x.title}
        </SaveStructureLink>
      );
      if (!isFinal) {
        links.push(<Text key={`${key}:sep`}>{" > "}</Text>);
      }
    }
    return <div>{links}</div>;
  }
}
export default connect(mapStateToProps)(SelectedPathBreadcrumb);
