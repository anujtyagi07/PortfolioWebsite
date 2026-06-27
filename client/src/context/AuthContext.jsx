import { createContext, useContext, useEffect, useState } from 'react'
import { setAuthToken } from '../lib/axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)

  useEffect(() => { setAuthToken(token) }, [token])

  const login = (jwt) => setToken(jwt)
  const logout = () => setToken(null)

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
