
import * as mobx from "mobx";
mobx.configure({
    enforceActions: true
});

import { createStore as createSaveEditorStore } from "./services/save-editor/store";

export function createStores() {
    return {
        saveEditor: createSaveEditorStore()
    };
}
