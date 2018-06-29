import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import styled from "styled-components";

import { LinkProps, link } from "@/theme";

import { SaveStructureLinkProps } from "./props";
import mapDispatchToProps, { DispatchProps } from "./events";

type Props = SaveStructureLinkProps & DispatchProps;
class SaveStructureLink extends React.Component<Props> {
  render() {
    const { intent, children } = this.props;
    return (
      <Link intent={intent} onClick={this._onClick}>
        {children}
      </Link>
    );
  }

  @autobind()
  private _onClick() {
    const { path, onClick } = this.props;
    onClick(path);
  }
}
export default connect(
  null,
  mapDispatchToProps
)(SaveStructureLink);

const Link = styled<LinkProps, "span">("span")`
  ${link};
`;
