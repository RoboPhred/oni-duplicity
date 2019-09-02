import * as React from "react";

import { Trans } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import ListItemLink from "@/components/ListItemLink";

import NavItems from "./nav-links";

export interface NavProps {
  hasSave: boolean;
}

export type Props = NavProps;
const Nav: React.FC<Props> = ({ hasSave }) => (
  <List component="nav">
    {NavItems.map(({ name, path, i18nKey, saveRequired }) => (
      <ListItemLink
        key={name}
        to={path}
        button
        autoselect
        disabled={saveRequired ? !hasSave : false}
      >
        <ListItemText>
          <Trans i18nKey={i18nKey}>{name}</Trans>
        </ListItemText>
      </ListItemLink>
    ))}
  </List>
);

export default Nav;
