import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getPermissions } from "../api/get-permissions"
import { CurrentUserResponse, getCurrentUser } from "../api/get-current-user"
import { logout } from "../api/logout"
import { AuthContextType, AuthState, UserPermissions } from "../types/auth-types"
import {
  defaultExtendedUser,
  defaultPermissions,
  defaultPermissionsResult,
} from "@/utils/default-entities.ts"

const authStatusQueryKey = "auth-status"
const permissionsQueryKey = "user-permissions"

const initialAuthState: AuthState = {
  userData: null,
  isAuthenticated: false,
  permissions: null,
  isLoading: true,
  error: null,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState)
  const queryClient = useQueryClient()

  const {
    data: authData,
    isLoading: authLoading,
    refetch: refetchAuth,
  } = useQuery({
    queryKey: [authStatusQueryKey],
    queryFn: getCurrentUser,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    initialData: { data: defaultExtendedUser, isAuthenticated: false } as CurrentUserResponse,
  })

  const {
    data: permissionsData,
    isLoading: permissionsLoading,
    refetch: refetchPermissions,
    error: permissionsError,
  } = useQuery({
    queryKey: [permissionsQueryKey],
    queryFn: getPermissions,
    enabled: authData?.isAuthenticated,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    initialData: defaultPermissionsResult,
  })

  useEffect(() => {
    setAuthState({
      userData: authData?.data || defaultExtendedUser,
      isAuthenticated: authData?.isAuthenticated ?? false,
      permissions: authData?.isAuthenticated ? permissionsData?.data || defaultPermissions : null,
      isLoading: authLoading || (authData?.isAuthenticated && permissionsLoading),
      error: permissionsError ? "Ошибка при получении прав доступа" : null,
    })
  }, [authData, permissionsData, authLoading, permissionsLoading, permissionsError])

  const refreshPermissions = async (): Promise<void> => {
    const authResponse = await refetchAuth()
    if (authResponse.data?.isAuthenticated) {
      const permissionsResponse = await refetchPermissions()

      setAuthState(prevState => ({
        ...prevState,
        userData: authResponse.data?.data || defaultExtendedUser,
        isAuthenticated: true,
        permissions: permissionsResponse.data?.data || defaultPermissions,
        isLoading: false,
        error: null,
      }))
    }
  }

  const login = async (): Promise<void> => {
    await refreshPermissions()
  }

  const handleLogout = async (): Promise<void> => {
    try {
      await logout()

      queryClient.resetQueries({ queryKey: [authStatusQueryKey], exact: true })
      queryClient.resetQueries({ queryKey: [permissionsQueryKey], exact: true })

      setAuthState({
        userData: null,
        isAuthenticated: false,
        permissions: null,
        isLoading: false,
        error: null,
      })
    } catch {
      setAuthState({
        userData: null,
        isAuthenticated: false,
        permissions: null,
        isLoading: false,
        error: "Произошла ошибка при выходе из системы",
      })
    }
  }

  return (
    <AuthContext.Provider value={{ authState, login, logout: handleLogout, refreshPermissions }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const usePermission = (permission: keyof UserPermissions): boolean => {
  const { authState } = useAuth()
  return !!authState.permissions?.[permission]
}
