/**
 * @file __tests__/Statistics.test.tsx
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import Statistics from "@/components/statistics";

// 🧩 Mock uuid to return predictable keys
let counter = 0;
jest.mock("uuid", () => ({
  v4: jest.fn(() => `mocked-uuid-${counter++}`),
}));

// 🧩 Mock TicketCard component
jest.mock("../src/components/ui/ticket-card", () => ({
  __esModule: true,
  default: jest.fn((props) => (
    <div data-testid="ticket-card">{props.title}</div>
  )),
}));

// 🧩 Mock the statistics data
jest.mock("../src/store/data/dashboard", () => ({
  statisticsData: [
    { title: "Revenue", value: "$1000" },
    { title: "Users", value: "200" },
    { title: "Orders", value: "50" },
  ],
}));

describe("Statistics Component", () => {
  it("renders TicketCard components for each item in statisticsData", () => {
    render(<Statistics />);

    // Should render one TicketCard per item
    const cards = screen.getAllByTestId("ticket-card");
    expect(cards).toHaveLength(3);

    // Ensure titles are rendered
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
  });
});
