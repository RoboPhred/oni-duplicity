import * as React from "react";

import { Trans } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import AbstractSaveStatus from "@/services/oni-save/components/AbstractSaveStatus";

import ListItemLink from "./ListItemLink";

const Nav: React.SFC = () => (
  <AbstractSaveStatus>
    {({ loadingStatus }) => (
      <List component="nav">
        <ListItemLink button to="/" autoselect>
          <ListItemText>
            <Trans i18nKey="nav.overview">Overview</Trans>
          </ListItemText>
        </ListItemLink>
        <ListItemLink
          button
          to="/duplicants"
          autoselect
          disabled={loadingStatus !== "ready"}
        >
          <ListItemText>
            <Trans i18nKey="nav.duplicants">Duplicants</Trans>
          </ListItemText>
        </ListItemLink>
      </List>
    )}
  </AbstractSaveStatus>
);
export default Nav;
