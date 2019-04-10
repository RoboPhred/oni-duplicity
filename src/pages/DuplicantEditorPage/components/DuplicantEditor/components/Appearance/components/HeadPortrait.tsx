import * as React from "react";

import classnames from "classnames";

import { DuplicantContainer, Hair, Head, Eyes } from "react-oni-duplicant";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

export interface HeadPortraitProps {
  className?: string;
  clickable?: boolean;
  hairOrdinal: number;
  headOrdinal: number;
  eyesOrdinal: number;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

const styles = createStyles({
  portraitContainer: {
    position: "relative",
    width: 110,
    height: 100
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

type Props = HeadPortraitProps & WithStyles<typeof styles>;

const HeadPortrait: React.FC<Props> = ({
  className,
  classes,
  hairOrdinal,
  headOrdinal,
  eyesOrdinal,
  clickable,
  onClick
}) => (
  <div
    className={classnames(className, classes.portraitContainer)}
    onClick={onClick}
  >
    <div className={classes.portrait}>
      <DuplicantContainer>
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

export default withStyles(styles)(HeadPortrait);
