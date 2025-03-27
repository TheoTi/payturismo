import { IAgency } from "@/app/interfaces/IAgency";
import { ColumnDef } from "@tanstack/react-table";
import { AGENCY_STATUS } from "@/app/constants/agencyStatus";
import { format } from "date-fns";
import { Badge } from "@/views/components/ui/badge";
import { Button } from "@/views/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import { DropdownActions } from "./DropdownActions";
import { AgencyUpdateFormValues } from "@/app/schemas/agency";

interface IColumnProps {
  deleteAgency(id: string): Promise<void>;
  isLoading: boolean;
}

export const columns = ({
  deleteAgency,
  isLoading,
}: IColumnProps): ColumnDef<IAgency>[] => {
  return [
    {
      accessorKey: "fantasyName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fantasy Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("fantasyName")}</div>
      ),
    },
    {
      accessorKey: "corporateName",
      header: "Corporate Name",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("corporateName")}</div>
      ),
    },
    {
      accessorKey: "cnpj",
      header: "Tax ID (CNPJ)",
      cell: ({ row }) => {
        const cnpj = row.getValue("cnpj") as string;
        return <div className="text-sm">{cnpj}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof AGENCY_STATUS;
        const statusInfo = AGENCY_STATUS[status];

        return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="text-sm">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div className="text-sm">{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "foundationDate",
      header: "Foundation Date",
      cell: ({ row }) => {
        const date = row.getValue("foundationDate") as Date | null;
        return (
          <div className="text-sm">
            {date ? format(new Date(date), "MM/dd/yyyy") : "-"}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const agency = row.original;

        return (
          <DropdownActions
            isLoading={isLoading}
            agency={agency}
            deleteAgency={deleteAgency}
          />
        );
      },
    },
  ];
};
