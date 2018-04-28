
import { SiteGraph } from "@/site-graph";

import General from "./pages/General";
import Duplicants from "./pages/Duplicants";
import Geysers from "./pages/Geysers";


export const pageGraph: SiteGraph = [
    {
        type: "page",
        path: "/editor/general",
        name: "General",
        component: General
    },
    {
        type: "page",
        path: "/editor/duplicants",
        name: "Duplicants",
        component: Duplicants
    },
    {
        type: "page",
        path: "/editor/geysers",
        name: "Geysers",
        component: Geysers
    }
];
