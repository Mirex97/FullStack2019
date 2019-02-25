import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "react-testing-library";
import Blog from "./Blog";

afterEach(cleanup);

test("renders content correctly when visibility toggled", () => {
  const blog = {
    title: "nimi",
    author: "kukkis",
    url: "url",
    likes: 1000,
    user: { username: "Cookies", name: "Kukkis" }
  };

  const user = { username: "Cookies", name: "Kukkis" };

  const component = render(<Blog blog={blog} user={user} />);

  expect(component.container).toHaveTextContent("nimi");
  expect(component.container).toHaveTextContent("kukkis");
  expect(component.container).not.toHaveTextContent("url");

  const { getByText } = render(<Blog blog={blog} user={user} />);
  const text = getByText("nimi kukkis");
  fireEvent.click(text);
  expect(component.container).toHaveTextContent("url");
});
