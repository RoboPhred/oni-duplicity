
import { SitePage } from "@/site-graph";

import App from "../components/App";
import SaveEditor, { pageGraph as saveEditorPages } from "../pages/SaveEditor";
import ChangeLog from "../pages/Changelog";

const siteGraph: SitePage = {
    type: "page",
    name: "Duplicity",
    path: "/",
    component: App,
    subEntries: [
        {
            // Save Editor
            type: "page",
            path: "/editor",
            name: "Save Editor",
            component: SaveEditor,
            navMenuCollapse: true,
            subEntries: saveEditorPages
        },
        {
            type: "page",
            path: "/changelog",
            name: "Duplicity Changelog",
            component: ChangeLog
        }
    ]
};

export default siteGraph;
