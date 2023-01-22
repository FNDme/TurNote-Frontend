import React from "react";
import { render } from "@testing-library/react";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import Note from "../../../app/components/NoteView";
describe("Note", () => {
  it("renders Note component", () => {
    render(
      <Provider store={store}>
        <Note />
      </Provider>
    );

    expect(Note).toBeDefined();
  });
});