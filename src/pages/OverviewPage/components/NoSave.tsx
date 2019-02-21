import * as React from "react";

import { Trans, WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { OSType } from "@/runtime-env";

import PageContainer from "@/components/PageContainer";
import LoadButton from "@/components/LoadButton";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 2
    }
  });

const SaveFilePaths: Record<OSType, string | null> = {
  windows: "Documents/Klei/OxygenNotIncluded/save_files",
  mac: null,
  linux: "~/.config/unity3d/Klei/Oxygen Not Included/save_files",
  unknown: null
};
const saveFilePath = SaveFilePaths[OSType];

type Props = StyleProps<typeof styles> & WithTranslation;

const NoSave: React.SFC<Props> = ({ classes, t }) => (
  <PageContainer title={t("overview.no-save.title")}>
    <div className={classes.root}>
      <div>
        <Typography variant="h5">
          <Trans i18nKey="overview.no-save.prompt">
            Load a save using the controls on the upper left.
          </Trans>
        </Typography>
      </div>
      {SaveFilePaths[OSType] && (
        <div>
          <Trans i18nKey="overview.no-save.save-location">
            Save files can be found at <code>{{ path: saveFilePath }}</code>
          </Trans>
        </div>
      )}
      <LoadButton />
    </div>
  </PageContainer>
);
export default withStyles(styles)(withTranslation()(NoSave));
