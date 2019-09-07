import * as React from "react";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { getSegmentName } from "../../raw-tree";

export interface BreadcrumbPathProps {
  path: string[];
  onChangePath(path: string[]): void;
}

const BreadcrumbPath: React.FC<BreadcrumbPathProps> = ({
  path,
  onChangePath
}) => {
  return (
    <Breadcrumbs>
      {path.map((_, i) => {
        const segmentPath = path.slice(0, i + 1);
        return (
          <Typography color="inherit" onClick={() => onChangePath(segmentPath)}>
            {getSegmentName(saveGame, segmentPath)}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbPath;
