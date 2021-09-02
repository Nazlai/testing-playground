import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {generateUser} from "../../../utils";
import LoginForm from "../";

describe("test login form", () => {
  test("should call onSubmit with username and password", () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} reachedFailLimit={false} />);

    const [username, password] = generateUser();

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);
    userEvent.click(screen.getByRole("button", {name: /submit/i}));

    expect(mockSubmit).toHaveBeenCalledWith({username, password});
  });

  test("should disable button if inputs are empty", () => {
    render(<LoginForm onSubmit={console.log} reachedFailLimit={false} />);

    expect(screen.getByRole("button", {name: /submit/i})).toBeDisabled();

    userEvent.type(screen.getByLabelText(/username/i), "hello");
    userEvent.type(screen.getByLabelText(/password/i), "world");

    expect(screen.getByRole("button", {name: /submit/i})).not.toBeDisabled();
  });
});
