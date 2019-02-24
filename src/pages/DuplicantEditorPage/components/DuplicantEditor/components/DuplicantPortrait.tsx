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
    width: 100,
    height: 160
  },
  portrait: {
    position: "absolute",
    left: 50,
    top: 65,
    width: 250,
    height: 250,
    transform: "scale(.4)",
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
