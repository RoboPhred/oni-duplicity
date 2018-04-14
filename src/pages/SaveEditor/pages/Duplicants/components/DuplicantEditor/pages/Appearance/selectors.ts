
import { createStructuredSelector } from "../../../../../../../../state/utils";

import { makeGetDuplicantByID } from "../../../../../../../../services/save-editor/duplicants/selectors";
import {
    makeGetDuplicantEyes,
    makeGetDuplicantHair,
    makeGetDuplicantHead,
    makeGetDuplicantMouth,
    makeGetDuplicantBody
} from "../../../../../../../../services/save-editor/duplicants/appearance/selectors";

import Props from "./props";

export interface StateProps {
    eyes: string | null;
    hair: string | null;
    head: string | null;
    mouth: string | null;
    body: string | null;
}

const mapStateToProps = () => {
    const dupSelector = makeGetDuplicantByID("duplicantID");
    return createStructuredSelector<Props, StateProps>({
        eyes: makeGetDuplicantEyes(dupSelector),
        hair: makeGetDuplicantHair(dupSelector),
        head: makeGetDuplicantHead(dupSelector),
        mouth: makeGetDuplicantMouth(dupSelector),
        body: makeGetDuplicantBody(dupSelector)
    });
}
export default mapStateToProps;
