import { RouteComponentProps } from "react-router-dom";

export interface NavMenuItem {
    /**
     * The fallback name to use for the NavMenu, if navMenu is true and not a string.
     * This is usually present for other constructs, such as the display name for
     * a page or path.
     */
    name?: string;
    
    /**
     * Whether or not this item should generate a nav menu.
     * If set to a string, a nav menu will be generated and named
     * by the string.
     */
    navMenu: boolean | string;
    navMenuCollapse?: boolean;
}
type Optional<T> = Partial<T>;

export interface SitePage extends Optional<NavMenuItem> {
    type: "page";
    name: string;
    path: string;

    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    
    /**
     * Additional nav groups or pages contained in
     * this page.
     */
    children?: SiteGraphEntry[];
}

export interface SitePath extends Optional<NavMenuItem> {
    type: "path",
    name?: string;
    path: string;
    children: SiteGraphEntry[];
}

/**
 * A group of related items.  The items will be rendered
 * by the first non-group ancestor.
 */
export interface NavGroup extends NavMenuItem {
    type: "group";
    children: SiteGraphEntry[];
}

export type SiteGraphEntry = SitePage | SitePath | NavGroup;
export type SiteGraph = SiteGraphEntry[];