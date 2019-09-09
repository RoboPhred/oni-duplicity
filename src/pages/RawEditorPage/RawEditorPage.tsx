import * as React from "react";
import { SaveGame } from "oni-save-parser";

import { makeStyles, Theme } from "@material-ui/core/styles";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import RawObjectTree from "./components/RawObjectTree";
import BreadcrumbPath from "./components/BreadcrumbPath";
import ObjectEditor from "./components/ObjectEditor";

export interface RawEditorPageProps {
  saveGame: SaveGame | null;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%"
  },
  tree: {
    width: "500px",
    overflow: "auto"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    margin: theme.spacing()
  }
}));

const RawEditorPage: React.FC<RawEditorPageProps> = ({ saveGame }) => {
  const classes = useStyles();
  const [path, setPath] = React.useState(["header"]);
  return (
    <PageContainer title="Raw Editor">
      <RedirectIfNoSave />
      <div className={classes.root}>
        {saveGame && (
          <>
            <RawObjectTree
              className={classes.tree}
              saveGame={saveGame}
              onChangePath={setPath}
            />
            <div className={classes.content}>
              <BreadcrumbPath
                path={path}
                saveGame={saveGame}
                onChangePath={setPath}
              />
              <ObjectEditor path={path} saveGame={saveGame} />
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};
export default RawEditorPage;
