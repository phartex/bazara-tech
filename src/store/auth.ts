import { create } from 'zustand'
import Cookies from 'js-cookie'

interface User {
  firstName: string
  lastName: string
  email: string
  dateCreated: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean

  // Actions
  setAuthUser: (user: User, token: string) => void
  clearAuthUser: () => void
  getAuthFromCookies: () => void
  setAuthToCookies: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  // ✅ set user + token in Zustand
  setAuthUser: (user, token) => {
    set({
      user,
      accessToken: token,
      isAuthenticated: true,
    })

    // also set to cookies
    Cookies.set('user', JSON.stringify(user))
    Cookies.set('accessToken', token)
  },

  // ✅ clear everything
  clearAuthUser: () => {
    Cookies.remove('user')
    Cookies.remove('accessToken')
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    })
  },

  // ✅ restore from cookies (on page refresh)
  getAuthFromCookies: () => {
    const userCookie = Cookies.get('user')
    const tokenCookie = Cookies.get('accessToken')

    if (userCookie && tokenCookie) {
      try {
        const parsedUser = JSON.parse(userCookie)
        set({
          user: parsedUser,
          accessToken: tokenCookie,
          isAuthenticated: true,
        })
      } catch (error) {
        console.error('Failed to parse user cookie:', error)
      }
    }
  },

  // ✅ manually set cookies (if token/user fetched externally)
  setAuthToCookies: (user, token) => {
    Cookies.set('user', JSON.stringify(user))
    Cookies.set('accessToken', token)
  },
}))
