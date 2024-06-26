"use client";

import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
  UserIcon,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

import { useMediaQuery } from "usehooks-ts";
import UserItem from "./user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./item";
import { toast } from "sonner";
import DocumentList from "./document-list";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import TrashBox from "./trashbox";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import Navbar from "./navbar";

const Navigation = () => {
  const pathName = usePathname();

  const isMobile = useMediaQuery("(max-width:768px)");

  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setisResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const params = useParams();

  const search = useSearch();
  const settings = useSettings();
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      colllapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      colllapse();
    }
  }, [pathName, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;

    if (newWidth > 480) newWidth = 480;

    if (sideBarRef.current && navBarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
    }
  };

  const resetWidth = () => {
    if (sideBarRef.current && navBarRef.current) {
      setIsCollapsed(false);
      setisResetting(true);

      sideBarRef.current.style.width = isMobile ? "100%" : "240px";
      navBarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navBarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => {
        setisResetting(false);
      }, 300);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const colllapse = () => {
    if (sideBarRef.current && navBarRef.current) {
      setIsCollapsed(true);
      setisResetting(true);

      sideBarRef.current.style.width = "0";
      navBarRef.current.style.setProperty("left", "0");
      setTimeout(() => {
        setisResetting(false);
      }, 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentID) =>
      router.push(`/documents/${documentID}`)
    );
    toast.promise(promise, {
      loading: "Creating a new article",
      success: "New article created",
      error: "Failed to create article",
    });
  };

  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          "group/sidebar h-full  overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={colllapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6 " />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            <UserItem />
            <Item
              label="Search"
              icon={Search}
              onClick={search.onOpen}
              isSearch
            />
          </div>
          <div className="mt-4 ">
            {/* render documents here */}
            <DocumentList />
            <Item onClick={handleCreate} label="Add a article" icon={Plus} />
            <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
            <Item onClick={handleCreate} label="New Item" icon={PlusCircle} />
            <Popover>
              <PopoverTrigger className="w-full mt-4">
                <Item
                  label="Deleted Articles"
                  icon={Trash}
                  onClick={() => {}}
                />
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-72 "
                side={isMobile ? "bottom" : "right"}
              >
                <TrashBox />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* this is separator to change size of sidebar  */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className=" bg-stone-900  group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 right-0 top-0"
        />
      </aside>
      <div
        ref={navBarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentID ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                role="button"
                onClick={resetWidth}
                className="h-6 w-6 text-muted-foreground "
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
