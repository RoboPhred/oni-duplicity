
import { SiteGraph } from "@/site-graph";

import General from "./pages/General";
import Appearance from "./pages/Appearance";
import Effects from "./pages/Effects";
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";
import Traits from "./pages/Traits";


export const pageGraph: SiteGraph = [
    {
        type: "page",
        path: "/editor/duplicants/:prefabId/general",
        name: "General",
        component: General
    },
    {
        type: "page",
        path: "/editor/duplicants/:prefabId/appearance",
        name: "Appearance",
        component: Appearance
    },
    {
        type: "page",
        path: "/editor/duplicants/:prefabId/skills",
        name: "Skills",
        component: Skills
    },
    {
        type: "page",
        path: "/editor/duplicants/:prefabId/traits",
        name: "Traits",
        component: Traits
    },
    {
        type: "page",
        path: "/editor/duplicants/:prefabId/jobs",
        name: "Jobs",
        component: Jobs
    },
    {
        type: "page",
        path: "/editor/duplicants/:prefabId/effects",
        name: "Effects",
        component: Effects
    },
];
