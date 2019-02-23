import * as React from "react";

import FormGroup from "@material-ui/core/FormGroup";

import DuplicantModifier from "./components/DuplicantModifier";

export interface ModifiersTabProps {
  gameObjectId: number;
}

const ModifiersTab: React.SFC<ModifiersTabProps> = ({ gameObjectId }) => (
  <FormGroup>
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="HitPoints" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Stamina" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Calories" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="ImmuneLevel" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Breath" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Stress" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Toxicity" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Bladder" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Temperature" />
    <DuplicantModifier
      gameObjectId={gameObjectId}
      modifierId="ExternalTemperature"
    />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Decor" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="FoodPoisoning" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="ColdBrain" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="HeatRash" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="SlimeLung" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Sunburn" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="PutridOdour" />
    <DuplicantModifier gameObjectId={gameObjectId} modifierId="Spores" />
  </FormGroup>
);

export default ModifiersTab;
