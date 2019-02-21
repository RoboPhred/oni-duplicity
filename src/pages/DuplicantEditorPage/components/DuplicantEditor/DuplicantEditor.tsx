import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import PageContainer from "@/components/PageContainer";

import DuplicantName from "./components/DuplicantName";

export interface DuplicantEditorProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit
    }
  });

type Props = DuplicantEditorProps & WithTranslation & StyleProps<typeof styles>;
const DuplicantEditor: React.SFC<Props> = ({ classes, gameObjectId, t }) => (
  <PageContainer title={t("duplicant-editor.title")}>
    <div className={classes.root}>
      <DuplicantName gameObjectId={gameObjectId} />
      <Divider />
    </div>
  </PageContainer>
);

export default withStyles(styles)(withTranslation()(DuplicantEditor));
