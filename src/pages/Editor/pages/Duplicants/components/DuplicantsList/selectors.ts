
import { GameObject } from "oni-save-parser";

import { createStructuredSelector } from "../../../../../../state/utils";

import { minions } from "../../../../utils/selectors";

export interface StateProps {
    minions: GameObject[];
}

const mapStateToProps = createStructuredSelector<StateProps>({
    minions
});
export default mapStateToProps;
