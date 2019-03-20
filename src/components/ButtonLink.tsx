import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import Button, { ButtonProps } from "@material-ui/core/Button";

import { onLinkClick } from "./utils";

export interface ButtonLinkProps
  extends Omit<ButtonProps, "href" | "component"> {
  to: string;
}

type Props = ButtonLinkProps & RouteComponentProps;
class ButtonLink extends React.Component<Props> {
  render() {
    const { children, history, location, to, ...props } = this.props;
    return (
      <Button
        {...props}
        component="a"
        href={history.createHref({ pathname: to })}
        onClick={onLinkClick}
      >
        {children}
      </Button>
    );
  }
}
export default withRouter(ButtonLink);
