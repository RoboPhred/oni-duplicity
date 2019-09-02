import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import ListItem from "@material-ui/core/ListItem";

import { onLinkClick } from "./utils";

export interface ListItemLinkProps {
  to: string;
  autoselect?: boolean;
  button?: boolean;
  disabled?: boolean;
}

type Props = ListItemLinkProps & RouteComponentProps;
class ListItemLink extends React.Component<Props> {
  private _onClick = onLinkClick.bind(this);

  render() {
    const {
      history,
      location,
      to,
      autoselect,
      button,
      disabled,
      children
    } = this.props;
    return (
      <ListItem
        selected={autoselect && pathStartsWith(location.pathname, to)}
        component="a"
        button={button as any} // typings are weird here.  `button` works fine, `button={true}` does not.
        href={history.createHref({ pathname: to })}
        disabled={disabled}
        onClick={this._onClick}
      >
        {children}
      </ListItem>
    );
  }
}
export default withRouter(ListItemLink);

function pathStartsWith(path: string, startsWith: string): boolean {
  if (path === startsWith) {
    return true;
  }

  return path.substr(0, startsWith.length + 1) === `${startsWith}/`;
}
