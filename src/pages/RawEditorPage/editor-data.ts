import { SaveGame, GameObjectGroup, GameObjectBehavior } from "oni-save-parser";
import { get, last } from "lodash";

interface PathSegmentData {
  matcher: string[];
  name?(saveGame: SaveGame, path: string[]): string | null;
}

const pathSegmentData: PathSegmentData[] = [
  {
    matcher: ["gameObjects", "*"],
    name(saveGame: SaveGame, path: string[]) {
      const group: GameObjectGroup | undefined = get(saveGame, path);
      if (!group) {
        return null;
      }
      return group.name;
    }
  },
  {
    matcher: ["gameObjects", "*", "gameObjects", "*", "behaviors", "*"],
    name(saveGame: SaveGame, path: string[]) {
      const behavior: GameObjectBehavior | undefined = get(saveGame, path);
      if (!behavior) {
        return null;
      }
      return behavior.name;
    }
  }
];

export function getSegmentName(saveGame: SaveGame, path: string[]): string {
  const segment = pathSegmentData.find(segment =>
    isPathMatch(path, segment.matcher)
  );
  if (!segment || !segment.name) {
    return last(path)!;
  }

  return segment.name(saveGame, path) || last(path)!;
}

export function getSegmentEditor(
  saveGame: SaveGame,
  path: string[]
): string | null {
  const item = path.length > 0 ? get(saveGame, path) : saveGame;
  const itemType = typeof item;
  if (itemType === "object") {
    return null;
  }
  return itemType;
}

function isPathMatch(path: string[], matcher: string[]): boolean {
  if (path.length !== matcher.length) {
    return false;
  }
  for (let i = 0; i < path.length; i++) {
    if (matcher[i] !== "*" && path[i] !== matcher[i]) {
      return false;
    }
  }

  return true;
}
