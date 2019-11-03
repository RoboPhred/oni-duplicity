import * as React from "react";
import { SaveGame } from "oni-save-parser";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { getSegmentName } from "../../editor-data";

export interface BreadcrumbPathProps {
  saveGame: SaveGame;
  path: string[];
  onChangePath(path: string[]): void;
}

const BreadcrumbPath: React.FC<BreadcrumbPathProps> = ({
  path,
  saveGame,
  onChangePath
}) => {
  return (
    <Breadcrumbs>
      {path.map((_, i) => {
        const segmentPath = path.slice(0, i + 1);
        return (
          <Typography key={i} color="inherit" onClick={() => onChangePath(segmentPath)}>
            {getSegmentName(saveGame, segmentPath)}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbPath;
