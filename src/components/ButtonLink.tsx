import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import Button, { ButtonProps } from "@material-ui/core/Button";

export interface ButtonLinkProps
  extends Omit<ButtonProps, "href" | "component"> {
  to: string;
}

type Props = ButtonLinkProps & RouteComponentProps;
class ButtonLink extends React.Component<Props> {
  render() {
    const {
      children,
      history,
      location,
      to,
      staticContext,
      ...props
    } = this.props;
    return (
      <Button
        {...props}
        component="a"
        href={history.createHref({ pathname: to })}
        onClick={this._onClick}
      >
        {children}
      </Button>
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
      !isModifierEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      history.push(this.props.to);
    }
  };
}
export default withRouter(ButtonLink);

function isModifierEvent(event: React.MouseEvent<any>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
