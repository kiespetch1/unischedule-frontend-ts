import React, { ReactNode } from "react"
import { useAuth } from "../context/auth-context"
import { UserPermissions } from "../types/auth-types"

interface AuthGateProps {
  children: ReactNode
  fallback?: ReactNode
  requiredPermission?: keyof UserPermissions
}

export const AuthGate: React.FC<AuthGateProps> = ({
  children,
  fallback = null,
  requiredPermission,
}) => {
  const { authState } = useAuth()

  if (
    authState.isLoading ||
    !authState.isAuthenticated ||
    (requiredPermission && !authState.permissions?.[requiredPermission])
  ) {
    return <>{fallback}</>
  }
  return <>{children}</>
}

export const PermissionGate: React.FC<{
  children: ReactNode
  permission: keyof UserPermissions
}> = ({ children, permission }) => {
  const { authState } = useAuth()

  if (authState.isAuthenticated && authState.permissions?.[permission]) {
    return <>{children}</>
  }

  return null
}
