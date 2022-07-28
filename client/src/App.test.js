import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Runnin tests on the App component", () => {
  test("Does not render test paragraph", () => {
    render(<App />);
    const foundP = screen.queryByText("test");
    expect(foundP).not.toBeInTheDocument();
  });
  test("Sign up appears as a button", () => {
    render(<App />);
    const submit = screen.queryByText("Sign Up");
    expect(submit).toBeInTheDocument();
  });
});
