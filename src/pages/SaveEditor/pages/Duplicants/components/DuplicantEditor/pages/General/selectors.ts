
import { createStructuredSelector } from "../../../../../../../../state/utils";

import { AttributeLevel } from "../../../../../../../../services/save-editor/behaviors";
import { Gender } from "../../../../../../../../services/save-editor/duplicants/interfaces";
import {
    makeGetDuplicantByID,
    makeGetDuplicantGender,
    makeGetDuplicantVoice,
    makeGetDuplicantScale,
    makeGetDuplicantHealthState
} from "../../../../../../../../services/save-editor/duplicants/selectors";

import Props from "./props";
import { Vector3 } from "oni-save-parser/dts/interfaces";

export interface StateProps {
    gender: Gender | null;
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
