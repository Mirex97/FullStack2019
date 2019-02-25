import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup } from "react-testing-library";
import SimpleBlog from "./SimpleBlog";

afterEach(cleanup);

test("renders content", () => {
  const blog = {
    title: "nimi",
    author: "kukkis",
    likes: 1000
  };

  const component = render(<SimpleBlog blog={blog} />);
  expect(component.container).toHaveTextContent("nimi");
});
