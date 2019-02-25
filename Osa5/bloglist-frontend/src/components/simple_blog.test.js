import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "react-testing-library";
import SimpleBlog from "./SimpleBlog";

afterEach(cleanup);

test("renders content", () => {
  const blog = {
    title: "nimi",
    author: "kukkis",
    likes: 1000
  };

  const component = render(
    <SimpleBlog blog={blog} onClick={console.log("clicked")} />
  );

  expect(component.container).toHaveTextContent("nimi");
  expect(component.container).toHaveTextContent("kukkis");
  expect(component.container).toHaveTextContent("blog has 1000 likes");
});

it("clicking like done twice", async () => {
  const blog = {
    title: "nimi",
    author: "kukkis",
    likes: 1000
  };
  const mockHandler = jest.fn();
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );
  const button = getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(2);
});
