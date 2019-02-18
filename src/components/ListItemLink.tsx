import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import ListItem, { ListItemProps } from "@material-ui/core/ListItem";

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
      staticContext,
      autoselect,
      ...props
    } = this.props;
    return (
      <ListItem
        selected={autoselect && location.pathname === to}
        {...props}
        component="a"
        href={history.createHref({ pathname: to })}
        onClick={this._onClick}
      >
        {children}
      </ListItem>
    );
  }

  private _onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Code copied from implementation of Link in react-router-dom
    const { onClick, target, history } = this.props;

    if (onClick) {
      onClick(event);
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      (!target || target === "_self") && // let browser handle "target=_blank" etc.
      !modifierKeyPressed(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      history.push(this.props.to);
    }
  };
}
export default withRouter(ListItemLink);

function modifierKeyPressed(event: React.MouseEvent<any>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
