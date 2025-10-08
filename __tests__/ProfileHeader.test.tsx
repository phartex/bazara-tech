import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: any) => <img alt={alt} />,
}));

// Mock next/navigation
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Helper to mock Zustand store with dynamic user
const mockUseAuthStore = (user: any = null) => {
  const clearAuthUserMock = jest.fn();
  jest.mock("@/store/auth", () => ({
    useAuthStore: () => ({
      user,
      clearAuthUser: clearAuthUserMock,
    }),
  }));
  return clearAuthUserMock;
};

describe("ProfileHeader Component", () => {
  it("renders user info dynamically from Zustand store", () => {
    const user = { firstName: "Alice", lastName: "Smith", email: "alice@example.com" };
    const clearAuthUserMock = mockUseAuthStore(user);

    render(<ProfileHeader />);

    // Open dropdown
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    expect(screen.getByText(`${user.firstName} ${user.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it("renders 'Guest User' when no user is provided", () => {
    const clearAuthUserMock = mockUseAuthStore(null);

    render(<ProfileHeader />);

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    expect(screen.getByText("Guest User")).toBeInTheDocument();
    expect(screen.getByText("No email found")).toBeInTheDocument();
  });

  it("calls clearAuthUser and redirects on logout", () => {
    const user = { firstName: "Bob", lastName: "Lee", email: "bob@example.com" };
    const clearAuthUserMock = mockUseAuthStore(user);

    render(<ProfileHeader />);

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(clearAuthUserMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
