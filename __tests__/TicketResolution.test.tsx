import React from "react";
import { render, screen } from "@testing-library/react";
import TicketResolution from "@/components/ticket-resolution";

// Mock CardWrapper
jest.mock("@/components/ui/card-wrapper", () => ({
  __esModule: true,
  default: ({ title, children }: any) => (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

// Mock BarCharts
jest.mock("@/components/DashboardChart", () => ({
  BarCharts: ({ data }: any) => (
    <div data-testid="bar-charts">BarCharts with {data.length} items</div>
  ),
}));

// Mock ticketResolutionData
jest.mock("@/store/data/dashboard", () => ({
  ticketResolutionData: [
    { agent: "Agent 1", tickets: 5 },
    { agent: "Agent 2", tickets: 3 },
  ],
}));

describe("TicketResolution Component", () => {
  it("renders CardWrapper with correct title", () => {
    render(<TicketResolution />);
    expect(
      screen.getByText("Tickets Resolved by Agent - Team")
    ).toBeInTheDocument();
  });

  it("renders BarCharts component", () => {
    render(<TicketResolution />);
    expect(screen.getByTestId("bar-charts")).toBeInTheDocument();
    expect(screen.getByText("BarCharts with 2 items")).toBeInTheDocument();
  });
});
