import { RouteComponentProps } from "react-router";

export interface LinkProps extends RouteComponentProps {
  to: string;
  target?: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}
export function onLinkClick(
  this: React.Component<LinkProps>,
  event: React.MouseEvent<HTMLElement>
) {
  // Code copied from implementation of Link in react-router-dom
  const { onClick, target, history } = this.props;

  if (onClick) {
    onClick(event);
  }

  if (
    !event.defaultPrevented && // onClick prevented default
    event.button === 0 && // ignore everything but left clicks
    (!target || target === "_self") && // let browser handle "target=_blank" etc.
    !isModifierPressed(event) // ignore clicks with modifier keys
  ) {
    event.preventDefault();

    history.push(this.props.to);
  }
}

function isModifierPressed(event: React.MouseEvent<any>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
