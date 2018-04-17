
import * as React from "react";

import {
    MenuDivider
} from "@blueprintjs/core";

import ActiveAwareLink from "../ActiveAwareLink";

import { AppNavMenuProps } from "./props";

class AppNavMenu extends React.Component<AppNavMenuProps> {
    render() {
        const {
            className,
            entries
        } = this.props;

        const links = entries.map((entry, i) => (
            <ActiveAwareLink key={i} className="pt-menu-item" to={entry.path}>{entry.name}</ActiveAwareLink>
        ));
        return (
            <div className={`ui-nav-menu ${className || ""}`}>
                {links}
                { links.length > 0 ? <MenuDivider /> : undefined }
                <ActiveAwareLink className="pt-menu-item" to="/changelog" >Duplicity Changelog</ActiveAwareLink>
            </div>
        );
    }
}
export default AppNavMenu;
