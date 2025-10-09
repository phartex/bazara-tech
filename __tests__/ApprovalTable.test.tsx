import React from "react";
import { render, screen, within } from "@testing-library/react";

import { approvalTable } from "@/store/data/dashboard";
import ApprovalTable from "@/components/approval-table";

// Mock CardWrapper to isolate layout
jest.mock("@/components/ui/card-wrapper", () => ({
  __esModule: true,
  default: jest.fn(({ title, children }) => (
    <div data-testid="card-wrapper">
      <h2>{title}</h2>
      {children}
    </div>
  )),
}));

// Mock UI components that don't affect logic
jest.mock("@/components/ui/badge", () => ({
  Badge: jest.fn(({ children, ...props }) => (
    <span data-testid="badge" {...props}>
      {children}
    </span>
  )),
}));

jest.mock("@/components/ui/button", () => ({
  Button: jest.fn(({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  )),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: jest.fn(({ children }) => <div>{children}</div>),
  DropdownMenuTrigger: jest.fn(({ children }) => <div>{children}</div>),
  DropdownMenuContent: jest.fn(({ children }) => <div>{children}</div>),
  DropdownMenuItem: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock("lucide-react", () => ({
  MoreVertical: jest.fn(() => <svg data-testid="more-vertical-icon" />),
}));

describe("ApprovalTable Component", () => {
  it("renders CardWrapper with correct title", () => {
    render(<ApprovalTable />);
    expect(screen.getByTestId("card-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Awaiting Approval")).toBeInTheDocument();
  });

  it("renders the table with correct headers", () => {
    render(<ApprovalTable />);
    const headerRow = screen.getAllByRole("columnheader");
    const expectedHeaders = approvalTable.header;

    // Check each header text
    expectedHeaders.forEach((headerText) => {
      expect(screen.getByText(headerText)).toBeInTheDocument();
    });

    // Should also include one empty header for the action column
    expect(headerRow.length).toBe(expectedHeaders.length + 1);
  });

  it("renders table rows based on approvalTable.body data", () => {
    render(<ApprovalTable />);
    const rows = screen.getAllByRole("row");
    // +1 header row
    expect(rows.length).toBe(approvalTable.body.length + 1);

    // Verify first row’s data
    const firstRow = within(rows[1]);
    approvalTable.body[0].slice(0, 6).forEach((cellValue) => {
      const matches = firstRow.getAllByText(cellValue);
      expect(matches.length).toBeGreaterThan(0);
    });

  });

  it("renders status badges correctly", () => {
    render(<ApprovalTable />);
    const badges = screen.getAllByTestId("badge");
    expect(badges.length).toBe(approvalTable.body.length);

    approvalTable.body.forEach((row, index) => {
      expect(badges[index]).toHaveTextContent(row[6]);
    });
  });

  it("renders MoreVertical icon for each row", () => {
    render(<ApprovalTable />);
    const icons = screen.getAllByTestId("more-vertical-icon");
    expect(icons.length).toBe(approvalTable.body.length);
  });
});
