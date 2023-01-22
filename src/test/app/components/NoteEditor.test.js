import React from "react";
import { render } from "@testing-library/react";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import Editor from "../../../app/components/NoteEditor";

describe("Editor", () => {
  it("renders Editor component", () => {
    render(
      <Provider store={store}>
        <Editor />
      </Provider>
    );

    expect(Editor).toBeDefined();
  });
});