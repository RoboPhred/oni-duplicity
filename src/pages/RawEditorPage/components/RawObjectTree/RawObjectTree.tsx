import * as React from "react";
import { get } from "lodash";
import { SaveGame } from "oni-save-parser";

import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { getSegmentName } from "../../editor-data";

export interface RawObjectTreeProps {
  className?: string;
  saveGame: SaveGame;
  onChangePath(path: string[]): void;
}

const RawObjectTree: React.FC<RawObjectTreeProps> = ({
  className,
  saveGame,
  onChangePath
}) => {
  return (
    <TreeView
      className={className}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <RawTreeChildren
        saveGame={saveGame}
        path={[]}
        onChangePath={onChangePath}
      />
    </TreeView>
  );
};

export default RawObjectTree;

interface RawTreeChildrenProps {
  saveGame: SaveGame;
  path: string[];
  onChangePath(path: string[]): void;
}
const RawTreeChildren: React.FC<RawTreeChildrenProps> = ({
  saveGame,
  path,
  onChangePath
}) => {
  const target = path.length == 0 ? saveGame : get(saveGame, path);
  const childrenKeys = Object.keys(target).filter(key =>
    isObjectKey(target, key)
  );
  const children = childrenKeys.map(key => {
    const childPath = [...path, key];
    return (
      <RawTreeChild
        key={childPath.join(".")}
        saveGame={saveGame}
        path={childPath}
        onChangePath={onChangePath}
      />
    );
  });

  return <>{children}</>;
};

interface RawTreeChildProps {
  saveGame: SaveGame;
  path: string[];
  onChangePath(path: string[]): void;
}
const RawTreeChild: React.FC<RawTreeChildProps> = ({
  saveGame,
  path,
  onChangePath
}) => {
  const onClick = React.useCallback(() => {
    onChangePath(path);
  }, [onChangePath, path]);

  const segmentName = getSegmentName(saveGame, path);

  return (
    <TreeItem nodeId={path.join(".")} label={segmentName} onClick={onClick}>
      <RawTreeChildren
        saveGame={saveGame}
        path={path}
        onChangePath={onChangePath}
      />
    </TreeItem>
  );
};

function isObjectKey(obj: any, key: string): boolean {
  return obj[key] != null && typeof obj[key] === "object";
}
