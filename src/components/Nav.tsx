import * as React from "react";

import { Trans } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import AbstractLoadStatus from "@/services/oni-save/components/AbstractLoadStatus";

import ListItemLink from "@/components/ListItemLink";
import { LoadingStatus } from "@/services/oni-save/state";

interface NavItem {
  name: string;
  path: string;
  i18nKey: string;
  saveRequired?: boolean;
}

const NAV_ITEMS: NavItem[] = [
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

const Nav: React.SFC = () => (
  <AbstractLoadStatus>
    {({ status }) => {
      const disableSaveRequired = status !== LoadingStatus.Ready;
      return (
        <List component="nav">
          {NAV_ITEMS.map(({ name, path, i18nKey, saveRequired }) => (
            <ListItemLink
              key={name}
              button
              to={path}
              autoselect
              disabled={saveRequired ? disableSaveRequired : false}
            >
              <ListItemText>
                <Trans i18nKey={i18nKey}>{name}</Trans>
              </ListItemText>
            </ListItemLink>
          ))}
        </List>
      );
    }}
  </AbstractLoadStatus>
);

export default Nav;
