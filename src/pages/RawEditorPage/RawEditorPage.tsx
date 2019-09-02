import * as React from "react";
import { SaveGame } from "oni-save-parser";

import { makeStyles } from "@material-ui/core/styles";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import RawObjectTree from "./components/RawObjectTree";

export interface RawEditorPageProps {
  saveGame: SaveGame | null;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%"
  }
});

const RawEditorPage: React.FC<RawEditorPageProps> = ({ saveGame }) => {
  const classes = useStyles();
  const [path, setPath] = React.useState(["header"]);
  return (
    <PageContainer title="Raw Editor">
      <RedirectIfNoSave />
      <div className={classes.root}>
        {saveGame && (
          <RawObjectTree
            saveGame={saveGame}
            path={path}
            onChangePath={setPath}
          />
        )}
      </div>
    </PageContainer>
  );
};
export default RawEditorPage;
