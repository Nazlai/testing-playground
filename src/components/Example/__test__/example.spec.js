import React from "react";
import {render, screen} from "@testing-library/react";
import Example from "../";

test("should render a message passed as prop", () => {
  render(<Example msg={"hello world"} />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});

test("should not render anything if message is not passed as prop", () => {
  const {container} = render(<Example />);
  expect(container).toBeEmptyDOMElement();
});
