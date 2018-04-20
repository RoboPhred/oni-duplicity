
import * as React from "react";
import { observer, inject } from "mobx-react";
import { SaveEditor } from "./interfaces";

export * from "./interfaces";

export { SaveEditorImpl } from "./save-editor";

export interface SaveEditorProps {
    saveEditor: SaveEditor;
}

type Omit<T, K extends keyof T> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;
export function withSaveEditor<TProps extends SaveEditorProps>(WrappedComponent: React.ComponentClass<TProps>): React.ComponentClass<Omit<TProps, "saveEditor">> {
    @inject("saveEditor")
    class WithSaveEditor extends React.Component<Omit<TProps, "saveEditor">> {
        render() {
            return (
                <WrappedComponent {...this.props as any} />
            );
        }

        private _setObserver() {

        }
    };
    return WithSaveEditor;
}
