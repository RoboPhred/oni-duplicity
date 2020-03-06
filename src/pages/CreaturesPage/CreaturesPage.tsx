import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import CreatureList from "./components/CreatureList";

const useStyles = makeStyles({
  creatureList: {
    overflow: "auto"
  }
});

type Props = WithTranslation;

const CreaturesPage: React.FC<Props> = ({ t }) => {
  const classes = useStyles();
  return (
    <PageContainer title={t("creature.noun_titlecase_plural")}>
      <RedirectIfNoSave />
      <CreatureList className={classes.creatureList} />
    </PageContainer>
  );
};
export default withTranslation()(CreaturesPage);
