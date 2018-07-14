type ReactComponentProps<T> = T extends React.ComponentType<infer R>
  ? R
  : never;
