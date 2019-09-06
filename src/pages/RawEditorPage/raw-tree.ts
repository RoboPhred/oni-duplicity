import { SaveGame, GameObjectGroup, GameObjectBehavior } from "oni-save-parser";
import { get } from "lodash";

interface SegmentData {
  matcher: string[];
  name?(saveGame: SaveGame, path: string[]): string | null;
}

const data: SegmentData[] = [
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

export function getSegmentName(
  saveGame: SaveGame,
  path: string[]
): string | null {
  const segment = data.find(segment => isPathMatch(path, segment.matcher));
  if (!segment || !segment.name) {
    return null;
  }

  return segment.name(saveGame, path);
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
