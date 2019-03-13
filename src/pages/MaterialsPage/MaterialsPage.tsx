import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import PageContainer from "@/components/PageContainer";

import RedirectIfNoSave from "@/components/RedirectIfNoSave";
import MaterialsTable from "./components/MaterialsTable";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit
    }
  });

type Props = StyleProps<typeof styles> & WithTranslation;

const MaterialsPage: React.SFC<Props> = ({ classes, t }) => {
  return (
    <PageContainer title={t("material.noun_titlecase")}>
      <RedirectIfNoSave />
      <MaterialsTable className={classes.root} />
    </PageContainer>
  );
};

export default withStyles(styles)(withTranslation()(MaterialsPage));
