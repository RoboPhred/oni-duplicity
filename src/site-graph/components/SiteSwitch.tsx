
import * as React from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router-dom";

import Page404 from "../../pages/404";

import { SiteGraph, SitePage, SiteGraphEntry, SitePath } from "../interfaces";

export interface SiteSwitchProps {
    siteGraph: SiteGraph;
}

type Props = SiteSwitchProps & RouteComponentProps<any>;
class SiteSwitch extends React.Component<Props> {
    render() {
        const { siteGraph, children } = this.props;
        const routes = this._renderRoutes(siteGraph);
        return (
            <Switch>
                {routes}
                {children}
                <Route component={Page404}/>
            </Switch>
        );
    }

    private _renderRoutes(entries: SiteGraphEntry[]): React.ReactChild[] {
        return collectRouteEntries(entries).map(x => {
            switch(x.type) {
                case "page":
                    return this._renderPage(x);
                case "path":
                    return this._renderPath(x);
            }
        });
    }

    private _renderPage(page: SitePage): React.ReactChild {
        let children: React.ReactChild | undefined = undefined;
        if (page.children) {
            children = <SiteSwitchWithRouter siteGraph={page.children}/>
        }
        return (
            <Route
                key={page.path}
                exact={!children}
                path={page.path}
                render={props => <page.component {...props} children={children} />}
            />
        );
    }

    private _renderPath(path: SitePath): React.ReactChild {
        // TODO: Good place to support index path.
        //  If index enabled, first item is <Redirect exact path={path.path} to={path.indexPath}/>
        return (
            <React.Fragment key={path.path}>
                {this._renderRoutes(path.children)}
            </React.Fragment>
        );
    }
}

function collectRouteEntries(graph: SiteGraph): (SitePage | SitePath)[] {
    const elements: (SitePage | SitePath)[] = [];
    for (let entry of graph) {
        switch(entry.type) {
            case "page":
            case "path":
                elements.push(entry);
                break;
            case "group":
                elements.push(...collectRouteEntries(entry.children));
        }
    }
    return elements;
}

const SiteSwitchWithRouter = withRouter(SiteSwitch);
export default SiteSwitchWithRouter;

/*
Error:
A type predicate's type must be assignable to its parameter's type.
  Type 'SitePage' is not assignable to type 'T'.
*/
function isSitePage(x: SiteGraphEntry): x is SitePage {
    return x.type === "page";
}
