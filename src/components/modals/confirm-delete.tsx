"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import UseRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { useDeleteHook } from "@/hooks/modal/confirmDelete";

const ConfirmDeleteModal = () => {
  const useDelete = useDeleteHook();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const refetch = UseRefetch();
  const deleteProject = api.project.deleteProject.useMutation();

  const onDelete = () => {
    if (!useDelete.projectId) return;
    setIsDeleting(true);
    deleteProject.mutate(
      {
        projectId: useDelete.projectId,
      },
      {
        onSuccess: () => {
          toast({
            title: "Project Deleted Successfully",
          });
          setIsDeleting(false);
          refetch();
          useDelete.onClose();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to delete project!",
          });
          setIsDeleting(false);
        },
      }
    );
  };

  return (
    <Dialog open={useDelete.isOpen} onOpenChange={useDelete.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <span>
            <AlertTriangle />
          </span>
          <span>
            Are you sure you want to delete your project:{" "}
            <strong>{useDelete.name}</strong>?
          </span>
        </div>

        <DialogFooter>
          <div className="flex gap-4 w-full">
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>

            {
                isDeleting ? 

                <Button disabled variant={"destructive"}>
                    <Loader className="animate-spin"/><span>Deleting..</span>
                </Button> : 
          <Button variant={"destructive"} onClick={onDelete} disabled={isDeleting}>
          Delete
        </Button>
            }

      
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
