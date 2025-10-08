import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";

// Mock all child components
jest.mock("@/components/Header/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header Component</div>,
}));

jest.mock("@/components/statistics", () => ({
  __esModule: true,
  default: () => <div data-testid="statistics">Statistics Component</div>,
}));

jest.mock("@/components/ticket-management", () => ({
  __esModule: true,
  default: () => <div data-testid="ticket-management">TicketManagement Component</div>,
}));

jest.mock("@/components/change-request", () => ({
  __esModule: true,
  default: () => <div data-testid="change-request">ChangeRequest Component</div>,
}));

jest.mock("@/components/approval-table", () => ({
  __esModule: true,
  default: () => <div data-testid="approval-table">ApprovalTable Component</div>,
}));

jest.mock("@/components/incident-table", () => ({
  __esModule: true,
  default: () => <div data-testid="incident-ticket">IncidentTicket Component</div>,
}));

jest.mock("@/components/ticket-resolution", () => ({
  __esModule: true,
  default: () => <div data-testid="ticket-resolution">TicketResolution Component</div>,
}));

jest.mock("@/components/ticket-request", () => ({
  __esModule: true,
  default: () => <div data-testid="ticket-request">TicketRequest Component</div>,
}));

describe("Dashboard Component", () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  it("renders the Header component", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("renders the Dashboard title", () => {
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders all child components", () => {
    const components = [
      "statistics",
      "ticket-management",
      "change-request",
      "approval-table",
      "incident-ticket",
      "ticket-resolution",
      "ticket-request",
    ];

    components.forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });
});
