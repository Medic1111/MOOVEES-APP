import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Runnin tests on the App component", () => {
  test("Sign up appears as a button", () => {
    render(<App />);
    const signUpBtn = screen.queryByText("Sign Up");
    expect(signUpBtn).not.toBeNull();
  });

  test("Sign up appears as a button", () => {
    render(<App />);
    const signUpBtn = screen.getByText("Sign Up");
    expect(signUpBtn).toBeInTheDocument();
  });

  test("Log in does NOT appears as a button", () => {
    render(<App />);
    const loginBtn = screen.queryByText("Login");
    expect(loginBtn).toBeNull();
  });

  test("Log in does  appears as a link", () => {
    render(<App />);
    const loginLink = screen.queryByText("Login", { exact: false });
    expect(loginLink).not.toBeNull();
  });

  test("Logout does NOT appears as a link", () => {
    render(<App />);
    const logoutLink = screen.queryByText("Logout");
    expect(logoutLink).toBeNull();
  });

  test("Register Link does appears as a link", () => {
    render(<App />);
    const registerLink = screen.queryByText("Already Registered?", {
      exact: false,
    });
    expect(registerLink).not.toBeNull();
  });

});
