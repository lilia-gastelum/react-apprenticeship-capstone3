import { render, screen } from "@testing-library/react";
import App from "./App";
import { AUTH_STORAGE_KEY, USER_INFO } from "./utils/constants";
import AuthProvider from "./utils/providers/Auth.provider";
import { createMemoryHistory } from "history";
import routeData from "react-router";
import { Router } from "react-router-dom";

describe("renders App", () => {
  test("it must redirect from private routes to login when unauthenticated", () => {
    const history = createMemoryHistory();
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(false));

    const mockLocation = {
      pathname: "/home",
      hash: "",
      search: "",
    };
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);

    render(
      <Router history={history}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );
    const loginHeading = screen.getByText(/Welcome/i);
    expect(loginHeading).toBeInTheDocument();
  });

  test("it must show private routes when authenticated", () => {
    const history = createMemoryHistory();
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));
    localStorage.setItem(
      USER_INFO,
      JSON.stringify({
        id: "123",
        name: "Wizeline",
        email: "user@wizeline.com",
        avatarUrl:
          "https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png",
      })
    );

    const mockLocation = {
      pathname: "/home",
      hash: "",
      search: "",
    };
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);

    render(
      <Router history={history}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );
    const headerTitle = screen.getByText(/Notes/i);
    expect(headerTitle).toBeInTheDocument();
  });
});
