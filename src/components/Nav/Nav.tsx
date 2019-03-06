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
        <Trans i18nKey="overview-page.title">Overview</Trans>
      </ListItemText>
    </ListItemLink>
    <ListItemLink
      button
      to="/duplicants"
      autoselect
      disabled={!enableSaveNavigation}
    >
      <ListItemText>
        <Trans i18nKey="duplicant.noun_titlecase_plural">Duplicants</Trans>
      </ListItemText>
    </ListItemLink>
    <ListItemLink
      button
      to="/geysers"
      autoselect
      disabled={!enableSaveNavigation}
    >
      <ListItemText>
        <Trans i18nKey="geyser.noun_titlecase_plural">Geysers</Trans>
      </ListItemText>
    </ListItemLink>
    <ListItemLink
      button
      to="/materials"
      autoselect
      disabled={!enableSaveNavigation}
    >
      <ListItemText>
        <Trans i18nKey="material.noun_titlecase_plural">Materials</Trans>
      </ListItemText>
    </ListItemLink>
  </List>
);
export default connect(mapStateToProps)(Nav);
