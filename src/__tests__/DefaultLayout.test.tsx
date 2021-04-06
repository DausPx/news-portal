import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React, { Dispatch } from "react";
import DefaultLayout from "../components/DefaultLayout";
import * as reactRedux from "react-redux";
import { actions } from "../actions/constants";

configure({ adapter: new Adapter() });

afterEach(() => {
  jest.clearAllMocks();
});

const mockedPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useHistory: () => ({
    push: mockedPush,
  }),
}));

describe("snapshot testing and Unit Testing", () => {
  // const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  it("renders with children", () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const wrapper = shallow(
      <DefaultLayout>
        <p className="test">Text</p>
      </DefaultLayout>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("onKeyDown is called as inteded", () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    let init = "start";
    useStateSpy.mockImplementation((): [unknown, Dispatch<unknown>] => [
      init,
      setState,
    ]);

    const wrapper = shallow(
      <DefaultLayout>
        <p className="test">Text</p>
      </DefaultLayout>
    );

    wrapper.find("input").simulate("keydown", { key: "Enter" });

    expect(dummyDispatch).toBeCalledTimes(1);

    expect(mockedPush).toBeCalledTimes(1);

    expect(mockedPush).toBeCalledWith("/search");

    expect(dummyDispatch).toBeCalledWith({
      type: actions.SET_SEARCH_QUERY,
      payload: init,
    });
  });

  it("onSearch is called as inteded", () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    let init = "start2";
    useStateSpy.mockImplementation((): [unknown, Dispatch<unknown>] => [
      init,
      setState,
    ]);

    const wrapper = shallow(
      <DefaultLayout>
        <p className="test">Text</p>
      </DefaultLayout>
    );

    wrapper.find("button").simulate("click");

    expect(dummyDispatch).toBeCalledTimes(1);

    expect(mockedPush).toBeCalledTimes(1);

    expect(mockedPush).toBeCalledWith("/search");

    expect(dummyDispatch).toBeCalledWith({
      type: actions.SET_SEARCH_QUERY,
      payload: init,
    });
  });

  it("onChange is called as inteded", () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    let init = "start2";
    useStateSpy.mockImplementation((): [unknown, Dispatch<unknown>] => [
      init,
      setState,
    ]);

    const wrapper = shallow(
      <DefaultLayout>
        <p className="test">Text</p>
      </DefaultLayout>
    );

    wrapper.find("input").simulate("change", { target: { value: "test" } });

    expect(setState).toBeCalledWith("test");
  });
});
