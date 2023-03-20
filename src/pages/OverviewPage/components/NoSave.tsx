import * as React from "react";

import { Trans, WithTranslation, withTranslation } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { OSType } from "@/runtime-env";

import PageContainer from "@/components/PageContainer";
import LoadButton from "@/components/LoadButton";
import LoadExampleButton from "@/components/LoadExampleButton";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      maxWidth: "640px",
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  });

const SaveFilePaths: Record<OSType, string | null> = {
  windows: "Documents/Klei/OxygenNotIncluded/save_files",
  mac: null,
  linux: "~/.config/unity3d/Klei/Oxygen Not Included/save_files",
  unknown: null,
};
const saveFilePath = SaveFilePaths[OSType];

type Props = WithStyles<typeof styles> & WithTranslation;

const NoSave: React.FC<Props> = ({ classes, t }) => (
  <PageContainer title={t("overview-page.no-save.title")}>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" color="error">
          WARNING: This project is no longer supported. While it may load saves,
          it has not been updated since before Spaced Out, and might corrupt or
          otherwise mangle saves.
        </Typography>
        <Typography variant="h5">
          If you are familiar with React, and want to take over mantainership or
          fork this project, the source code is at:{" "}
          <a href="https://github.com/RoboPhred/oni-duplicity">
            github:RoboPhred/oni-duplicity
          </a>
        </Typography>
        <Typography variant="h5">
          If you want to create your own editor and can work in javascript, the
          save parser is still fully operational and is located at{" "}
          <a href="https://github.com/RoboPhred/oni-save-parser">
            github:RoboPhred/oni-save-parser
          </a>
        </Typography>
      </Paper>
      <Divider />
      <div>
        <Typography variant="h5">
          <Trans i18nKey="overview-page.no-save.prompt">
            Load a save using the controls on the upper left.
          </Trans>
        </Typography>
      </div>
      {SaveFilePaths[OSType] && (
        <Typography component="div" variant="body1">
          <Trans i18nKey="overview-page.no-save.save-location">
            Save files can be found at <code>{{ path: saveFilePath }}</code>
          </Trans>
        </Typography>
      )}
      <LoadButton />
      {/* <Typography component="div">
        Have no save file? Want to preview the editor?
      </Typography>
      <LoadExampleButton /> */}
    </div>
  </PageContainer>
);
export default withStyles(styles)(withTranslation()(NoSave));
