import * as React from "react";
import { AccessorizerBehavior, getAccessoryOfType } from "oni-save-parser";

import { createStyles, withStyles } from "@material-ui/core/styles";

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
}

const styles = createStyles({
  portraitContainer: {
    position: "relative",
    width: 173,
    height: 190
  },
  portrait: {
    position: "absolute",
    overflow: "visible",
    width: 0,
    height: 0,
    left: 90,
    top: 115,
    transform: "scale(.6)",
    transformOrigin: "top left"
  }
});

type Props = DuplicantPortraitProps & StyleProps<typeof styles>;
const DuplicantPortrait: React.SFC<Props> = ({ classes, gameObjectId }) => (
  <AccessorizerEditor gameObjectId={gameObjectId}>
    {({ templateData }) => (
      <div className={classes.portraitContainer}>
        <div className={classes.portrait}>
          <DuplicantContainer>
            <Body
              ordinal={ordinalFromAccessory(
                getAccessoryOfType(templateData.accessories, "body")!.guid.Guid
              )}
            />
            <Head
              ordinal={ordinalFromAccessory(
                getAccessoryOfType(templateData.accessories, "headshape")!.guid
                  .Guid
              )}
            />
            <Eyes
              ordinal={ordinalFromAccessory(
                getAccessoryOfType(templateData.accessories, "eyes")!.guid.Guid
              )}
            />
            <Hair
              ordinal={ordinalFromAccessory(
                getAccessoryOfType(templateData.accessories, "hair")!.guid.Guid
              )}
            />
          </DuplicantContainer>
        </div>
      </div>
    )}
  </AccessorizerEditor>
);
export default withStyles(styles)(DuplicantPortrait);

function ordinalFromAccessory(guid: string) {
  let parts = guid.split(".");
  const name = parts[parts.length - 1];
  parts = name.split("_");
  return Number(parts[parts.length - 1]);
}
