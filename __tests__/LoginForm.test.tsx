/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

// Mock the auth store and its methods
jest.mock("@/store/auth", () => ({
  useAuthStore: jest.fn(),
}));

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock React Query's useMutation (simplify the behavior)
jest.mock("@tanstack/react-query", () => ({
  useMutation: (config: any) => {
    return {
      mutate: (data: any) => config.mutationFn(data).then(config.onSuccess).catch(config.onError),
      isPending: false,
    };
  },
}));

describe("LoginForm", () => {
  const mockSetAuthUser = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
 (jest.mocked(useAuthStore) as jest.Mock).mockReturnValue({
  setAuthUser: mockSetAuthUser,
});


    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    jest.clearAllMocks();
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email address\/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/email must be valid/i)).toBeInTheDocument();
    });
  });

  it("submits valid credentials and redirects on success", async () => {
    // Mock successful fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {
              accessToken: "fakeToken",
              user: {
                firstName: "John",
                lastName: "Doe",
                email: "admin@example.com",
              },
            },
          }),
      })
    ) as jest.Mock;

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(/email address\/username/i), {
      target: { value: "admin@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: "Password1!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(mockSetAuthUser).toHaveBeenCalledWith(
        expect.objectContaining({ email: "admin@example.com" }),
        "fakeToken"
      );
      expect(toast.success).toHaveBeenCalledWith("Login Successful");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows error toast when login fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      })
    ) as jest.Mock;

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(/email address\/username/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Unable to login. Please check your credentials and try again."
      );
    });
  });
});
