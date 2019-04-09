export interface AbstractPathSelectorProps {
  path: string[];
  onChange(path: string[]): void;
  children(props: AbstractPathSelectorRenderProps): React.ReactChild;
}

export interface PathMenuItemProps {
  label: string;
  onClick(): void;
}
export interface AbstractPathSelectorRenderProps {
  pathMenu: PathMenuItemProps[];
  nextItemMenu: PathMenuItemProps[];
}
