import * as React from "react";
import { AccessorizerBehavior, getAccessoryOfType } from "oni-save-parser";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import {
  DuplicantContainer,
  Hair,
  Head,
  Eyes,
  Body
} from "react-oni-duplicant";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const AccessorizerEditor = AbstractBehaviorEditor.ofType(AccessorizerBehavior);

export interface DuplicantPortraitProps {
  gameObjectId: number;
  scale: number;
}

const styles = createStyles({
  portraitContainer: {
    position: "relative"
    // width: 80,
    // height: 90
  },
  portrait: {
    position: "absolute",
    // left: 42,
    // top: 50,
    width: 0,
    height: 0,
    // transform: "scale(.3)",
    transformOrigin: "top left"
  }
});

type Props = DuplicantPortraitProps & WithStyles<typeof styles>;

const DuplicantPortrait: React.FC<Props> = ({
  classes,
  gameObjectId,
  scale
}) => (
  <AccessorizerEditor gameObjectId={gameObjectId}>
    {({ templateData }) => {
      if (!templateData) {
        return <div>Error: No Data</div>;
      }
      return (
        <div
          className={classes.portraitContainer}
          style={{ width: 240 * scale, height: 270 * scale }}
        >
          <div
            className={classes.portrait}
            style={{
              left: 126 * scale,
              top: 150 * scale,
              transform: `scale(${scale})`
            }}
          >
            <DuplicantContainer>
              <Body
                ordinal={ordinalFromAccessory(
                  getAccessoryOfType(templateData.accessories, "body")!.guid
                    .Guid
                )}
              />
              <Head
                ordinal={ordinalFromAccessory(
                  getAccessoryOfType(templateData.accessories, "headshape")!
                    .guid.Guid
                )}
              />
              <Eyes
                ordinal={ordinalFromAccessory(
                  getAccessoryOfType(templateData.accessories, "eyes")!.guid
                    .Guid
                )}
              />
              <Hair
                ordinal={ordinalFromAccessory(
                  getAccessoryOfType(templateData.accessories, "hair")!.guid
                    .Guid
                )}
              />
            </DuplicantContainer>
          </div>
        </div>
      );
    }}
  </AccessorizerEditor>
);
export default withStyles(styles)(DuplicantPortrait);

function ordinalFromAccessory(guid: string) {
  let parts = guid.split(".");
  const name = parts[parts.length - 1];
  parts = name.split("_");
  return Number(parts[parts.length - 1]);
}
