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

// ---- 🧠 GLOBAL MOCK of Zustand store ----
const clearAuthUserMock = jest.fn();
let mockUser: any = null;

jest.mock("@/store/auth", () => ({
  useAuthStore: () => ({
    user: mockUser,
    clearAuthUser: clearAuthUserMock,
  }),
}));

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// ---- TESTS ----
describe("ProfileHeader Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = null;
  });

  it("renders 'Guest User' when no user is provided", () => {
    render(<ProfileHeader />);

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    expect(screen.getByText("Guest User")).toBeInTheDocument();
    expect(screen.getByText("No email found")).toBeInTheDocument();
  });

  it("calls clearAuthUser and redirects on logout", () => {
    mockUser = { firstName: "Bob", lastName: "Lee", email: "bob@example.com" };

    render(<ProfileHeader />);

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(clearAuthUserMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
