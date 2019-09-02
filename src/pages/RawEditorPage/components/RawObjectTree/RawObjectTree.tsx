import * as React from "react";
import { get, last } from "lodash-es";
import { SaveGame } from "oni-save-parser";

import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

export interface RawObjectTreeProps {
  saveGame: SaveGame;
  path: string[];
  onChangePath(path: string[]): void;
}

const RawObjectTree: React.FC<RawObjectTreeProps> = ({
  saveGame,
  path,
  onChangePath
}) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <RawTreeChildren
        saveGame={saveGame}
        path={path}
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
  const target = get(saveGame, path);
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

  return (
    <TreeItem nodeId={path.join(".")} label={last(path)} onClick={onClick}>
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
