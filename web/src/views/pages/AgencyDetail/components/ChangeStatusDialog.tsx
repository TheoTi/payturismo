import { AgencyStatus } from "@/app/interfaces/IAgency";
import { Button } from "@/views/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/views/components/ui/dialog";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/app/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/views/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/views/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";
import { AGENCY_STATUS, AgencyStatusKey } from "@/app/constants/agencyStatus";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface IChangeStatusDialogProps {
  open: boolean;
  changeDialogOpen: Dispatch<
    SetStateAction<Record<"changeStatusDialog", boolean>>
  >;
  isLoading: boolean;
  changeAgencyStatus: (id: string, status: AgencyStatus) => Promise<void>;
}

export function ChangeStatusDialog({
  open,
  changeDialogOpen,
  changeAgencyStatus,
  isLoading,
}: IChangeStatusDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<AgencyStatusKey | null>(null);

  const { agencyId } = useParams();

  async function handleChangeStatus() {
    if (!agencyId) {
      toast.error("Failed to update agency status", {
        description: "Missing param: agencyId",
      });

      return;
    }

    try {
      await changeAgencyStatus(agencyId, value as AgencyStatus);
      toast.success("Agency status successfully updated.");
    } catch (err: any) {
      toast.error("Failed to update agency status", {
        description: err?.message,
      });
    }
  }

  function SaveChangesButton() {
    if (isLoading) {
      return (
        <Button disabled className="gap-1">
          <Loader2 className="animate-spin h-[1.2rem] w-[1.2rem]" />
          Please wait
        </Button>
      );
    }

    return (
      <Button onClick={handleChangeStatus} className="w-full" disabled={!value}>
        Save changes
      </Button>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        changeDialogOpen((prevState) => ({
          ...prevState,
          changeStatusDialog: open,
        }));
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Agency Status</DialogTitle>
          <DialogDescription>
            Make changes to your agency status here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value ? AGENCY_STATUS[value].label : "Select status..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search status..." />
              <CommandList>
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {Object.values(AGENCY_STATUS).map((status) => (
                    <CommandItem
                      key={status.key}
                      value={status.key}
                      onSelect={(currentValue) => {
                        setValue(
                          currentValue === status.key
                            ? (currentValue as AgencyStatusKey)
                            : ("" as AgencyStatusKey)
                        );
                        setIsOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          status.key === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogFooter>
          <SaveChangesButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
