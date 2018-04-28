
import { SiteGraph } from "@/site-graph";

import General from "./pages/General";
import Duplicants, { pageGraph as duplicantsPageGraph } from "./pages/Duplicants";
import Geysers from "./pages/Geysers";


export const pageGraph: SiteGraph = [
    {
        type: "page",
        path: "/editor/general",
        name: "General",
        component: General
    },
    {
        // TODO: Update components to take params
        type: "page",
        path: "/editor/duplicants", // "/editor/duplicants/:prefabId",
        name: "Duplicants",
        component: Duplicants,
        //children: duplicantsPageGraph
    },
    {
        type: "page",
        path: "/editor/geysers",
        name: "Geysers",
        component: Geysers
    }
];
