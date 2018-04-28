
import * as React from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router-dom";

import Page404 from "../../pages/404";

import { SiteGraph, SitePage, SiteGraphEntry } from "../interfaces";

export interface SiteSwitchProps {
    siteGraph: SiteGraph;
}

type Props = SiteSwitchProps & RouteComponentProps<any>;
class SiteSwitch extends React.Component<Props> {
    render() {
        const { children } = this.props;
        const routes = this._renderRoutes();
        return (
            <Switch>
                {routes}
                {children}
                <Route component={Page404}/>
            </Switch>
        );
    }

    private _renderRoutes(): React.ReactChild[] {
        const { siteGraph } = this.props;
        return siteGraph.filter(isSitePage).map(x => this._renderPage(x));
    }

    private _renderPage(page: SitePage): React.ReactChild {
        let children: React.ReactChild | undefined = undefined;
        if (page.subEntries) {
            children = <SiteSwitchWithRouter siteGraph={page.subEntries}/>
        }
        return (
            <Route
                key={page.name}
                exact={!children}
                path={page.path}
                render={props => <page.component {...props} children={children} />}
            />
        )
    }
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
