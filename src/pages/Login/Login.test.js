import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import AuthProvider from "../../utils/providers/Auth.provider";
import { AUTH_STORAGE_KEY } from "../../utils/constants";
import App from "../../App";

describe("tests Login form", () => {
  test("it must show error message when credentials are wrong", async () => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(false));

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    const emailInput = screen.getByRole(/textbox/i, { name: "email" });
    fireEvent.change(emailInput, { target: { value: "example@wizeline.com" } });
    const passwordInput = screen.getByTitle("password");
    fireEvent.change(passwordInput, { target: { value: "123" } });
    const button = screen.getByRole("button", { name: "Log In" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const errorMessage = await screen.findByText(
      /Email or password is not correct/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("it must redirect to home when credentials are correct", async () => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(false));


    render(
        <AuthProvider>
          <App />
        </AuthProvider>
    );
    const emailInput = screen.getByRole(/textbox/i, { name: "email" });
    fireEvent.change(emailInput, { target: { value: "user@wizeline.com" } });
    const passwordInput = screen.getByTitle("password");
    fireEvent.change(passwordInput, { target: { value: "123123" } });
    const button = screen.getByRole("button", { name: "Log In" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const errorMessage = screen.queryByText(
      /Email or password is not correct/i
    );
    expect(errorMessage).toBeNull();
    const headerTitle = await screen.findByText(/Notes/i);
    expect(headerTitle).toBeInTheDocument();
  });
});
