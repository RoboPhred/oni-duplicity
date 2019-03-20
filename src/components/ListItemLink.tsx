import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import ListItem, { ListItemProps } from "@material-ui/core/ListItem";

import { onLinkClick } from "./utils";

export interface ListItemLinkProps
  extends Omit<ListItemProps, "href" | "component"> {
  to: string;
  autoselect?: boolean;
}

type Props = ListItemLinkProps & RouteComponentProps;
class ListItemLink extends React.Component<Props> {
  render() {
    const {
      children,
      history,
      location,
      to,
      autoselect,
      ...props
    } = this.props;
    return (
      <ListItem
        selected={autoselect && pathStartsWith(location.pathname, to)}
        {...props}
        component="a"
        href={history.createHref({ pathname: to })}
        onClick={onLinkClick}
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
