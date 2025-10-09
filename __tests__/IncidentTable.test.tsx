import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import IncidentTicket from "@/components/incident-table";
import { teamIncidentTicket } from "@/store/data/dashboard";

// Mock child components to simplify rendering
jest.mock("@/components/ui/card-wrapper", () => ({
  __esModule: true,
  default: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid="card-wrapper">
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

jest.mock("lucide-react", () => ({
  Calendar: () => <svg data-testid="calendar-icon" />,
  ChevronDown: () => <svg data-testid="chevron-icon" />,
  Download: () => <svg data-testid="download-icon" />,
  MoreVertical: () => <svg data-testid="more-icon" />,
}));

describe("IncidentTicket Component", () => {
  it("renders the component title correctly", () => {
    render(<IncidentTicket />);
    expect(screen.getByText("Incident Tickets Assigned to my Team")).toBeInTheDocument();
  });

  it("renders filter buttons and icons", () => {
    render(<IncidentTicket />);

    expect(screen.getByPlaceholderText("Search by user name")).toBeInTheDocument();
    expect(screen.getByText("More Filters")).toBeInTheDocument();
    expect(screen.getByText("Export")).toBeInTheDocument();

    // Ensure icons render
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-icon")).toBeInTheDocument();
    expect(screen.getByTestId("download-icon")).toBeInTheDocument();
  });

  it("renders table headers based on teamIncidentTicket data", () => {
    render(<IncidentTicket />);
    teamIncidentTicket.header.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders all table rows from teamIncidentTicket data", () => {
    render(<IncidentTicket />);

    // Check number of rows equals mock data length
    const rows = screen.getAllByRole("row");
    // +1 because header row is also rendered
    expect(rows.length).toBe(teamIncidentTicket.body.length + 1);
  });

  it("renders a yellow badge for 'Pending' status", () => {
    render(<IncidentTicket />);
    const badge = screen.getAllByText("Pending")[0];
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-yellow-100");
  });

  it("renders dropdown action buttons", () => {
    render(<IncidentTicket />);
    const moreIcons = screen.getAllByTestId("more-icon");
    expect(moreIcons.length).toBeGreaterThan(0);
  });


});
