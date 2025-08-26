"use client";

import { useEffect, useState } from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = function Toaster(props) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };





