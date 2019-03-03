export interface AbstractGameObjectListProps {
  gameObjectType: string | string[];
  children(props: AbstractGameObjectListRenderProps): React.ReactChild;
}

export interface AbstractGameObjectListRenderProps {
  gameObjectIds: number[];
}
