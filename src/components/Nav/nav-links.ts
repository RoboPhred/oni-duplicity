export interface NavItem {
  name: string;
  path: string;
  i18nKey: string;
  saveRequired?: boolean;
}

const NavItems: NavItem[] = [
  {
    name: "Overview",
    path: "/",
    i18nKey: "overview-page.title"
  },
  {
    name: "Duplicants",
    path: "/duplicants",
    i18nKey: "duplicant.noun_titlecase_plural",
    saveRequired: true
  },
  {
    name: "Geysers",
    path: "/geysers",
    i18nKey: "geyser.noun_titlecase_plural",
    saveRequired: true
  },
  {
    name: "Materials",
    path: "/materials",
    i18nKey: "material.noun_titlecase_plural",
    saveRequired: true
  },
  {
    name: "Raw Editor",
    path: "/raw",
    i18nKey: "raw-editor-page.title",
    saveRequired: true
  }
];

export default NavItems;
