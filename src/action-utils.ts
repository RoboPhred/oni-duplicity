
import { createAction as createReduxAction } from "redux-actions";

// We can do this better than the Action type of redux-actions:
//  - Create a discriminated union on explicit 'type' types for use in reducers.
//  - inferr the action typedef and payload shape using TS 2.8's ReturnType / infer keyword.
// This gets us very close, but hides the parameter names for our payload creator.
//  To get around this, we just use one argument that contains the payload.  This
//  lets us expose the names as well as the types, at the cost of having to pass in data
//  in object form.


export interface NamedAction<TName extends string, TPayload> {
    type: TName;
    payload: TPayload;
}


export function createAction<TName extends string, TPayload, T1>(name: TName, payloadCreator: (arg1: T1) => TPayload): (arg1: T1) => NamedAction<TName, TPayload>;
export function createAction<TName extends string, TPayload>(name: TName, payloadCreator: (...args: any[]) => TPayload): (...args: any[]) => NamedAction<TName, TPayload> {
    return createReduxAction(name, payloadCreator) as any;
}
