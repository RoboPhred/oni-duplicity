import * as React from "react";
import { GeyserTypeNames } from "oni-save-parser";

import { WithTranslation, withTranslation } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import useGameObjects from "@/services/oni-save/hooks/useGameObjects";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";
import GeyserListItem from "./components/GeyserListItem";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      margin: theme.spacing()
    },
    item: {
      margin: theme.spacing(0.5)
    }
  });

type Props = WithStyles<typeof styles> & WithTranslation;

const GeysersPage: React.FC<Props> = ({ classes, t }) => {
  const gameObjectIds = useGameObjects(
    GeyserTypeNames.map(x => `GeyserGeneric_${x}`)
  );
  return (
    <PageContainer title={t("geyser.noun_titlecase_plural")}>
      <RedirectIfNoSave />
      <div className={classes.root}>
        {gameObjectIds.map(gameObjectId => (
          <GeyserListItem
            key={gameObjectId}
            className={classes.item}
            gameObjectId={gameObjectId}
          />
        ))}
      </div>
    </PageContainer>
  );
};

export default withStyles(styles)(withTranslation()(GeysersPage));
