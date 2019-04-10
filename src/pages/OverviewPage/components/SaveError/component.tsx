import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import PageContainer from "@/components/PageContainer";

export interface SaveErrorProps {
  errorMessage: string | null;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit
    },
    errorMessage: {
      marginTop: theme.spacing.unit
    }
  });

type Props = SaveErrorProps & WithStyles<typeof styles>;
const SaveError: React.FC<Props> = ({ errorMessage, classes }) => (
  <PageContainer title="Failed to Load">
    <div className={classes.root}>
      <Typography variant="h5">Error loading save</Typography>
      <Divider />
      <Typography className={classes.errorMessage}>{errorMessage}</Typography>
    </div>
  </PageContainer>
);

export default withStyles(styles)(SaveError);
