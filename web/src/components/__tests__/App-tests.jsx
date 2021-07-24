import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import { render, fireEvent } from "@testing-library/react";
import nock from "nock";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

describe("searches for titles", () => {
  it("searches for an invalid title number", async () => {
    nock('http://localhost:80')
      .get('/api/titles/123')
      .reply(404);
    const { findByLabelText, findByRole, findByText } = render(<App />);
    const searchInput = await findByLabelText("Search title");
    fireEvent.change(searchInput, { target: { value: "123" } });
    const submitButton = await findByRole("button", { name: "Go" });
    submitButton.click();
    await findByText("Incorrect title number");
  });
})
