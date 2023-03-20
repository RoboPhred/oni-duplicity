import * as React from "react";
import {
  AccessorizerBehavior,
  getAccessoryOfType,
  Accessory,
  AccessoryType,
  getAccessoryName,
  getIndexOfAccessoryType,
} from "oni-save-parser";
import { merge, padStart } from "lodash";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import useBehavior from "@/services/oni-save/hooks/useBehavior";

import HeadPortrait from "./components/HeadPortrait";
import Portrait from "./components/Portrait";

export interface AppearanceProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    tabContent: {
      width: "100%",
      height: "100%",
      overflow: "auto",
    },
    partList: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    partContainer: {
      margin: theme.spacing(0.5),
    },
    part: {
      cursor: "pointer",
    },
  });

type Props = AppearanceProps & WithStyles<typeof styles>;

const Appearance: React.FC<Props> = ({ classes, gameObjectId }) => {
  const [tab, setTab] = React.useState(0);
  const {
    templateData: { accessories },
    onTemplateDataModify,
  } = useBehavior(gameObjectId, AccessorizerBehavior);

  const hairOrdinal = getOrdinalOfType(accessories, "hair");
  const headOrdinal = getOrdinalOfType(accessories, "headshape");
  const eyesOrdinal = getOrdinalOfType(accessories, "eyes");

  function setAccessory(type: AccessoryType, ordinal: number) {
    const index = getIndexOfAccessoryType(accessories, type);
    if (index === -1) {
      return;
    }
    const accessoryMod: Record<number, Accessory> = {
      [index]: Accessory(`${type}_${padStart(String(ordinal), 3, "0")}`),
    };
    if (type === "hair") {
      const hatHair = getIndexOfAccessoryType(accessories, "hat_hair");
      if (hatHair !== -1) {
        accessoryMod[hatHair] = Accessory(
          `hat_hair_${padStart(String(ordinal), 3, "0")}`
        );
      }
      const hairAlways = getIndexOfAccessoryType(accessories, "hair_always");
      if (hairAlways !== -1) {
        accessoryMod[hairAlways] = Accessory(
          `hair_always_${padStart(String(ordinal), 3, "0")}`
        );
      }
    }
    if (type === "body") {
      const arm = getIndexOfAccessoryType(accessories, "arm");
      accessoryMod[arm] = Accessory(`arm_${padStart(String(ordinal), 3, "0")}`);
    }
    onTemplateDataModify({
      accessories: merge([], accessories, accessoryMod),
    });
  }

  function makeSetAccessory(type: AccessoryType, ordinal: number) {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setAccessory(type, ordinal);
    };
  }

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs
          textColor="secondary"
          value={tab}
          onChange={(_, value) => setTab(value)}
        >
          <Tab label="Hair" />
          <Tab label="Head" />
          <Tab label="Eyes" />
          {/* Body has now been broken into more parts */}
          {/* <Tab label="Body" /> */}
        </Tabs>
      </Paper>
      <div className={classes.tabContent}>
        {tab === 0 && (
          <div className={classes.partList}>
            {ordinalRange(33).map((ordinal) => (
              <HeadPortrait
                key={ordinal}
                className={classes.partContainer}
                hairOrdinal={ordinal}
                headOrdinal={headOrdinal}
                eyesOrdinal={eyesOrdinal}
                clickable
                onClick={makeSetAccessory("hair", ordinal)}
              />
            ))}
          </div>
        )}
        {tab === 1 && (
          <div className={classes.partList}>
            {ordinalRange(4).map((ordinal) => (
              <HeadPortrait
                key={ordinal}
                className={classes.partContainer}
                hairOrdinal={hairOrdinal}
                headOrdinal={ordinal}
                eyesOrdinal={eyesOrdinal}
                clickable
                onClick={makeSetAccessory("headshape", ordinal)}
              />
            ))}
          </div>
        )}
        {tab === 2 && (
          <div className={classes.partList}>
            {ordinalRange(5).map((ordinal) => (
              <HeadPortrait
                key={ordinal}
                className={classes.partContainer}
                hairOrdinal={hairOrdinal}
                headOrdinal={headOrdinal}
                eyesOrdinal={ordinal}
                clickable
                onClick={makeSetAccessory("eyes", ordinal)}
              />
            ))}
          </div>
        )}
        {/* Body has now been broken into more parts */}
        {/* {tab === 3 && (
          <div className={classes.partList}>
            {ordinalRange(4).map(ordinal => (
              <Portrait
                key={ordinal}
                className={classes.partContainer}
                hairOrdinal={hairOrdinal}
                headOrdinal={headOrdinal}
                eyesOrdinal={eyesOrdinal}
                bodyOrdinal={ordinal}
                clickable
                onClick={makeSetAccessory("body", ordinal)}
              />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};
export default withStyles(styles)(Appearance);

function getOrdinalOfType(
  accessories: Accessory[],
  type: AccessoryType
): number {
  const accessory = getAccessoryOfType(accessories, type);
  if (accessory == null) {
    return 1;
  }

  return ordinalFromAccessory(accessory.guid.Guid);
}

function ordinalFromAccessory(guid: string) {
  const name = getAccessoryName(guid);
  if (!name) {
    return 1;
  }
  const parts = name.split("_");
  return Number(parts[parts.length - 1]);
}

function ordinalRange(length: number): number[] {
  return Array.from({ length }, (_, i) => i + 1);
}
