// login page should display error message if three unsuccessful login attempts occured
// should disable submit button if three unsuccessful login attempts occured
import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {rest} from "msw";
import {setupServer} from "msw/node";
import Login from "@screen/Login";
import {generateUser} from "../src/utils";

interface LoginBody {
  username: string;
  password: string;
}

const server = setupServer(
  rest.put<LoginBody>("/api/login", (req, res, ctx) => {
    const {username, password} = req.body;
    if (username === "hello" && password === "world") {
      return res(ctx.status(200));
    }
    return res(ctx.status(404));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("test login screen", () => {
  test("should display login success message when user logs in with valid account", async () => {
    render(<Login />);
    const [username, password] = generateUser({
      username: "hello",
      password: "world",
    });

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);
    userEvent.click(screen.getByRole("button", {name: /submit/i}));

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText(/login successful/i)).toBeInTheDocument();
  });

  test("should display error message when user fails to login", async () => {
    render(<Login />);
    const [username, password] = generateUser();

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);
    userEvent.click(screen.getByRole("button", {name: /submit/i}));

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(
      screen.getByText(/incorrect username or password/i),
    ).toBeInTheDocument();
  });

  test("should disable login button after three unscuccessful login attempts", async () => {
    render(<Login />);
    const [username, password] = generateUser();

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);

    userEvent.click(screen.getByRole("button", {name: /submit/i}));
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.click(screen.getByRole("button", {name: /submit/i}));
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.click(screen.getByRole("button", {name: /submit/i}));
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByRole("button", {name: /submit/i})).toBeDisabled();
  });

  test("should hide error message on user input", async () => {
    render(<Login />);
    const [username, password] = generateUser();

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);

    userEvent.click(screen.getByRole("button", {name: /submit/i}));
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(
      screen.getByText(/incorrect username or password/i),
    ).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/username/i), "hello");

    expect(
      screen.getByText(/incorrect username or password/i),
    ).not.toBeInTheDocument();
  });
});
