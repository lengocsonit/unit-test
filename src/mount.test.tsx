import React from "react";
import { CircularProgress } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { store } from "./stores/store";
import { Provider } from "react-redux";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import Composer from "./Conposer";
import { act } from "react-dom/test-utils";

let mount: any;

beforeAll(() => {
  mount = createMount();
});

let wrapper: any;
beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <Composer />
    </Provider>
  );
});

describe("<Composition />", () => {
  it("should render CircularProgress", () => {
    // No longer need to dive().
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });

  it("should show error when entered", () => {
    wrapper
      .find(TextField)
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "123" } });
    act(() =>
      wrapper
        .find(TextField)
        .at(0)
        .props()
        .onChange({ target: { value: "123" } })
    );
    wrapper
      .find(TextField)
      .at(0)
      .props()
      .onChange({ target: { value: "123" } });
    console.log(wrapper.find(TextField).find("input").at(0).props());
    expect(wrapper).toMatchSnapshot();
    console.log(wrapper.find(TextField).find("input").at(0).props());
    expect(wrapper.find(TextField).find("input").at(0).props().value).toBe("");
  });
});
