import * as React from "react";
import { connect } from "react-redux";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import PageContainer from "@/components/PageContainer";

import Difficulty from "./components/Difficulty";

import mapStateToProps, { StateProps } from "./state-props";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing()
    },
    difficulty: {
      marginTop: theme.spacing()
    }
  });

type Props = StateProps & WithStyles<typeof styles>;

const SaveOverview: React.FC<Props> = ({ classes, saveName, cycleCount }) => (
  <PageContainer title="Overview">
    <div className={classes.root}>
      <Typography variant="h4">{saveName}</Typography>
      <Divider />
      <Typography>{cycleCount} cycles.</Typography>
      <Difficulty className={classes.difficulty} />
    </div>
  </PageContainer>
);

export default connect(mapStateToProps)(withStyles(styles)(SaveOverview));
