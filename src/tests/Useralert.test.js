import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Useralert from "../components/Useralert.js";

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

it("Renders with one Prop", () => {
  const div = document.createElement("div");
  render(<Useralert type={true} />, div);
});

it("Renders with both Props", () => {
  const div = document.createElement("div");
  render(<Useralert type={true} info="Infotext" />, div);
});

it("Renders Useralert with true and false", () => {
  act(() => {
    render(<Useralert type={true} info="Success" />, container);
  });
  expect(container.querySelector("p").textContent).toBe("Success");

  act(() => {
    render(<Useralert type={false} info="failed" />, container);
  });
  expect(container.querySelector("p").textContent).toBe("failed");
});
