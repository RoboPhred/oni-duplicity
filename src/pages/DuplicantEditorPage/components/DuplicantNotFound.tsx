import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import PageContainer from "@/components/PageContainer";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: "100%"
    },
    text: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing()
    }
  });

type Props = WithTranslation & WithStyles<typeof styles>;

const DuplicantNotFound: React.FC<Props> = ({ t, classes }) => (
  <PageContainer title={t("duplicant.conditions.missing_titlecase")} back>
    <div className={classes.root}>
      <Typography className={classes.text} variant="h5">
        {t("duplicant.conditions.missing_titlecase")}
      </Typography>
    </div>
  </PageContainer>
);

export default withStyles(styles)(withTranslation()(DuplicantNotFound));
