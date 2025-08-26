"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "./use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Skeleton } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const sidebarMenuButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const SidebarContext = React.createContext({});

const Sidebar = React.forwardRef(function Sidebar({ className, children, ...props }, ref) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  if (isMobile) {
    return (
      <Sheet>
        <SheetContent side="left" className="w-[80vw] sm:w-[440px]">
          <div className="h-full py-6">
            <SidebarContext.Provider
              value={{
                isOpen: true,
                isHovered: false,
                toggleSidebar: () => {},
              }}
            >
              {children}
            </SidebarContext.Provider>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isHovered,
        toggleSidebar,
      }}
    >
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "relative flex h-full flex-col gap-4 overflow-hidden border-r bg-card px-2 py-2 transition-all duration-300",
          isOpen ? "w-64" : "w-12",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
});

const SidebarHeader = React.forwardRef(function SidebarHeader({ className, children, ...props }, ref) {
  const { isOpen } = React.useContext(SidebarContext);

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-12 items-center justify-between gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarHeaderTitle = React.forwardRef(function SidebarHeaderTitle({ className, children, ...props }, ref) {
  const { isOpen } = React.useContext(SidebarContext);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 transition-all duration-300",
        !isOpen && "w-0 overflow-hidden opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarHeaderAction = React.forwardRef(function SidebarHeaderAction({ className, children, ...props }, ref) {
  const { isOpen } = React.useContext(SidebarContext);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 transition-all duration-300",
        !isOpen && "w-0 overflow-hidden opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarSearch = React.forwardRef(function SidebarSearch({ className, ...props }, ref) {
  const { isOpen } = React.useContext(SidebarContext);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 transition-all duration-300",
        !isOpen && "w-0 overflow-hidden opacity-0",
        className
      )}
    >
      <Input
        type="search"
        placeholder="Search..."
        className="h-8"
        {...props}
      />
    </div>
  );
});

const SidebarBody = React.forwardRef(function SidebarBody({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarFooter = React.forwardRef(function SidebarFooter({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("mt-auto flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarToggle = React.forwardRef(function SidebarToggle({ className, ...props }, ref) {
  const { isOpen, toggleSidebar } = React.useContext(SidebarContext);

  return (
    <Button
      ref={ref}
      variant="ghost"
      className={cn(
        "h-9 w-9 p-0",
        className
      )}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeftIcon className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});

export {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarHeaderAction,
  SidebarSearch,
  SidebarBody,
  SidebarFooter,
  SidebarToggle,
};






