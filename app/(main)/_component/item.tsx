import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import React from "react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  expanded?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const create = useMutation(api.documents.create);
  const archieved = useMutation(api.documents.archieve);
  const router = useRouter();
  const CheveronIcon = expanded ? ChevronDown : ChevronRight;

  const { user } = useUser();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({
      title: "Untitled",
      parentDocument: id,
    }).then((documentID) => {
      if (!expanded) {
        onExpand?.();
      }
      router.push(`/documents/${documentID}`);
    });

    toast.promise(promise, {
      loading: "Creating a new article",
      success: "New article created",
      error: "Failed to create new article",
    });
  };

  const onArchieve = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archieved({ id }).then(() => router.push(`/documents}`));
    toast.promise(promise, {
      loading: "Moving the Article to trash",
      success: "Article deleted succesfull",
      error: "Failed to archieve Article",
    });
  };

  return (
    <>
      <div
        onClick={onClick}
        role="button"
        style={{
          paddingLeft: level ? `${level * 12 + 12}px` : "12px",
          // paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
        }}
        className={cn(
          "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
          active && "bg-primary/5 text-primary"
        )}
      >
        {!!id && (
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-300
                 dark:hover:bg-neutral-600 mr-1"
            onClick={handleExpand}
          >
            <CheveronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        )}

        {documentIcon ? (
          <div className="shrink-0 h-[18px] mr-2 "> {documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] w-[18px] text-muted-foreground mr-2" />
        )}
        <span className="truncate">{label}</span>

     

        {!!id && (
          <div className="ml-auto flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <div
                  role="button"
                  className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60"
                align="start"
                side="right"
                forceMount
              >
                <DropdownMenuItem onClick={onArchieve}>
                  <Trash className="h-4 w-4 mr-2 " />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-sm text-muted-foreground p-2">
                  Last Edited by : {user?.fullName}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              role="button"
              onClick={onCreate}
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25} px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />

      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
