import * as React from "react";

import { WithTranslation, withTranslation, Trans } from "react-i18next";

import Chip from "@material-ui/core/Chip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export interface AddAptitudeButtonProps {
  availableAptitudes: string[];
  className?: string;
  onAddAptitude(aptitude: string): void;
}

type Props = AddAptitudeButtonProps & WithTranslation;

const AddAptitudeButton: React.FC<Props> = ({
  className,
  availableAptitudes,
  onAddAptitude,
  t
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const chipRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <div className={className}>
      <div ref={chipRef}>
        <Chip
          color="primary"
          label={t(`duplicant_interest.verbs.add_titlecase`)}
          clickable
          onClick={() => setIsOpen(true)}
        />
      </div>
      <Menu
        open={isOpen}
        anchorEl={chipRef.current}
        onClose={() => setIsOpen(false)}
      >
        {isOpen &&
          [...availableAptitudes].sort().map(trait => (
            <MenuItem
              key={trait}
              value={trait}
              title={t(`oni:DUPLICANTS.APTITUDES.${trait.toUpperCase()}.DESC`, {
                defaultValue: ""
              })}
              onClick={() => {
                setIsOpen(false);
                onAddAptitude(trait);
              }}
            >
              <Trans
                i18nKey={`oni:DUPLICANTS.APTITUDES.${trait.toUpperCase()}.NAME`}
              >
                {trait}
              </Trans>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default withTranslation()(AddAptitudeButton);
