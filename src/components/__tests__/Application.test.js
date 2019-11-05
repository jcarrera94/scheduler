import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByAltText, getByText, getAllByTestId, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";


beforeEach(cleanup);
describe("Application", () => {
  xit("renders without crashing", () => {
    render(<Application />);
  });

  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it.only("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving booked interview!")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    console.log(prettyDOM(appointment))
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(apt => queryByText(apt, "Archie Cohen"));
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you want to delete interview?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting interview!")).toBeInTheDocument();
    await waitForElement(() => queryByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(apt => queryByText(apt, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving booked interview!")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => queryByText(appointment, "Error Saving!"));
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByAltText(appointment, "Add"));
  });

  it("shows the delete error when failing to save an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(apt => queryByText(apt, "Archie Cohen"));
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you want to delete interview?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    await waitForElement(() => queryByText(appointment, "Error Deleting!"));
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Archie Cohen"));
  });
});

