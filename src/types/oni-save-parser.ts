import { BehaviorName, SimHashes } from "oni-save-parser";

// TODO: Move this to official library when its ready
export const SpacecraftManagerBehavior: BehaviorName<
  SpacecraftManagerBehavior
> = "SpacecraftManager";
export interface SpacecraftManagerBehavior {
  name: "SpacecraftManager";
  templateData: {
    spacecraft: any[];
    destinations: SpacecraftDestination[];
  };
}
export interface SpacecraftDestination {
  id: number;
  type: string;
  distance: number;
  activePeriod: number;
  inactivePeriod: number;
  startingOrbitPercentage: number;
  recoverableElements: ([SimHashes, number])[];
  researchOpportunities: SpacecraftResearchOpportunity;
}
export interface SpacecraftResearchOpportunity {
  description: number;
  dataValue: number;
  completed: boolean;
  discoveredRareResource: SimHashes;
  discoveredRareItem: string;
}

/*
// TODO: bombardment status
{
  "name": "SeasonManager",
  "templateData": {
    "currentSeasonIndex": 0,
    "currentSeasonsCyclesElapsed": 0,
    "bombardmentPeriodRemaining": 0,
    "bombardmentOn": true,
    "secondsUntilNextBombardment": 0
  }
  */
