import React from "react";
import { render } from "@testing-library/react";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import Login from "../../../app/components/Login";

describe("Login", () => {
  it("renders Login component", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(Login).toBeDefined();
  });
});