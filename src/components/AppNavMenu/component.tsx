
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import {
    MenuDivider
} from "@blueprintjs/core";

import ActiveAwareLink from "../ActiveAwareLink";

import { AppNavMenuProps } from "./props";
import { NavMenuEntry } from "./interfaces";
import { autobind } from "core-decorators";

class AppNavMenu extends React.Component<AppNavMenuProps & RouteComponentProps<any>> {
    render() {
        const {
            className,
            entries
        } = this.props;

        const links = this._renderEntries(entries);
        return (
            <div className={`ui-nav-menu ${className || ""}`}>
                {links}
            </div>
        );
    }

    private _renderEntries(entries: NavMenuEntry[], key?: any): React.ReactChild[] {
        key = key ? String(key) + "-" : "";

        const fragments: React.ReactChild[] = [];
        let previousWasGroup = false;

        entries.forEach((entry, i) => {
            const rendered = this._renderEntry(entry, key + i);
            if (!rendered) return;
            
            if (previousWasGroup) {
                fragments.push(<MenuDivider key={key + (i - 1) + "-divider"}/>)
            }

            if (Array.isArray(rendered)) {
                fragments.push(...rendered);
                previousWasGroup = true;
            }
            else {
                fragments.push(rendered);
            }
        });

        return fragments;
    }

    private _renderEntry(entry: NavMenuEntry, key: any): React.ReactChild | React.ReactChild[] {
        switch(entry.type) {
            case "group": {
                const rendered = this._renderEntries(entry.entries, key);
                if (entry.name) {
                    rendered.unshift(
                        <div key={`${key}-header`} className="pt-menu-header"><h6>{entry.name}</h6></div>
                    );
                }
                return rendered;
            }
            case "link": {
                const pathName = this.props.location.pathname;
                const {
                    name,
                    path,
                    subEntries
                } = entry;
                const primaryLink = <ActiveAwareLink key={key} exact={subEntries != null} className="pt-menu-item" to={path}>{name}</ActiveAwareLink>;
                if (!subEntries || !matchPartialPath(pathName, path)) {
                    return primaryLink;
                }
                else {
                    return [
                        primaryLink,
                        <ul key={`${key}-list`}>
                            {this._renderEntries(subEntries).map((x, i) => <li key={`${key}-${i}`}>{x}</li>)}
                        </ul>
                    ];
                }
            }
            default: 
                return throwUnknownMenuEntry(entry);
        }
    }
}
export default withRouter(AppNavMenu);

function throwUnknownMenuEntry(entry: never): never {
    throw new Error(`Unknown entry type "${(entry as NavMenuEntry).type}".`);
}


function matchPartialPath(pathName: string, to: string): boolean {
    if (pathName === to) return true;

    if (!pathName.startsWith(to)) return false;

    // Need to make sure we matched up to a path seperator.
    if (pathName[to.length] !== '/') return false;
    return true;
}
