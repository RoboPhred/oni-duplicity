import * as React from "react";

import { SaveGame } from "oni-save-parser";
import { get, last } from "lodash-es";

import { getPathSettings } from "./path-settings";

export interface PathSelectorLogicInputProps {
  saveGame: SaveGame | null;
  path: string[];
  onChange(path: string[]): void;
}

export interface PathMenuItemProps {
  label: string;
  onClick(): void;
}

export interface WithPathSelectorLogic {
  pathMenu: PathMenuItemProps[];
  nextItemMenu: PathMenuItemProps[];
}

export default function withPathSelectorLogic(
  WrappedComponent: React.ComponentType<WithPathSelectorLogic>
): React.ComponentType<PathSelectorLogicInputProps> {
  return (props: PathSelectorLogicInputProps) => {
    const { saveGame, path, onChange } = props;
    return (
      // Ideally we would only pass a subset of props, removing saveGame/path/onChange
      //  However, typescript rejects the typings, presumably because T might include its
      //  own saveGame/path/onChange.
      <WrappedComponent
        pathMenu={saveGame ? generatePathMenu(saveGame, path, onChange) : []}
        nextItemMenu={
          saveGame ? generateNextMenu(saveGame, path, onChange) : []
        }
      />
    );
  };
}

function generatePathMenu(
  saveGame: SaveGame,
  path: string[],
  onSelectPath: (path: string[]) => void
): PathMenuItemProps[] {
  const pathMenuItems: PathMenuItemProps[] = [
    {
      label: "SaveGame",
      onClick: onSelectPath.bind(null, [])
    }
  ];

  for (let i = 0; i < path.length; i++) {
    const subPath = path.slice(0, i + 1);
    pathMenuItems.push({
      label: getPathName(saveGame, subPath),
      onClick: onSelectPath.bind(null, subPath)
    });
  }

  return pathMenuItems;
}

function generateNextMenu(
  saveGame: SaveGame,
  path: string[],
  onSelectPath: (path: string[]) => void
): PathMenuItemProps[] {
  const pathMenuItems: PathMenuItemProps[] = [];

  const target = path.length > 0 ? get(saveGame, path) : saveGame;

  if (!target || typeof target !== "object") {
    return [];
  }

  for (const key of Object.keys(target)) {
    const value = target[key];
    if (!value || typeof value !== "object") {
      continue;
    }
    pathMenuItems.push({
      label: getPathName(saveGame, [...path, key]),
      onClick: onSelectPath.bind(null, [...path, key])
    });
  }

  return pathMenuItems;
}

function getPathName(saveGame: SaveGame, path: string[]) {
  const settings = getPathSettings(path);
  if (!settings || !settings.getLabel) {
    return last(path)!;
  }
  return settings.getLabel(get(saveGame, path));
}
