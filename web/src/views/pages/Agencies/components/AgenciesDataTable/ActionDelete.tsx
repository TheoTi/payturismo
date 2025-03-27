import { IAgency } from "@/app/interfaces/IAgency";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/views/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface IActionDialogDeleteProps {
  open: boolean;
  changeDialogOpen: Dispatch<SetStateAction<Record<"deleteDialog", boolean>>>;
  agency: IAgency;
  deleteAgency(id: string): Promise<void>;
}

export function ActionDialogDelete({
  open,
  changeDialogOpen,
  agency,
  deleteAgency,
}: IActionDialogDeleteProps) {
  async function handleChangeStatus() {
    if (!agency.id) {
      toast.error("Failed to delete agency", {
        description: "Missing param: agencyId",
      });

      return;
    }

    try {
      await deleteAgency(agency.id);

      toast("Agency successfully deleted.");
    } catch (err: any) {
      toast.error("Failed to delete agency", {
        description: err?.message,
      });
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        changeDialogOpen((prevState) => ({
          ...prevState,
          deleteDialog: open,
        }));
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            agency.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleChangeStatus}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
