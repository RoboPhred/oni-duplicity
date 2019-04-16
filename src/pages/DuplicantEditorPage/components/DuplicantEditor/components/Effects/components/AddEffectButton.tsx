import * as React from "react";
import { AI_EFFECT_IDS, AIEffectsBehavior } from "oni-save-parser";
import { difference } from "lodash-es";

import { Trans } from "react-i18next";

import Button from "@material-ui/core/Button";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";
import AddEffectDialog from "./AddEffectDialog";

const EffectsEditor = AbstractBehaviorEditor.ofType(AIEffectsBehavior);

export interface AddEffectButtonProps {
  gameObjectId: number;
}

type Props = AddEffectButtonProps;
const AddEffectButton: React.FC<Props> = ({ gameObjectId }) => {
  const [isAddingEffect, setIsAddingEffect] = React.useState(false);
  return (
    <EffectsEditor gameObjectId={gameObjectId}>
      {({ templateData, onTemplateDataModify }) => {
        const currentEffects = templateData.saveLoadEffects.map(x => x.id);
        const availableEffects = difference(AI_EFFECT_IDS, currentEffects);
        return (
          <React.Fragment>
            <Button color="primary" onClick={() => setIsAddingEffect(true)}>
              <Trans i18nKey="duplicant_effects.verbs.add_titlecase">
                Add Effect
              </Trans>
            </Button>
            <AddEffectDialog
              open={isAddingEffect}
              availableEffects={availableEffects}
              onClose={() => setIsAddingEffect(false)}
              onAddEffect={(id, timeRemaining) => {
                setIsAddingEffect(false);
                onTemplateDataModify({
                  saveLoadEffects: [
                    ...templateData.saveLoadEffects,
                    { id, timeRemaining }
                  ]
                });
              }}
            />
          </React.Fragment>
        );
      }}
    </EffectsEditor>
  );
};

export default AddEffectButton;
