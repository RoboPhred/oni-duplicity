
import { AttributeLevel } from "oni-save-parser";

import { createStructuredSelector } from "@/state/utils";
import { makeGetDuplicantSkills } from "@/services/save-editor/duplicants/selectors";

import Props from "./props";

export interface StateProps {
    skills: AttributeLevel[];
}

const mapStateToProps = () => createStructuredSelector<Props, StateProps>({
    skills: makeGetDuplicantSkills<Props>("duplicantID")
});
export default mapStateToProps;
