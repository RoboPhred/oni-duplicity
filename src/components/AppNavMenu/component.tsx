
import * as React from "react";
import { autobind } from "core-decorators";
import { RouteComponentProps, withRouter } from "react-router";

import {
    MenuDivider
} from "@blueprintjs/core";

import ActiveAwareLink from "../ActiveAwareLink";

import { SiteGraph, SiteGraphEntry } from "@/site-graph";

import "./style.scss";

export interface AppNavMenuProps {
    className?: string;
    siteGraph: SiteGraph;
}

class AppNavMenu extends React.Component<AppNavMenuProps & RouteComponentProps<any>> {
    render() {
        const {
            className,
            siteGraph
        } = this.props;

        const links = this._renderLinks(siteGraph);
        return (
            <div className={`ui-nav-menu ${className || ""}`}>
                {links}
            </div>
        );
    }

    private _renderLinks(entries: SiteGraph, key?: any): React.ReactChild[] {
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
                previousWasGroup = rendered.length > 0;
            }
            else {
                fragments.push(rendered);
            }
        });

        return fragments;
    }

    private _renderEntry(entry: SiteGraphEntry, key: any): React.ReactChild | React.ReactChild[] {
        switch(entry.type) {
            case "path":
            case "group": {
                const rendered = this._renderLinks(entry.children, key);
                const menuName = entry.navMenu && (entry.navMenu === "string" && entry.navMenu) || entry.name;
                if (menuName && menuName !== "") {
                    rendered.unshift(
                        <div key={`${key}-header`} className="pt-menu-header"><h6>{menuName}</h6></div>
                    );
                }
                return rendered;
            }
            case "page": {
                const pathName = this.props.location.pathname;
                const {
                    name,
                    path,
                    children,
                    navMenuCollapse
                } = entry;
                const primaryLink = <ActiveAwareLink key={key} exact={children != null} className="pt-menu-item" to={path}>{name}</ActiveAwareLink>;
                if (!children || (navMenuCollapse && !matchPartialPath(pathName, path))) {
                    return primaryLink;
                }
                else {
                    return [
                        primaryLink,
                        <ul key={`${key}-list`}>
                            {this._renderLinks(children).map((x, i) => <li key={`${key}-${i}`}>{x}</li>)}
                        </ul>
                    ];
                }
            }
            default: 
                return throwUnknownSiteGraphType(entry);
        }
    }
}
export default withRouter(AppNavMenu);

function throwUnknownSiteGraphType(entry: never): never {
    throw new Error(`Unknown entry type "${(entry as SiteGraphEntry).type}".`);
}


function matchPartialPath(pathName: string, to: string): boolean {
    if (pathName === to) return true;

    if (!pathName.startsWith(to)) return false;

    // Need to make sure we matched up to a path seperator.
    if (pathName[to.length] !== '/') return false;
    return true;
}
