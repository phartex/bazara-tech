import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header/Header";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: any) => <img alt={alt} />,
}));

// Mock SearchInput
jest.mock("@/components/ui/search-input", () => ({
  __esModule: true,
  default: ({ placeholder }: any) => (
    <input placeholder={placeholder} data-testid="search-input" />
  ),
}));

// Mock NavLink
jest.mock("@/components/navlink", () => ({
  __esModule: true,
  default: ({ title, url }: any) => (
    <a href={url} data-testid={`navlink-${title}`}>
      {title}
    </a>
  ),
}));

// Mock ProfileHeader
jest.mock("@/components/ProfileHeader/ProfileHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="profile-header">ProfileHeader</div>,
}));

describe("Header Component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders the company logo", () => {
    expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search for anything")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    const navLinks = [
      "Home",
      "Workbench",
      "Tickets",
      "Service Catalogue",
      "Knowledge Management",
      "Admin Settings",
    ];

    navLinks.forEach((link) => {
      expect(screen.getByTestId(`navlink-${link}`)).toBeInTheDocument();
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("renders notification and more icons", () => {
    expect(screen.getAllByAltText("notification").length).toBe(2);
  });

  it("renders the ProfileHeader component", () => {
    expect(screen.getByTestId("profile-header")).toBeInTheDocument();
  });


});
