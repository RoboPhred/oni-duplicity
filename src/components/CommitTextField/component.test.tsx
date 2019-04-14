import * as React from "react";

import { shallow } from "@/enzyme";

import CommitTextField from "./component";

describe("CommitTextField", () => {
  it("forwards calls to onChange", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <CommitTextField id="commit-text-field" onChange={onChange} />
    );

    const input = wrapper.find("#commit-text-field");

    const testInput = "test input";

    input.simulate("change", { target: { value: testInput } });

    expect(onChange).toBeCalledWith({ target: { value: testInput } });
  });

  it("does not call onCommit on change", () => {
    const onCommit = jest.fn();
    const wrapper = shallow(
      <CommitTextField id="commit-text-field" onCommit={onCommit} />
    );

    const input = wrapper.find("#commit-text-field");

    const testInput = "test input";

    input.simulate("change", { target: { value: testInput } });

    expect(onCommit).not.toBeCalled();
  });

  it("calls onCommit on enter key pressed", () => {
    const onCommit = jest.fn();
    const wrapper = shallow(
      <CommitTextField id="commit-text-field" onCommit={onCommit} />
    );

    const input = wrapper.find("#commit-text-field");

    const testInput = "test input";

    input.simulate("change", { target: { value: testInput } });

    expect(onCommit).not.toBeCalled();

    input.simulate("keypress", { key: "Enter" });

    expect(onCommit).toBeCalledWith(testInput);
  });

  it("calls onCommit on blur", () => {
    const onCommit = jest.fn();
    const wrapper = shallow(
      <CommitTextField id="commit-text-field" onCommit={onCommit} />
    );

    const input = wrapper.find("#commit-text-field");

    const testInput = "test input";

    input.simulate("change", { target: { value: testInput } });

    expect(onCommit).not.toBeCalled();

    input.simulate("blur");

    expect(onCommit).toBeCalledWith(testInput);
  });
});
