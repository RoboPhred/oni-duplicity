import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import PageContainer from "@/components/PageContainer";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

type Props = WithTranslation;

const CreatureNotFound: React.FC<Props> = ({ t }) => {
  const classes = useStyles();
  return (
    <PageContainer title={t("creature.conditions.missing_titlecase")} back>
      <div className={classes.root}>
        <Typography className={classes.text} variant="h5">
          {t("creature.conditions.missing_titlecase")}
        </Typography>
      </div>
    </PageContainer>
  );
};

export default withTranslation()(CreatureNotFound);
