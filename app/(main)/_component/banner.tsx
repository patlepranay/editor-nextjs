"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentID: Id<"documents">;
}

const Banner = ({ documentID }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentID });

    toast.promise(promise, {
      loading: "Deleting article...",
      success: "Article Deleted",
      error: "Failed to delete article",
    });

    router.push("/documents");
  };
  const onRestore = () => {
    const promise = restore({ id: documentID });

    toast.promise(promise, {
      loading: "Restoring article...",
      success: "Article restored",
      error: "Failed to restore article",
    });
  };
  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in trash</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
