import React from "react";
import { render, screen } from "@testing-library/react";
import TicketRequest from "@/components/ticket-request";

// Mock dependencies
jest.mock("@/components/ui/card-wrapper", () => ({
  __esModule: true,
  default: ({ title, children }: any) => (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: any) => <img alt={alt} />,
}));

jest.mock("../src/components/DashboardChart", () => ({
  BigBarChart: () => <div data-testid="big-bar-chart">Bar Chart</div>,
}));

describe("TicketRequest Component", () => {
  it("renders both CardWrapper sections with correct titles", () => {
    render(<TicketRequest />);

    expect(
      screen.getByText("Change Request By Status")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Request Ticket -my Team")
    ).toBeInTheDocument();
  });

  it("renders the BigBarChart component", () => {
    render(<TicketRequest />);
    expect(screen.getByTestId("big-bar-chart")).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<TicketRequest />);

    const headers = ["Title", "Module", "ID", "Created By"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("shows 'No item found' message when body is empty", () => {
    render(<TicketRequest />);

    expect(screen.getByText("No item found")).toBeInTheDocument();
    expect(
      screen.getByText("Request found will be displayed here")
    ).toBeInTheDocument();
    expect(screen.getByAltText("empty table")).toBeInTheDocument();
  });
});
