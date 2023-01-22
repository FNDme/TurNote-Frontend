import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import Profile from "../../../app/components/Profile";
import { useSelector } from "react-redux";


describe("Profile", () => {
  it("if not logged in, displays an error message", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    expect(getByText("You are not logged in.")).toBeInTheDocument();
  });
});
