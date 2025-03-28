export const ROLES = {
  admin: {
    key: "admin",
    label: "Administrator",
  },
  analyst: {
    key: "analyst",
    label: "Analyst",
  },
} as const;

export type RoleKeys = keyof typeof ROLES;

export const getUserRoleOptions = () => {
  return Object.values(ROLES).map((role) => ({
    value: role.key,
    label: role.label,
  }));
};
