import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import useOfflineModeSettings from "@/services/offline-mode/hooks/useOfflineModeSettings";

import PageContainer from "@/components/PageContainer";

import Language from "./components/Language";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing()
    }
  });

type Props = WithStyles<typeof styles>;

const SettingsPage: React.FC<Props> = ({ classes }) => {
  const { enabled, supported, setEnabled } = useOfflineModeSettings();
  const onOfflineChecked = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEnabled(e.target.checked);
    },
    [setEnabled]
  );

  return (
    <PageContainer title="Settings" back>
      <div className={classes.root}>
        <div>
          <Typography variant="h5">Offline Mode</Typography>
          {!supported && (
            <Typography>
              Offline mode is not supported in your browser.
            </Typography>
          )}
          {supported && (
            <>
              <Typography>Your browser supports offline mode.</Typography>
              <FormControlLabel
                control={
                  <Checkbox checked={enabled} onChange={onOfflineChecked} />
                }
                label="Enable Offline Mode"
              />
              {enabled && (
                <Typography>
                  Offline Mode is now enabled. This web page will be available
                  without internet access.
                </Typography>
              )}
            </>
          )}
        </div>
        <div>
          <Typography variant="h5">Language</Typography>
          <Language />
        </div>
      </div>
    </PageContainer>
  );
};
export default withStyles(styles)(SettingsPage);
