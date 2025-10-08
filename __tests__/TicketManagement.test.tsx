/**
 * @file __tests__/TicketManagement.test.tsx
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import TicketManagement from "@/components/ticket-management";

// 🧩 Mock next/image to avoid Next.js-specific behavior in Jest
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || "mocked-image"} />,
}));

// 🧩 Mock CardWrapper to isolate layout logic
jest.mock("../src/components/ui/card-wrapper", () => ({
  __esModule: true,
  default: ({ title, children }: any) => (
    <div data-testid="card-wrapper">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  ),
}));

// 🧩 Mock chart components
jest.mock("../src/components/DashboardChart", () => ({
  __esModule: true,
  HorizontalChart: jest.fn(() => (
    <div data-testid="horizontal-chart">HorizontalChart Mock</div>
  )),
  DonutChartCard: jest.fn(() => (
    <div data-testid="donut-chart">DonutChartCard Mock</div>
  )),
}));

// 🧩 Mock dashboard data
jest.mock("../src/store/data/dashboard", () => ({
  ticketManagementData: [
    { name: "Agent 1", value: 20 },
    { name: "Agent 2", value: 15 },
  ],
  pendingData: [
    { name: "Pending Tickets", value: 5 },
    { name: "Escalated Tickets", value: 3 },
  ],
}));

describe("TicketManagement Component", () => {
  it("renders without crashing", () => {
    render(<TicketManagement />);
    expect(screen.getAllByTestId("card-wrapper").length).toBeGreaterThan(0);
  });

  it("renders HorizontalChart inside the first CardWrapper", () => {
    render(<TicketManagement />);
    expect(screen.getByTestId("horizontal-chart")).toBeInTheDocument();
  });

  it("renders pending ticket cards using pendingData", () => {
    render(<TicketManagement />);
    expect(screen.getByText("Pending Tickets")).toBeInTheDocument();
    expect(screen.getByText("Escalated Tickets")).toBeInTheDocument();
  });

  it("renders DonutChartCard for 'Change Result By Category'", () => {
    render(<TicketManagement />);
    expect(screen.getByTestId("donut-chart")).toBeInTheDocument();
  });

  it("renders Average Incident Response Time sections", () => {
    render(<TicketManagement />);
    expect(
      screen.getAllByText(/Average Incident Response Time - Me/i).length
    ).toBe(2);
  });
});
