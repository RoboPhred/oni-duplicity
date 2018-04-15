
import { MinionGender, Vector3, AttributeLevel } from "oni-save-parser";

import { createStructuredSelector } from "@/state/utils";

import {
    makeGetDuplicantByID,
    makeGetDuplicantGender,
    makeGetDuplicantVoice,
    makeGetDuplicantScale,
    makeGetDuplicantHealthState
} from "@/services/save-editor/duplicants/selectors";

import Props from "./props";

export interface StateProps {
    gender: MinionGender | null;
    voiceIdx: number | null;
    scale: Vector3 | null;
    healthState: number | null;
}

const mapStateToProps = () => {
    const dupSelector = makeGetDuplicantByID("duplicantID");
    return createStructuredSelector<Props, StateProps>({
        gender: makeGetDuplicantGender(dupSelector),
        voiceIdx: makeGetDuplicantVoice(dupSelector),
        scale: makeGetDuplicantScale(dupSelector),
        healthState: makeGetDuplicantHealthState(dupSelector)
    });
}
export default mapStateToProps;
