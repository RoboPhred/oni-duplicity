
import { createStructuredSelector } from "../../../../../../../../state/utils";

import { AttributeLevel } from "../../../../../../../../services/save-editor/behaviors";
import { makeGetDuplicantSkills } from "../../../../../../../../services/save-editor/duplicants/selectors";

import Props from "./props";

export interface StateProps {
    skills: AttributeLevel[];
}

const mapStateToProps = () => createStructuredSelector<Props, StateProps>({
    skills: makeGetDuplicantSkills<Props>("duplicantID")
});
export default mapStateToProps;
