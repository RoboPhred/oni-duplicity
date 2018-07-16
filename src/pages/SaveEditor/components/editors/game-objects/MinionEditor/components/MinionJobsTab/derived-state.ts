import { createStructuredSelector, createSelector } from "reselect";

import { MinionResumeBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { getCurrentGameObjectBehaviorPropertySelector } from "@/selectors/behaviors/utils";

const masteriesSelector = getCurrentGameObjectBehaviorPropertySelector<
  MinionResumeBehavior,
  MinionResumeBehavior["templateData"]["MasteryByRoleID"]
>(MinionResumeBehavior, ["templateData", "MasteryByRoleID"]);

const experienceSelector = getCurrentGameObjectBehaviorPropertySelector<
  MinionResumeBehavior,
  MinionResumeBehavior["templateData"]["ExperienceByRoleID"]
>(MinionResumeBehavior, ["templateData", "ExperienceByRoleID"]);

export interface Job {
  id: string;
  mastery: boolean;
  masteryIndex: number;
  experience: number;
  experienceIndex: number;
}
export type Jobs = Job[];
const jobsSelector = createSelector(
  masteriesSelector,
  experienceSelector,
  (masteries, experience) => {
    if (!masteries || !experience) {
      return null;
    }

    const jobs: Record<string, Job> = {};

    masteries.forEach((x, i) => {
      const [key, value] = x;
      if (key === "NoRole") {
        return;
      }
      jobs[key] = {
        id: key,
        mastery: value,
        masteryIndex: i,
        experience: 0,
        experienceIndex: -1
      };
    });

    experience.forEach((x, i) => {
      const [key, value] = x;
      if (key === "NoRole") {
        return;
      }
      jobs[key].experience = value;
      jobs[key].experienceIndex = i;
    });

    return Object.keys(jobs).map(x => jobs[x]);
  }
);

const structuredSelector = {
  jobs: jobsSelector
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
