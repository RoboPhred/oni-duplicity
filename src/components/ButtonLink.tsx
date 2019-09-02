import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import Button, { ButtonProps } from "@material-ui/core/Button";

import { onLinkClick } from "./utils";

export interface ButtonLinkProps {
  className?: string;
  size?: ButtonProps["size"];
  title?: string;
  to: string;
  disabled?: boolean;
}

type Props = ButtonLinkProps & RouteComponentProps;

class ButtonLink extends React.Component<Props> {
  private _onClick = onLinkClick.bind(this);

  render() {
    const {
      className,
      size,
      title,
      history,
      to,
      disabled,
      children
    } = this.props;
    return (
      <Button
        className={className}
        size={size}
        title={title}
        component="a"
        href={history.createHref({ pathname: to })}
        disabled={disabled}
        onClick={this._onClick}
      >
        {children}
      </Button>
    );
  }
}
export default withRouter(ButtonLink);
