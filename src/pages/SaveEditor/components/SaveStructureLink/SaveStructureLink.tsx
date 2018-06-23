import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import styled from "styled-components";

import { SaveStructureLinkProps } from "./props";
import mapDispatchToProps, { DispatchProps } from "./events";

type Props = SaveStructureLinkProps & DispatchProps;
class SaveStructureLink extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return <Link onClick={this._onClick}>{children}</Link>;
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

const Link = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;
