import { useAuth } from "@/app/hooks/useAuth";
import { ReactNode } from "react";

export function RoleProtected({
  children,
  requiredRole,
  fallback = null,
}: {
  children: ReactNode;
  requiredRole: "admin" | "analyst";
  fallback?: ReactNode;
}) {
  const { hasPermission } = useAuth();

  if (!hasPermission(requiredRole)) {
    return fallback;
  }

  return <>{children}</>;
}
