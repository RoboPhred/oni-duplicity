import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import AbstractLoadStatus from "@/services/oni-save/components/AbstractLoadStatus";
import PageContainer from "@/components/PageContainer";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit
    }
  });

type Props = StyleProps<typeof styles>;

const SaveError: React.SFC<Props> = ({ classes }) => (
  <AbstractLoadStatus>
    {({ errorMessage }) => (
      <PageContainer title="Failed to Load">
        <div className={classes.root}>
          <Typography variant="h5">Error loading save</Typography>
          <Divider />
          <Typography>{errorMessage}</Typography>
        </div>
      </PageContainer>
    )}
  </AbstractLoadStatus>
);

export default withStyles(styles)(SaveError);
