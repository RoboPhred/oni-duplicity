import { connect } from "react-redux";

// http://griddlegriddle.github.io/Griddle/examples/getDataFromRowIntoCell/

const rowDataSelector = (
  state: any,
  { griddleKey }: { griddleKey: string }
) => {
  return state
    .get("data")
    .find((rowMap: any) => rowMap.get("griddleKey") === griddleKey)
    .toJSON();
};

const enhancedWithRowData = connect((state, props: any) => {
  return {
    rowData: rowDataSelector(state, props)
  };
});
export default enhancedWithRowData;
