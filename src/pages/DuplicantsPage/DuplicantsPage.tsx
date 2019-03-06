import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import { createStyles, withStyles } from "@material-ui/core/styles";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import DuplicantList from "./components/DuplicantList";

const styles = createStyles({
  duplicantList: {
    overflow: "auto"
  }
});

type Props = StyleProps<typeof styles> & WithTranslation;
const DuplicantsPage: React.SFC<Props> = ({ classes, t }) => (
  <PageContainer title={t("duplicant.noun_titlecase_plural")}>
    <RedirectIfNoSave />
    <DuplicantList className={classes.duplicantList} />
  </PageContainer>
);
export default withTranslation()(withStyles(styles)(DuplicantsPage));
