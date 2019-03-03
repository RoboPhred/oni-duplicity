import * as React from "react";
import { GeyserBehavior, GeyserType } from "oni-save-parser";
import classnames from "classnames";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const GeyserEditor = AbstractBehaviorEditor.ofType(GeyserBehavior);

export interface GeyserListItemProps {
  gameObjectId: number;
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing.unit * 45,
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing.unit * 2
    },
    titleBar: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing.unit
    },
    titleControls: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "auto"
    }
  });

type Props = GeyserListItemProps & StyleProps<typeof styles>;

const GeyserListItem: React.SFC<Props> = ({
  classes,
  className,
  gameObjectId
}) => (
  <GeyserEditor gameObjectId={gameObjectId}>
    {({ templateData }) => {
      const config = templateData.configuration;
      if (!config) {
        return <div />;
      }
      return (
        <Paper className={classnames(className, classes.root)}>
          <div className={classes.titleBar}>
            <Typography variant="h6">
              {GeyserType[config.typeId.hash]}
            </Typography>
            <div className={classes.titleControls} />
          </div>
          <Divider />
        </Paper>
      );
    }}
  </GeyserEditor>
);

export default withStyles(styles)(GeyserListItem);
