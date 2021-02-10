import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "../components/Button.js";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders iconbutton with true or false", () => {
  act(() => {
    render(<Button children="Login" />, container);
  });
  expect(container.querySelector("div").textContent).toBe("Login");
  act(() => {
    render(<Button children="Register" />, container);
  });
  expect(container.querySelector("div").textContent).toBe("Register");
});
