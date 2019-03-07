import * as React from "react";
import { GeyserBehavior, GeyserType } from "oni-save-parser";
import classnames from "classnames";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
    {({ templateData, onTemplateDataModify }) => {
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
          <Select
            value={config.typeId.hash}
            onChange={e =>
              onTemplateDataModify({
                configuration: {
                  ...config,
                  typeId: { hash: Number(e.target.value) }
                }
              })
            }
          >
            {keysOfType(GeyserType).map(typeName => (
              <MenuItem
                key={typeName}
                value={(GeyserType[typeName] as any).hash}
              >
                {typeName}
              </MenuItem>
            ))}
          </Select>
        </Paper>
      );
    }}
  </GeyserEditor>
);

export default withStyles(styles)(GeyserListItem);

function keysOfType<T>(type: T): (keyof T)[] {
  return Object.keys(type) as any;
}
