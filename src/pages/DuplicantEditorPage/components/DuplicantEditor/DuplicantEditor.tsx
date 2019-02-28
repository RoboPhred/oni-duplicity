import * as React from "react";

import { WithTranslation, withTranslation, Trans } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PageContainer from "@/components/PageContainer";

import DuplicantName from "./components/DuplicantName";
import DuplicantPortrait from "./components/DuplicantPortrait";
import Traits from "./components/Traits";
import Aptitudes from "./components/Interests";
import Attributes from "./components/Attributes";
import Appearance from "./components/Appearance";
import Jobs from "./components/Jobs";
import Effects from "./components/Effects";
import Health from "./components/Health";

export interface DuplicantEditorProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing.unit,
      paddingTop: theme.spacing.unit,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    },
    divider: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    nameRow: {
      flexGrow: 0,
      flexShrink: 0
    },
    portraitRow: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing.unit,
      flexGrow: 0,
      flexShrink: 0
    },
    portraitRowColumn: {
      marginRight: theme.spacing.unit
    },
    portraitRowTweakables: {
      width: "100%"
    },
    row: {
      marginBottom: theme.spacing.unit,
      flexGrow: 0,
      flexShrink: 0
    },
    tabRow: {
      display: "flex",
      flexDirection: "column",
      marginLeft: -theme.spacing.unit,
      height: "100%"
    },
    tabContent: {
      width: "100%",
      height: "100%",
      overflow: "auto"
    }
  });

type Props = DuplicantEditorProps & WithTranslation & StyleProps<typeof styles>;
const DuplicantEditor: React.SFC<Props> = ({ classes, gameObjectId, t }) => {
  const [tab, setTab] = React.useState(0);
  return (
    <PageContainer title={t("duplicant-editor.title")}>
      <div className={classes.root}>
        <div className={classes.nameRow}>
          <DuplicantName gameObjectId={gameObjectId} />
        </div>
        <Divider className={classes.divider} />
        <div className={classes.portraitRow}>
          <div className={classes.portraitRowColumn}>
            <Paper>
              <DuplicantPortrait gameObjectId={gameObjectId} />
            </Paper>
          </div>
          <div className={classes.portraitRowTweakables}>
            <div className={classes.row}>
              <Typography variant="h6">
                <Trans i18nKey="duplicant-editor.traits">Traits</Trans>
              </Typography>
              <Divider className={classes.divider} />
              <Traits gameObjectId={gameObjectId} />
            </div>
            <div className={classes.row}>
              <Typography variant="h6">
                <Trans i18nKey="duplicant-editor.aptitudes">Interests</Trans>
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
                label={t("duplicant-editor.attributes", {
                  defaultValue: "Attributes"
                })}
              />
              <Tab
                label={t("duplicant-editor.appearance", {
                  defaultValue: "Appearance"
                })}
              />
              <Tab
                label={t("duplicant-editor.health", { defaultValue: "Health" })}
              />
              <Tab
                label={t("duplicant-editor.jobs", { defaultValue: "Jobs" })}
              />
              <Tab
                label={t("duplicant-editor.effects", {
                  defaultValue: "Effects"
                })}
              />
            </Tabs>
          </Paper>
          <div className={classes.tabContent}>
            {tab === 0 && <Attributes gameObjectId={gameObjectId} />}
            {tab === 1 && <Appearance gameObjectId={gameObjectId} />}
            {tab === 2 && <Health gameObjectId={gameObjectId} />}
            {tab === 3 && <Jobs gameObjectId={gameObjectId} />}
            {tab === 4 && <Effects gameObjectId={gameObjectId} />}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default withStyles(styles)(withTranslation()(DuplicantEditor));

/*
        <div className={classes.messy}>
          <MessyEditor gameObjectId={gameObjectId} />
        </div>
*/
