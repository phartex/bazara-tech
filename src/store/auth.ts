"use client";
import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthUser {
  id: string;
  email: string;
  accessToken: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
  role: string;
  refreshToken: string;
  expires: string;
}

interface AuthState {
  authenticatedUser: AuthUser | null;
  setAuthUser: (authData: AuthUser) => void;
  clearAuthUser: () => void;
}

const isClient = typeof window !== "undefined";

const getAuthFromCookies = (): AuthUser | null => {
  if (isClient) {
    const authUser = Cookies.get("authUser");
    return authUser ? JSON.parse(authUser) : null;
  }
  return null;
};

const setAuthToCookies = (authData: AuthUser | null) => {
  if (isClient) {
    if (authData) {
      Cookies.set("authUser", JSON.stringify(authData), {
        expires: 1,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
    } else {
      Cookies.remove("authUser");
    }
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  authenticatedUser: getAuthFromCookies(),
  
  setAuthUser: (authData: AuthUser) => {
    console.log("Setting auth user:", authData); // Debug log
    setAuthToCookies(authData);
    set({ authenticatedUser: authData });
  },
  
  clearAuthUser: () => {
    setAuthToCookies(null);
    set({ authenticatedUser: null });
  },
}));