import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import PageContainer from "@/components/PageContainer";

import Language from "./components/Language";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(),
    },
  });

type Props = WithStyles<typeof styles>;

const SettingsPage: React.FC<Props> = ({ classes }) => (
  <PageContainer title="Settings" back>
    <div className={classes.root}>
      <div>
        <Typography variant="h5">About</Typography>
        <Typography>Version: {__APP_VERSION__}</Typography>
        <Typography>
          This build runs 100% offline. Nothing is uploaded; your save file
          never leaves your computer.
        </Typography>
      </div>
      <div>
        <Typography variant="h5">Language</Typography>
        <Language />
      </div>
    </div>
  </PageContainer>
);
export default withStyles(styles)(SettingsPage);
