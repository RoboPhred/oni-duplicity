import * as React from "react";
import { connect } from "react-redux";

import { Trans } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import mapStateToProps, { StateProps } from "./state-props";

import ListItemLink from "@/components/ListItemLink";

type Props = StateProps;
const Nav: React.SFC<Props> = ({ enableSaveNavigation }) => (
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
      disabled={!enableSaveNavigation}
    >
      <ListItemText>
        <Trans i18nKey="nav.duplicants">Duplicants</Trans>
      </ListItemText>
    </ListItemLink>
  </List>
);
export default connect(mapStateToProps)(Nav);
