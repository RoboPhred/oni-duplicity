import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PageContainer from "@/components/PageContainer";

import DuplicantName from "./components/DuplicantName";
import DuplicantPortrait from "./components/DuplicantPortrait";
import ModifiersTab from "./components/ModifiersTab";
import IdentityTab from "./components/IdentityTab";
import EffectsTab from "./components/EffectsTab";

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
    content: {
      display: "flex",
      flexDirection: "row"
    },
    tabContainer: {
      width: "100%",
      height: "100%",
      overflow: "auto",
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    }
  });

type Props = DuplicantEditorProps & WithTranslation & StyleProps<typeof styles>;
const DuplicantEditor: React.SFC<Props> = ({ classes, gameObjectId, t }) => {
  const [tab, setTab] = React.useState(0);
  return (
    <PageContainer title={t("duplicant-editor.title")}>
      <div className={classes.root}>
        <DuplicantName gameObjectId={gameObjectId} />
        <Divider className={classes.divider} />
        <DuplicantPortrait gameObjectId={gameObjectId} />
        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
          <Tab label="Identity" />
          <Tab label="Modifiers" />
          <Tab label="Effects" />
        </Tabs>
        <div className={classes.tabContainer}>
          {tab === 0 && <IdentityTab gameObjectId={gameObjectId} />}
          {tab === 1 && <ModifiersTab gameObjectId={gameObjectId} />}
          {tab === 2 && <EffectsTab gameObjectId={gameObjectId} />}
        </div>
      </div>
    </PageContainer>
  );
};

export default withStyles(styles)(withTranslation()(DuplicantEditor));
