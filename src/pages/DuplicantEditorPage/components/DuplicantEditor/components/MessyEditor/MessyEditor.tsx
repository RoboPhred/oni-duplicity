import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import ModifiersTab from "./components/ModifiersTab";
import IdentityTab from "./components/IdentityTab";
import EffectsTab from "./components/EffectsTab";
import AttributesTab from "./components/AttributesTab";
import MasteriesTab from "./components/MasteriesTab";

export interface MessyEditorProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    tabContainer: {
      width: "100%",
      height: "100%",
      overflow: "auto",
      marginTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    }
  });

type Props = MessyEditorProps & StyleProps<typeof styles>;

const MessyEditor: React.SFC<Props> = ({ classes, gameObjectId }) => {
  const [tab, setTab] = React.useState(0);
  return (
    <Paper elevation={0} square>
      <Tabs
        value={tab}
        textColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        onChange={(_, value) => setTab(value)}
      >
        <Tab label="Identity" />
        <Tab label="Modifiers" />
        <Tab label="Effects" />
        <Tab label="Attributes" />
        <Tab label="Masteries" />
      </Tabs>
      <div className={classes.tabContainer}>
        {tab === 0 && <IdentityTab gameObjectId={gameObjectId} />}
        {tab === 1 && <ModifiersTab gameObjectId={gameObjectId} />}
        {tab === 2 && <EffectsTab gameObjectId={gameObjectId} />}
        {tab === 3 && <AttributesTab gameObjectId={gameObjectId} />}
        {tab === 4 && <MasteriesTab gameObjectId={gameObjectId} />}
      </div>
    </Paper>
  );
};

export default withStyles(styles)(MessyEditor);
