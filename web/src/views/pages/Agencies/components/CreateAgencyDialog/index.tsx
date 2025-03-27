import { AgencyCreateInput } from "@/app/schemas/agency";

import { Button } from "@/views/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/views/components/ui/dialog";
import { Plus } from "lucide-react";

import { CreateAgencyForm } from "./Form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IUpdateAgencyDialogProps {
  createAgency: (data: AgencyCreateInput) => Promise<void>;
  isLoading?: boolean;
}

export function CreateAgencyDialog({ createAgency }: IUpdateAgencyDialogProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    return location.pathname.includes("/new");
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          location.pathname.includes("/new") && navigate(`/agencies`);
        }
      }}
    >
      <DialogTrigger>
        <Button
          className="group cursor-pointer bg-accent-foreground"
          onClick={() => {
            navigate("new");
            setIsOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[95vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Agency</DialogTitle>
          <DialogDescription>
            Create a new agency here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CreateAgencyForm onCreateAgency={createAgency} />
      </DialogContent>
    </Dialog>
  );
}
