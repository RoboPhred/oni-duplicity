import * as React from "react";

import {
  connect,
  MapStateToPropsParam,
  MapDispatchToPropsNonObject,
  Options,
  ResolveThunks,
  DispatchProp,
  MergeProps,
  MapDispatchToPropsParam
} from "react-redux";

export type ConnectedRenderComponentProps<
  TInjectProps,
  TOwnProps
> = TOwnProps & { children(props: TInjectProps): React.ReactChild };

export type ConnectedRenderComponent<
  TInjectProps,
  TOwnProps
> = React.ComponentType<ConnectedRenderComponentProps<TInjectProps, TOwnProps>>;

export function connectRenderComponent<
  TStateProps = {},
  no_dispatch = {},
  TOwnProps = {},
  State = {}
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>
): ConnectedRenderComponent<TStateProps & DispatchProp, TOwnProps>;

export function connectRenderComponent<
  no_state = {},
  TDispatchProps = {},
  TOwnProps = {}
>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>
): ConnectedRenderComponent<TDispatchProps, TOwnProps>;

export function connectRenderComponent<
  no_state = {},
  TDispatchProps = {},
  TOwnProps = {}
>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: TDispatchProps
): ConnectedRenderComponent<ResolveThunks<TDispatchProps>, TOwnProps>;

export function connectRenderComponent<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  State = {}
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>
): ConnectedRenderComponent<TStateProps & TDispatchProps, TOwnProps>;

export function connectRenderComponent<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  State = {}
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: TDispatchProps
): ConnectedRenderComponent<
  TStateProps & ResolveThunks<TDispatchProps>,
  TOwnProps
>;

export function connectRenderComponent<
  TStateProps = {},
  no_dispatch = {},
  TOwnProps = {},
  TMergedProps = {},
  State = {}
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: null | undefined,
  mergeProps: MergeProps<TStateProps, undefined, TOwnProps, TMergedProps>
): ConnectedRenderComponent<TMergedProps, TOwnProps>;

export function connectRenderComponent<
  no_state = {},
  TDispatchProps = {},
  TOwnProps = {},
  TMergedProps = {}
>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps: MergeProps<undefined, TDispatchProps, TOwnProps, TMergedProps>
): ConnectedRenderComponent<TMergedProps, TOwnProps>;

export function connectRenderComponent<
  no_state = {},
  no_dispatch = {},
  TOwnProps = {},
  TMergedProps = {}
>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: null | undefined,
  mergeProps: MergeProps<undefined, undefined, TOwnProps, TMergedProps>
): ConnectedRenderComponent<TMergedProps, TOwnProps>;

export function connectRenderComponent<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  TMergedProps = {},
  State = {}
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
  options?: Options<State, TStateProps, TOwnProps, TMergedProps>
): ConnectedRenderComponent<TMergedProps, TOwnProps>;

export function connectRenderComponent<
  TStateProps = {},
  no_dispatch = {},
  TOwnProps = {},
  State = {}
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: null | undefined,
  mergeProps: null | undefined,
  options: Options<State, TStateProps, TOwnProps>
): ConnectedRenderComponent<DispatchProp & TStateProps, TOwnProps>;

export function connectRenderComponent<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {}
>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
  mergeProps: null | undefined,
  options: Options<{}, TStateProps, TOwnProps>
): ConnectedRenderComponent<TDispatchProps, TOwnProps>;

export function connectRenderComponent<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {}
>(
  mapStateToProps: null | undefined,
  mapDispatchToProps: TDispatchProps,
  mergeProps: null | undefined,
  options: Options<{}, TStateProps, TOwnProps>
): ConnectedRenderComponent<ResolveThunks<TDispatchProps>, TOwnProps>;

export function connectRenderComponent<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  State = {}
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
  mergeProps: null | undefined,
  options: Options<State, TStateProps, TOwnProps>
): ConnectedRenderComponent<TStateProps & TDispatchProps, TOwnProps>;

export function connectRenderComponent<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  State = {}
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: TDispatchProps,
  mergeProps: null | undefined,
  options: Options<State, TStateProps, TOwnProps>
): ConnectedRenderComponent<
  TStateProps & ResolveThunks<TDispatchProps>,
  TOwnProps
>;

export function connectRenderComponent(
  mapStateToProps: any,
  mapDispatchToProps?: any
): React.ComponentType<any> {
  const ConnectedRenderComponent: React.SFC = (
    props: ConnectedRenderComponentProps<any, any>
  ) => <>{props.children(...props)}</>;
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedRenderComponent);
}
