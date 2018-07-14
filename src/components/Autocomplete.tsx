import * as React from "react";

import ReactAutocomplete from "react-autocomplete";

import styled, { Intent, Background, getTheme, Space } from "@/theme";

import Input, { InputProps } from "@/components/Input";
import Box from "@/components/Box";
import Text from "@/components/Text";

export type AutocompleteProps = Omit<ReactAutocomplete.Props, "renderItem"> & {
  intent?: Intent;
  renderItem?: ReactAutocomplete.Props["renderItem"];
  minLength?: number;
  maxLength?: number;
};

const AutocompleteItem = Text.withComponent("div").extend`
  width: 100%;
  margin: 0 ${props => getTheme(props).space[Space.Small]}px;
`;

const Autocomplete: React.SFC<AutocompleteProps> = props => (
  <ReactAutocomplete
    {...props}
    renderInput={inputProps => <Input {...convertProps(inputProps)} />}
    renderItem={(item, isHighlighted, style) => (
      <AutocompleteItem
        intent={isHighlighted ? Intent.Primary : Intent.Secondary}
      >
        {(props.renderItem || defaultRenderItem)(item, isHighlighted, style)}
      </AutocompleteItem>
    )}
    renderMenu={props.renderMenu || renderMenu.bind(null, props)}
  />
);
Autocomplete.displayName = "Autocomplete";
export default Autocomplete;

function convertProps(
  props: React.HTMLProps<HTMLInputElement>
): Omit<InputProps, "ref"> {
  const { ref, ...rest } = props;
  return {
    ...(rest as any),
    innerRef: props.ref
  };
}

function defaultRenderItem(
  item: any,
  isHighlighted: boolean,
  style?: React.CSSProperties
) {
  style = style || {};
  style.width = "100%";
  return <div style={style}>{item}</div>;
}

const AutocompleteMenu = Box.extend`
  background: ${props => getTheme(props).colors.bg.panel};
  border: ${props => {
    const theme = getTheme(props);
    return `${theme.borders[1]} ${
      theme.colors.intent[props.intent || Intent.Secondary]
    }`;
  }};
  border-top: none;
`;

function renderMenu(
  props: AutocompleteProps,
  items: any[],
  value: string,
  styles: React.CSSProperties
): React.ReactNode {
  // TODO: Portal.
  const elements = items.map((x, i) => <div key={i}>{x}</div>);
  return (
    <AutocompleteMenu intent={props.intent} style={styles}>
      {elements}
    </AutocompleteMenu>
  );
}
