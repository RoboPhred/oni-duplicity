import * as React from "react";
import { SimHashes } from "oni-save-parser";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import usePlanet from "@/services/oni-save/hooks/usePlanet";

export interface RecoverableElementProps {
  planetId: number;
  resourceId: number;
}

export const RecoverableElement: React.FC<RecoverableElementProps> = ({
  planetId,
  resourceId,
}) => {
  const { planet, onModifyPlanet } = usePlanet(planetId);

  const [transientValue, setTransientValue] = React.useState(-1);
  const setTransientMass = React.useCallback(
    (_: any, value: number | number[]) => {
      setTransientValue(value as number);
    },
    []
  );
  const setMass = React.useCallback(
    (_: any, value: number | number[]) => {
      const newRecoverables = [...(planet?.recoverableElements ?? [])];
      newRecoverables[resourceId] = [
        newRecoverables[resourceId][0],
        value as number,
      ];
      onModifyPlanet({
        recoverableElements: newRecoverables,
      });
      setTransientValue(-1);
    },
    [planet?.recoverableElements, onModifyPlanet, planetId]
  );

  if (!planet) {
    return null;
  }

  const resource = planet.recoverableElements[resourceId];
  if (!resource) {
    return null;
  }
  const [hash, mass] = resource;

  const id = `planet-${planetId}-recoverable-${hash}`;

  const currentMass = transientValue !== -1 ? transientValue : mass;
  return (
    <div>
      <Typography id={id}>
        {SimHashes[hash]} ({Math.round(currentMass * 100)}% mass)
      </Typography>
      <Slider
        aria-labelledby={id}
        value={currentMass}
        min={0}
        max={1}
        step={0.01}
        onChange={setTransientMass}
        onChangeCommitted={setMass}
      />
    </div>
  );
};

export default RecoverableElement;
