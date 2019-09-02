import * as React from "react";

import classnames from "classnames";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

import DuplicantMenu from "@/components/DuplicantMenu";
import DuplicantPortrait from "@/components/DuplicantPortrait";

import DuplicantName from "./components/DuplicantName";
// import DuplicantPortrait from "./components/DuplicantPortrait";
import DuplicantTraits from "./components/DuplicantTraits";
import DuplicantAttributes from "./components/DuplicantAttributes";
import EditButton from "./components/EditButton";

export interface DuplicantListItemProps {
  className?: string;
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(45),
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2)
    },
    titleBar: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing()
    },
    titleControls: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "auto"
    },
    content: {
      display: "flex",
      flexDirection: "row",
      marginTop: theme.spacing()
    },
    portraitColumn: {
      marginRight: theme.spacing(2)
    },
    attributes: {
      marginLeft: "auto"
    },
    editButton: {
      marginLeft: "auto"
    }
  });

type Props = DuplicantListItemProps & WithStyles<typeof styles>;

const DuplicantListItem: React.FC<Props> = ({
  className,
  classes,
  gameObjectId
}) => (
  <Paper className={classnames(classes.root, className)}>
    <div className={classes.titleBar}>
      <DuplicantName gameObjectId={gameObjectId} />
      <div className={classes.titleControls}>
        <EditButton
          className={classes.editButton}
          gameObjectId={gameObjectId}
        />
        <DuplicantMenu gameObjectId={gameObjectId} />
      </div>
    </div>
    <Divider />
    <div className={classes.content}>
      <div className={classes.portraitColumn}>
        <DuplicantPortrait gameObjectId={gameObjectId} scale={0.3} />
        <DuplicantTraits gameObjectId={gameObjectId} />
      </div>
      <DuplicantAttributes
        className={classes.attributes}
        gameObjectId={gameObjectId}
      />
    </div>
  </Paper>
);

export default withStyles(styles)(DuplicantListItem);
