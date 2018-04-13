
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link, LinkProps } from "react-router-dom"
import { autobind } from "core-decorators";

export interface ActiveAwareLinkProps extends LinkProps {
    exact?: boolean;
}
type Props = ActiveAwareLinkProps & RouteComponentProps<{}>;
class ActiveAwareLink extends React.Component<Props> {
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
            return <span className={`pt-active pt-intent-primary ${className || ''}`}>{children}</span>;
        }

        return <Link to={to} className={`${className || ''}`} {...other} onClick={this._onClick}>{children}</Link>;
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
export default withRouter(ActiveAwareLink);