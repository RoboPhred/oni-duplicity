import * as React from "react";
import { SaveGame } from "oni-save-parser";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import RawObjectTree from "./components/RawObjectTree";
import { getSegmentName } from "./raw-tree";

export interface RawEditorPageProps {
  saveGame: SaveGame | null;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%"
  },
  tree: {
    width: "800px"
  },
  content: {
    display: "flex",
    flexDirection: "column",
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
          <>
            <RawObjectTree
              className={classes.tree}
              saveGame={saveGame}
              onChangePath={setPath}
            />
            <div className={classes.content}>
              <Breadcrumbs>
                {path.map((segment, i) => (
                  <Typography color="inherit">
                    {getSegmentName(saveGame, path.slice(0, i + 1)) || segment}
                  </Typography>
                ))}
              </Breadcrumbs>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};
export default RawEditorPage;
