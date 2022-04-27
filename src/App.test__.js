import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Add classmate", () => {
  it("should render the app", async () => {
    render(<App />);

    const app = await screen.findByTestId("app");

    expect(app).toBeInTheDocument();
  });
  it("should add a new classmate at the top", async () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    const classmates = screen.getAllByTestId("classmate")[0];

    expect(classmates).toHaveTextContent("Mike");
  });
  it("should updo a new classmate", async () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByTestId("undo-button"));
    const mike = screen.queryByText("Mike");

    expect(mike).not.toBeInTheDocument();
  });
  it("should add two new classmates", async () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.change(input, { target: { value: "Donny" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    const donny = screen.getAllByTestId("classmate")[0];
    const mike = screen.getAllByTestId("classmate")[1];

    expect(mike).toHaveTextContent("Mike");
    expect(donny).toHaveTextContent("Donny");
  });
  it("should undo two new classmates", async () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.change(input, { target: { value: "Donny" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByTestId("undo-button"));
    fireEvent.click(screen.getByTestId("undo-button"));
    const vonni = screen.getAllByTestId("classmate")[0];
    const jackelyn = screen.getAllByTestId("classmate")[1];

    expect(vonni).toHaveTextContent("Vonni");
    expect(jackelyn).toHaveTextContent("Jackelyn");
  });
  it("should have Add button disabled when input field has no value", async () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });
  it("should enable Add button when input field has some value", async () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });

    expect(screen.getByRole("button", { name: "Add" })).toBeEnabled();
  });
  it("should clear input field after adding a classmate", async () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(input).not.toHaveValue();
  });
});

describe("Friend checkbox", () => {
  it("should checkoff the checkbox", async () => {
    render(<App />);

    const checkbox = (await screen.findAllByRole("checkbox"))[0];
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
  it("should uncheck the checkbox", async () => {
    render(<App />);

    const checkbox = (await screen.findAllByRole("checkbox"))[0];
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
  it("should updo check for a checkbox", async () => {
    render(<App />);

    const checkbox = (await screen.findAllByRole("checkbox"))[0];
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByTestId("undo-button"));

    expect(checkbox).not.toBeChecked();
  });
  it("should redo the undo (cancel the undo)", async () => {
    render(<App />);

    const checkbox = (await screen.findAllByRole("checkbox"))[0];
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByTestId("undo-button"));
    fireEvent.click(screen.getByTestId("redo-button"));

    expect(checkbox).toBeChecked();
  });
});

describe("Mixture (add a classmate & friend checkbox)", () => {
  it("should undo these two actions: add a classmate & checkoff the classmate", async () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByTestId("undo-button"));
    fireEvent.click(screen.getByTestId("undo-button"));

    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.queryByText("Mike")).not.toBeInTheDocument();
  });
});

describe("Undo & redo buttons", () => {
  it("should be disabled by default", () => {
    render(<App />);

    expect(screen.getByTestId("undo-button")).toBeDisabled();
    expect(screen.getByTestId("redo-button")).toBeDisabled();
  });
  it("should enables undo button when user adds a new classmate", () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByTestId("undo-button")).toBeEnabled();
    expect(screen.getByTestId("redo-button")).toBeDisabled();
  });
  it("should enables redo button when user clicks undo button", () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    fireEvent.click(screen.getByTestId("undo-button"));
    expect(screen.getByTestId("redo-button")).toBeEnabled();
  });
  it("should disable redo button when user makes a new action after clicking undo", () => {
    render(<App />);

    const input = screen.getByTestId("name-input");
    fireEvent.change(input, { target: { value: "Mike" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByTestId("undo-button"));

    expect(screen.getByTestId("redo-button")).toBeEnabled();

    fireEvent.change(input, { target: { value: "Donny" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByTestId("redo-button")).toBeDisabled();
  });
});
