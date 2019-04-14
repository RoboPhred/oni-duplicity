import * as React from "react";

import { WithTranslation, withTranslation, Trans } from "react-i18next";

import Chip from "@material-ui/core/Chip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export interface AddTraitButtonProps {
  availableTraits: string[];
  className?: string;
  onAddTrait(trait: string): void;
}

type Props = AddTraitButtonProps & WithTranslation;

const AddTraitButton: React.FC<Props> = ({
  className,
  availableTraits,
  onAddTrait,
  t
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const chipRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <div className={className}>
      <div ref={chipRef}>
        <Chip
          color="primary"
          label={t(`duplicant_trait.verbs.add_titlecase`)}
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
          [...availableTraits].sort().map(trait => (
            <MenuItem
              key={trait}
              value={trait}
              title={t(`oni:DUPLICANTS.TRAITS.${trait.toUpperCase()}.DESC`, {
                defaultValue: ""
              })}
              onClick={() => {
                setIsOpen(false);
                onAddTrait(trait);
              }}
            >
              <Trans
                i18nKey={`oni:DUPLICANTS.TRAITS.${trait.toUpperCase()}.NAME`}
              >
                {trait}
              </Trans>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default withTranslation()(AddTraitButton);
