import React, { ReactNode } from "react"
import { useAuth } from "../context/auth-context"
import { UserPermissions } from "../types/auth-types"
import { Navigate } from "react-router-dom"
import toast from "react-hot-toast"

interface AuthGateProps {
  children: ReactNode
  fallback?: ReactNode
  permissions?: keyof UserPermissions | Array<keyof UserPermissions>
  requireAll?: boolean
  redirectTo?: string
}

export const AuthGate: React.FC<AuthGateProps> = ({
  children,
  fallback = null,
  permissions,
  requireAll = true,
  redirectTo,
}) => {
  const { authState } = useAuth()

  const permissionDenied = (() => {
    if (!permissions) return false
    const permsArr = Array.isArray(permissions) ? permissions : [permissions]
    return requireAll
      ? !permsArr.every(p => authState.permissions?.[p])
      : !permsArr.some(p => authState.permissions?.[p])
  })()

  if (authState.isLoading || !authState.isAuthenticated || permissionDenied) {
    if (redirectTo) {
      toast.error("У вас нет доступа к этой странице")
      return <Navigate to={redirectTo} />
    }
    return <>{fallback}</>
  }
  return <>{children}</>
}

export const PermissionGate: React.FC<{
  children: ReactNode
  permissions?: keyof UserPermissions | Array<keyof UserPermissions>
  requireAll?: boolean
  fallback?: ReactNode
  redirectTo?: string
}> = ({ children, permissions, requireAll = true, fallback = null, redirectTo }) => {
  const { authState } = useAuth()

  const hasPermissions = (() => {
    if (!permissions) return true
    const permsArr = Array.isArray(permissions) ? permissions : [permissions]
    return requireAll
      ? permsArr.every(p => authState.permissions?.[p])
      : permsArr.some(p => authState.permissions?.[p])
  })()

  if (authState.isAuthenticated && hasPermissions) {
    return <>{children}</>
  }

  if (redirectTo) {
    toast.error("У вас нет доступа к этой странице")
    return <Navigate to={redirectTo} />
  }
  return <>{fallback}</>
}
