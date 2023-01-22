import React from "react";
import { render } from "@testing-library/react";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import Home from "../../../app/components/Home";

describe("Home", () => {
  it("renders Home component", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(Home).toBeDefined();
  });
});