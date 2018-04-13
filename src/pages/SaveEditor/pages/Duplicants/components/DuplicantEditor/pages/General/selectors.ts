
import { createStructuredSelector } from "../../../../../../../../state/utils";

import { AttributeLevel } from "../../../../../../../../services/save-editor/behaviors";
import {
    makeGetDuplicantByID,
    makeGetDuplicantHealthStateByID,
    makeGetDuplicantScaleByID
} from "../../../../../../../../services/save-editor/duplicants/selectors";

import Props from "./props";
import { Vector3 } from "oni-save-parser/dts/interfaces";

export interface StateProps {
    scale: Vector3 | null;
    healthState: number | null;
}

const mapStateToProps = () => {
    const dupSelector = makeGetDuplicantByID("duplicantID");
    return createStructuredSelector<Props, StateProps>({
        scale: makeGetDuplicantScaleByID(dupSelector),
        healthState: makeGetDuplicantHealthStateByID(dupSelector)
    });
}
export default mapStateToProps;
