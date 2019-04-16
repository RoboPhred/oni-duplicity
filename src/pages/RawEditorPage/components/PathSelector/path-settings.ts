import { find } from "lodash-es";
import {
  GameObjectGroup,
  GameObject,
  getBehavior,
  KPrefabIDBehavior,
  GameObjectBehavior
} from "oni-save-parser";

export interface PathSettings {
  getLabel?(data: any): string;
}

interface PathSettingMatcher extends PathSettings {
  path: string[];
}

const settings: PathSettingMatcher[] = [
  {
    path: ["gameObjects", "*"],
    getLabel(data: GameObjectGroup) {
      return data.name;
    }
  },
  {
    path: ["gameObjects", "*", "gameObjects", "*"],
    getLabel(data: GameObject) {
      const idBehavior = getBehavior(data, KPrefabIDBehavior);
      if (!idBehavior) {
        return "Unknown";
      }
      return String(idBehavior.templateData.InstanceID);
    }
  },
  {
    path: ["gameObjects", "*", "gameObjects", "*", "behaviors", "*"],
    getLabel(data: GameObjectBehavior) {
      return data.name;
    }
  }
];

export function getPathSettings(path: string[]): PathSettings | null {
  const match = find(settings, x => matchPath(path, x.path));
  return match || null;
}

function matchPath(path: string[], pattern: string[]): boolean {
  if (path.length !== pattern.length) {
    return false;
  }

  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    const match = pattern[i];
    if (match !== "*" && segment !== match) {
      return false;
    }
  }

  return true;
}
