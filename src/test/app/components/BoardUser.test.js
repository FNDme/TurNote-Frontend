import React from "react";
import { render } from "@testing-library/react";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import BoardUser from "../../../app/components/BoardUser";

describe("BoardUser", () => {
  it("renders BoardUser component", () => {
    render(
      <Provider store={store}>
        <BoardUser />
      </Provider>
    );

    expect(BoardUser).toBeDefined();
  });
});