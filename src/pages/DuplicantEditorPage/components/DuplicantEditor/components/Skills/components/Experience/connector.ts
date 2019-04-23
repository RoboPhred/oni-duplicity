import { MinionResumeBehavior } from "oni-save-parser";
import { createSelector } from "reselect";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";
import { getBehaviorSelector } from "@/services/oni-save/selectors/behaviors";
import { modifyBehaviorPath } from "@/services/oni-save/actions/modify-behavior-path";

export interface ExperienceConnectorProps {
  gameObjectId: number;
}

const experienceSelector = createSelector(
  getBehaviorSelector(MinionResumeBehavior),
  resume => {
    if (!resume) {
      return 0;
    }
    return resume.templateData.totalExperienceGained;
  }
);

const mapStateToProps = createStructuredSelector({
  experience: experienceSelector
});

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: ExperienceConnectorProps
) {
  const { gameObjectId } = ownProps;
  return {
    setExperience(experience: number) {
      if (experience < 0) {
        experience = 0;
      }

      const action = modifyBehaviorPath(
        gameObjectId,
        MinionResumeBehavior,
        ["templateData", "totalExperienceGained"],
        experience
      );

      dispatch(action);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
