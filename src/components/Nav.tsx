import * as React from "react";
import { useSelector } from "react-redux";

import { Trans } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import { hasSaveSelector } from "@/services/oni-save/selectors/save-game";
import { dlcIdSelector } from "@/services/oni-save/selectors/dlc";
import ListItemLink from "@/components/ListItemLink";
import NavItems from "@/nav-links";

const Nav: React.FC = () => {
  const hasSave = useSelector(hasSaveSelector);
  const dlcId = useSelector(dlcIdSelector);
  return (
    <List component="nav">
      {NavItems.filter(
        ({ requireDLC }) => requireDLC === undefined || requireDLC === dlcId
      ).map(({ name, path, i18nKey, saveRequired }) => (
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
};
export default Nav;
