import * as React from "react";
import {
  AccessorizerBehavior,
  getAccessoryOfType,
  Accessory,
  AccessoryType,
  getAccessoryName,
  getIndexOfAccessoryType
} from "oni-save-parser";
import { merge, padStart } from "lodash-es";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const AccessorizerEditor = AbstractBehaviorEditor.ofType(AccessorizerBehavior);

import HeadPortrait from "./components/HeadPortrait";
import Portrait from "./components/Portrait";

export interface AppearanceTabProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    partList: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      margin: -theme.spacing.unit / 2
    },
    partContainer: {
      margin: theme.spacing.unit / 2
    },
    part: {
      cursor: "pointer"
    }
  });

const expandIcon = <ExpandMoreIcon />;

type Props = AppearanceTabProps & StyleProps<typeof styles>;
const AppearanceTab: React.SFC<Props> = ({ classes, gameObjectId }) => {
  const [selectedPanel, setSelectedPanel] = React.useState(0);
  function toggleSelected(index: number) {
    if (selectedPanel !== index) {
      setSelectedPanel(index);
    } else {
      setSelectedPanel(0);
    }
  }

  return (
    <AccessorizerEditor gameObjectId={gameObjectId}>
      {({ templateData: { accessories }, onTemplateDataModify }) => {
        const hairOrdinal = getOrdinalOfType(accessories, "hair");
        const headOrdinal = getOrdinalOfType(accessories, "headshape");
        const eyesOrdinal = getOrdinalOfType(accessories, "eyes");

        function setAccessory(type: AccessoryType, ordinal: number) {
          const index = getIndexOfAccessoryType(accessories, type);
          if (index === -1) {
            return;
          }
          const accessoryMod: Record<number, Accessory> = {
            [index]: Accessory(`${type}_${padStart(String(ordinal), 3, "0")}`)
          };
          if (type === "hair") {
            const hatHair = getIndexOfAccessoryType(accessories, "hat_hair");
            if (hatHair !== -1) {
              accessoryMod[hatHair] = Accessory(
                `hat_hair_${padStart(String(ordinal), 3, "0")}`
              );
            }
            const hairAlways = getIndexOfAccessoryType(
              accessories,
              "hair_always"
            );
            if (hairAlways !== -1) {
              accessoryMod[hairAlways] = Accessory(
                `hair_always_${padStart(String(ordinal), 3, "0")}`
              );
            }
          }
          onTemplateDataModify({
            accessories: merge([], accessories, accessoryMod)
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
            <ExpansionPanel
              expanded={selectedPanel === 1}
              onClick={() => toggleSelected(1)}
            >
              <ExpansionPanelSummary expandIcon={expandIcon}>
                <Typography className={classes.heading}>Hair</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.partList}>
                  {ordinalRange(33).map(ordinal => (
                    <HeadPortrait
                      className={classes.partContainer}
                      hairOrdinal={ordinal}
                      headOrdinal={headOrdinal}
                      eyesOrdinal={eyesOrdinal}
                      clickable
                      onClick={makeSetAccessory("hair", ordinal)}
                    />
                  ))}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={selectedPanel === 2}
              onClick={() => toggleSelected(2)}
            >
              <ExpansionPanelSummary expandIcon={expandIcon}>
                <Typography className={classes.heading}>Head</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.partList}>
                  {ordinalRange(4).map(ordinal => (
                    <HeadPortrait
                      className={classes.partContainer}
                      hairOrdinal={hairOrdinal}
                      headOrdinal={ordinal}
                      eyesOrdinal={eyesOrdinal}
                      clickable
                      onClick={makeSetAccessory("headshape", ordinal)}
                    />
                  ))}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={selectedPanel === 3}
              onClick={() => toggleSelected(3)}
            >
              <ExpansionPanelSummary expandIcon={expandIcon}>
                <Typography className={classes.heading}>Eyes</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.partList}>
                  {ordinalRange(5).map(ordinal => (
                    <HeadPortrait
                      className={classes.partContainer}
                      hairOrdinal={hairOrdinal}
                      headOrdinal={headOrdinal}
                      eyesOrdinal={ordinal}
                      clickable
                      onClick={makeSetAccessory("eyes", ordinal)}
                    />
                  ))}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={selectedPanel === 4}
              onClick={() => toggleSelected(4)}
            >
              <ExpansionPanelSummary expandIcon={expandIcon}>
                <Typography className={classes.heading}>Body</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.partList}>
                  {ordinalRange(4).map(ordinal => (
                    <Portrait
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
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        );
      }}
    </AccessorizerEditor>
  );
};
export default withStyles(styles)(AppearanceTab);

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
