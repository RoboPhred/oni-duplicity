import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import PageContainer from "@/components/PageContainer";

import DuplicantName from "./components/DuplicantName";
import DuplicantPortrait from "./components/DuplicantPortrait";
import DuplicantAttributes from "./components/DuplicantAttributes";
import DuplicantTraits from "./components/DuplicantTraits";

export interface DuplicantEditorProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit
    },
    divider: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    content: {
      display: "flex",
      flexDirection: "row"
    }
  });

type Props = DuplicantEditorProps & WithTranslation & StyleProps<typeof styles>;
const DuplicantEditor: React.SFC<Props> = ({ classes, gameObjectId, t }) => (
  <PageContainer title={t("duplicant-editor.title")}>
    <div className={classes.root}>
      <DuplicantName gameObjectId={gameObjectId} />
      <Divider className={classes.divider} />
      <div className={classes.content}>
        <DuplicantPortrait gameObjectId={gameObjectId} />
        <DuplicantAttributes gameObjectId={gameObjectId} />
      </div>
      <DuplicantTraits gameObjectId={gameObjectId} />
    </div>
  </PageContainer>
);

export default withStyles(styles)(withTranslation()(DuplicantEditor));
