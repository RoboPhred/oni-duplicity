export interface AbstractGameObjectProps {
  gameObjectId: number;
  children(props: AbstractGameObjectRenderProps): React.ReactNode;
}
export interface AbstractGameObjectRenderProps {
  gameObjectType: string | null;
}
