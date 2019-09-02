import * as React from "react";

import { WithTranslation, withTranslation, Trans } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PageContainer from "@/components/PageContainer";
import DuplicantPortrait from "@/components/DuplicantPortrait";

import DuplicantName from "./components/DuplicantName";
import Traits from "./components/Traits";
import Aptitudes from "./components/Interests";
import Attributes from "./components/Attributes";
import Appearance from "./components/Appearance";
import Skills from "./components/Skills";
import Effects from "./components/Effects";
import Health from "./components/Health";

export interface DuplicantEditorProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(),
      paddingTop: theme.spacing(),
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    },
    divider: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing()
    },
    nameRow: {
      flexGrow: 0,
      flexShrink: 0
    },
    portraitRow: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing(),
      flexGrow: 0,
      flexShrink: 0
    },
    portraitRowColumn: {
      marginRight: theme.spacing()
    },
    portraitRowTweakables: {
      width: "100%"
    },
    row: {
      marginBottom: theme.spacing(),
      flexGrow: 0,
      flexShrink: 0
    },
    tabRow: {
      display: "flex",
      flexDirection: "column",
      marginLeft: -theme.spacing(),
      height: "100%"
    },
    tabContent: {
      width: "100%",
      height: "100%",
      overflow: "auto"
    }
  });

type Props = DuplicantEditorProps & WithTranslation & WithStyles<typeof styles>;

const DuplicantEditor: React.FC<Props> = ({ classes, gameObjectId, t }) => {
  const [tab, setTab] = React.useState(0);
  return (
    <PageContainer title={t("duplicant.verbs.edit_titlecase")} back>
      <div className={classes.root}>
        <div className={classes.nameRow}>
          <DuplicantName gameObjectId={gameObjectId} />
        </div>
        <Divider className={classes.divider} />
        <div className={classes.portraitRow}>
          <div className={classes.portraitRowColumn}>
            <Paper>
              <DuplicantPortrait gameObjectId={gameObjectId} scale={0.6} />
            </Paper>
          </div>
          <div className={classes.portraitRowTweakables}>
            <div className={classes.row}>
              <Typography variant="h6">
                <Trans i18nKey="duplicant_trait.noun_titlecase">Traits</Trans>
              </Typography>
              <Divider className={classes.divider} />
              <Traits gameObjectId={gameObjectId} />
            </div>
            <div className={classes.row}>
              <Typography variant="h6">
                <Trans i18nKey="duplicant_interest.noun_titlecase">
                  Interests
                </Trans>
              </Typography>
              <Divider className={classes.divider} />
              <Aptitudes gameObjectId={gameObjectId} />
            </div>
          </div>
        </div>
        <div className={classes.tabRow}>
          <Paper square>
            <Tabs
              textColor="secondary"
              value={tab}
              onChange={(_, value) => setTab(value)}
            >
              <Tab
                label={t("duplicant_attribute.noun_titlecase_plural", {
                  defaultValue: "Attributes"
                })}
              />
              <Tab
                label={t("duplicant_appearance.noun_titlecase", {
                  defaultValue: "Appearance"
                })}
              />
              <Tab
                label={t("duplicant_health.noun_titlecase", {
                  defaultValue: "Health"
                })}
              />
              <Tab
                label={t("duplicant_skills.noun_titlecase_plural", {
                  defaultValue: "Skills"
                })}
              />
              <Tab
                label={t("duplicant_effect.noun_titlecase", {
                  defaultValue: "Effects"
                })}
              />
            </Tabs>
          </Paper>
          <div className={classes.tabContent}>
            {tab === 0 && <Attributes gameObjectId={gameObjectId} />}
            {tab === 1 && <Appearance gameObjectId={gameObjectId} />}
            {tab === 2 && <Health gameObjectId={gameObjectId} />}
            {tab === 3 && <Skills gameObjectId={gameObjectId} />}
            {tab === 4 && <Effects gameObjectId={gameObjectId} />}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default withStyles(styles)(withTranslation()(DuplicantEditor));
