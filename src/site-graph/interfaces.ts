import { RouteComponentProps } from "react-router-dom";


export interface SitePage {
    type: "page";
    name: string;
    path: string;

    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    
    /**
     * Additional nav groups or pages contained in
     * this page.
     */
    subEntries?: SiteGraphEntry[];

    /**
     * If sub entries are present, whether the sub entry items for this page
     * should collapse when not active.
     * Default: ```false```.
     */
    navMenuCollapse?: boolean;
}

export interface NavGroup {
    type: "group";
    name?: string;
    entries: SiteGraphEntry[];
}

export type SiteGraphEntry = SitePage | NavGroup;
export type SiteGraph = SiteGraphEntry[];