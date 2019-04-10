import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import PageContainer from "@/components/PageContainer";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit
    }
  });

type Props = WithStyles<typeof styles>;

const SettingsPage: React.FC<Props> = ({ classes }) => (
  <PageContainer title="Settings" back>
    <div className={classes.root}>
      <Typography variant="h6">Help Wanted: Translations</Typography>
      <Typography>
        <br />
        Contribute translations at the{" "}
        <Link href="https://github.com/robophred/oni-duplicity">
          GitHub Repo
        </Link>
      </Typography>
    </div>
  </PageContainer>
);
export default withStyles(styles)(SettingsPage);
