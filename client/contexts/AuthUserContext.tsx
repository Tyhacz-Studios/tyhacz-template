import React, { useEffect, createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { UserType } from '../../server/models/User'
import { getSession } from '../requests/session'

export type AuthContextType = {
  authUser: UserType | null
  setAuthUser: Dispatch<SetStateAction<UserType | null>>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type Props = {
    children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authUser, setAuthUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const fetchUser = async () => {
          try {
              const res = await getSession()
              setAuthUser(res.data)

          } catch (err) {
              setAuthUser(null)
          }

          setLoading(false)
      }

      fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
