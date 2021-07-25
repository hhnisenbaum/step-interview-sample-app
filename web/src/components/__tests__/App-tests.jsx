import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import { render, fireEvent } from "@testing-library/react";
import nock from "nock";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

describe("input control", () => {
  it("allows  only numbers", async () => {
    const { findByLabelText } = render(<App />);
    const searchInput = await findByLabelText("Search title");
    fireEvent.change(searchInput, { target: { value: "homer" } });
    expect(searchInput.innerHTML).toBe("");
  });

  it("has input min and step values", async () => {
    const { findByLabelText } = render(<App />);
    const searchInput = await findByLabelText("Search title");
    expect(searchInput.getAttribute("min")).toBe("1");
    expect(searchInput.getAttribute("step")).toBe("1");
  });
})

describe("searches for titles", () => {

  it("searches for an invalid title number", async () => {
    nock('http://localhost:80')
      .get('/api/titles/123')
      .reply(404);
    const { findByLabelText, findByRole, findByTestId } = render(<App />);
    const searchInput = await findByLabelText("Search title");
    fireEvent.change(searchInput, { target: { value: "123" } });
    const submitButton = await findByRole("button", { name: "Go" });
    submitButton.click();
    const textDisplay = await findByTestId("text");
    expect(textDisplay.innerHTML).toBe("Incorrect title number. #123 not found in the library");
  });

  it("searches for a valid title number", async () => {
    nock('http://localhost:80')
      .get('/api/titles/123')
      .reply(200, {
        description: "Lot 123 on Block 123",
        id: 123,
        ownerName: "Homer"
      });
    const { findByLabelText, findByRole, findByTestId } = render(<App />);
    const searchInput = await findByLabelText("Search title");
    fireEvent.change(searchInput, { target: { value: "123" } });
    const submitButton = await findByRole("button", { name: "Go" });
    submitButton.click();
    const description = await findByTestId("description");
    expect(description.innerHTML).toBe("Lot 123 on Block 123");
    const owner = await findByTestId("owner");
    expect(owner.innerHTML).toBe("Homer");
  });
})



