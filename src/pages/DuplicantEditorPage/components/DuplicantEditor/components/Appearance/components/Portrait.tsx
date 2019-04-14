import * as React from "react";

import classnames from "classnames";

import {
  DuplicantContainer,
  Hair,
  Head,
  Eyes,
  Body
} from "react-oni-duplicant";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

export interface PortraitProps {
  className?: string;
  clickable?: boolean;
  hairOrdinal: number;
  headOrdinal: number;
  eyesOrdinal: number;
  bodyOrdinal: number;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

const styles = createStyles({
  portraitContainer: {
    position: "relative",
    width: 110,
    height: 140
  },
  portrait: {
    position: "absolute",
    top: 85,
    left: 56,
    width: 250,
    height: 250,
    transform: "scale(.4)",
    transformOrigin: "top left"
  },
  clickable: {
    cursor: "pointer"
  }
});

type Props = PortraitProps & WithStyles<typeof styles>;

const Portrait: React.FC<Props> = ({
  className,
  classes,
  hairOrdinal,
  headOrdinal,
  eyesOrdinal,
  bodyOrdinal,
  clickable,
  onClick
}) => (
  <div
    className={classnames(className, classes.portraitContainer)}
    onClick={onClick}
  >
    <div className={classes.portrait}>
      <DuplicantContainer>
        <Body
          className={classnames(clickable && classes.clickable)}
          ordinal={bodyOrdinal}
        />
        <Head
          className={classnames(clickable && classes.clickable)}
          ordinal={headOrdinal}
        />
        <Eyes
          className={classnames(clickable && classes.clickable)}
          ordinal={eyesOrdinal}
        />
        <Hair
          className={classnames(clickable && classes.clickable)}
          ordinal={hairOrdinal}
        />
      </DuplicantContainer>
    </div>
  </div>
);

export default withStyles(styles)(Portrait);
