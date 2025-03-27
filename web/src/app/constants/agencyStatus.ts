export const AGENCY_STATUS = {
  active: {
    key: "active",
    label: "Active",
    color: "bg-emerald-500",
    variant: "default",
  },
  inactive: {
    key: "inactive",
    label: "Inactive",
    color: "bg-gray-500",
    variant: "destructive",
  },
  pending: {
    key: "pending",
    label: "Pending",
    color: "bg-amber-500",
    variant: "default",
  },
  suspended: {
    key: "suspended",
    label: "Suspended",
    color: "bg-red-500",
    variant: "destructive",
  },
} as const;

export type AgencyStatusKey = keyof typeof AGENCY_STATUS;
