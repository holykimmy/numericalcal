import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App1 from "./linear/jacobi/Jacobi.js";
import App2 from "./linear/cramer/Cramer.js";
import App3 from "./linear/conjugate/Conjugate.js";
import App4 from "./linear/gauss_eli/Gausseli.js";
test("Jacobi", () => {
  render(<App1 />);
  expect(screen.getByText("Jacobi")).toBeInTheDocument();
});
test("Cramer", () => {
  render(<App2 />);
  expect(screen.getByText("Cramer")).toBeInTheDocument();
});
test("Gauss Elimination", () => {
  render(<App4 />);
  expect(screen.getByText("Gauss Elimination")).toBeInTheDocument();
});
test("Conjugate Gradient", () => {
  render(<App3 />);
  expect(screen.getByText("Conjugate Gradient")).toBeInTheDocument();
});
