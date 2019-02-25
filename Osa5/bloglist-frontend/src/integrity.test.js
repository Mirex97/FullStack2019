import React from "react";
import "jest-dom/extend-expect";
import { render, waitForElement } from "react-testing-library";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  it("if no user logged, notes are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("kirjaudu"));

    expect(component.container).toHaveTextContent("Log in to application");
    expect(component.container).not.toHaveTextContent("test");
  });

  it("if user is logged, notes are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Teuvo Testaaja"
    };

    localStorage.setItem("loggedBlogUser", JSON.stringify(user));

    const component = render(<App />);

    component.rerender(<App />);

    await waitForElement(() => component.getByText("kirjaudu"));

    expect(component.container).not.toHaveTextContent("Log in to application");
    expect(component.container).toHaveTextContent("test");
  });
});
