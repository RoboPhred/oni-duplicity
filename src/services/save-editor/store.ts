
import { SaveEditor } from "./interfaces";
import { SaveEditorImpl } from "./save-editor";

export function createStore(): SaveEditor {
    return new SaveEditorImpl();
}