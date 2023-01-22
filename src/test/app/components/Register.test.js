import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import Register from "../../../app/components/Register";

describe("Register", () => {
  it("renders Register component", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    expect(Register).toBeDefined();
  });

  it("displays the register form", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Name")).toHaveAttribute("for", "name");
    expect(getByText("Username")).toBeInTheDocument();
    expect(getByText("Username")).toHaveAttribute("for", "username");
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Email")).toHaveAttribute("for", "email");
    expect(getByText("Password")).toBeInTheDocument();
    expect(getByText("Password")).toHaveAttribute("for", "password");
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  it("rendering and submitting the formik form", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    fireEvent.change(getByTestId("name"), {
      target: { value: "Test Name" },
    });
    fireEvent.change(getByTestId("username"), {
      target: { value: "Test Username" },
    });
    fireEvent.change(getByTestId("email"), {
      target: { value: "test@test.test" },
    });
    fireEvent.change(getByTestId("password"), {
      target: { value: "Test Password" },
    });

    fireEvent.click(getByText("Sign Up"));

    // it should display the error message
    await waitFor(() => {
      expect(getByTestId("message")).toBeInTheDocument();
    });
  });
});