
import { createStructuredSelector } from "@/state/utils";

import {
    cycles,
    nextSpawn,
    isSpawnReady
} from "@/services/save-editor/general/selectors";

export interface StateProps {
    cycles: number;
    nextSpawn: number;
    isSpawnReady: boolean;
}
export default createStructuredSelector<StateProps>({
    cycles,
    nextSpawn,
    isSpawnReady
});
