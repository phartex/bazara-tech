import React from "react";
import { render, screen } from "@testing-library/react";
import { changeRequestData } from "@/store/data/dashboard";
import ChangeRequest from "@/components/change-request";

// Mock CardWrapper and LineCharts to isolate the component logic
jest.mock("@/components/ui/card-wrapper", () => ({
  __esModule: true,
  default: jest.fn(({ title, icon, expandedIcon, children }) => (
    <div data-testid="card-wrapper">
      <h2>{title}</h2>
      <img src={icon} alt="card-icon" />
      <img src={expandedIcon} alt="expanded-icon" />
      {children}
    </div>
  )),
}));

jest.mock("@/components/DashboardChart", () => ({
  __esModule: true,
  LineCharts: jest.fn(({ data }) => (
    <div data-testid="line-chart">Chart Data Length: {data.length}</div>
  )),
}));

describe("ChangeRequest Component", () => {
  it("renders CardWrapper with correct title and icons", () => {
    render(<ChangeRequest />);

    expect(screen.getByTestId("card-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Change Request By Status")).toBeInTheDocument();
    expect(screen.getByAltText("card-icon")).toHaveAttribute(
      "src",
      "/images/icons/finger.png"
    );
    expect(screen.getByAltText("expanded-icon")).toHaveAttribute(
      "src",
      "/images/icons/hamburger.svg"
    );
  });

  it("renders LineCharts with changeRequestData", () => {
    render(<ChangeRequest />);

    const chart = screen.getByTestId("line-chart");
    expect(chart).toBeInTheDocument();
    expect(chart).toHaveTextContent(
      `Chart Data Length: ${changeRequestData.length}`
    );
  });
});
