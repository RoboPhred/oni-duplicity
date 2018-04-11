
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link, LinkProps } from "react-router-dom"
import { autobind } from "core-decorators";

export interface MenuItemLinkProps extends LinkProps {
    exact?: boolean;
}
type Props = MenuItemLinkProps & RouteComponentProps<{}>;
class MenuItemLink extends React.Component<Props> {
    render() {
        const {
            to,
            location,
            children,
            onClick,
            className,
            exact,

            // Need to strip this out of passed props
            staticContext,
            ...other
        } = this.props
        const pathName = location.pathname;
        let match: boolean;
        
        if (exact) match = to === pathName;
        else match = pathName.startsWith(to.toString());

        if (match) {
            return <li><span className={`pt-menu-item pt-active pt-intent-primary ${className || ''}`}>{children}</span></li>;
        }

        return <li><Link to={to} className={`pt-menu-item ${className || ''}`} {...other} onClick={this._onClick}>{children}</Link></li>;
    }

    @autobind()
    private _onClick(event: React.MouseEvent<HTMLAnchorElement>) {
        const {
            exact,
            location,
            to,
            onClick
        } = this.props;
        const pathName = location.pathname;

        let match: boolean;
        if (exact) match = to === pathName;
        else match = pathName.startsWith(to.toString());

        if (match) {
            event.preventDefault();
            return;
        }

        if (onClick) {
            onClick(event);
        }
    }
}
export default withRouter(MenuItemLink);