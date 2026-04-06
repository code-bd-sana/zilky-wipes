"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ closeButton = true, ...props }: ToasterProps) {
  return (
    <Sonner
      closeButton={closeButton}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            "group toast border border-border bg-background text-foreground shadow-lg",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
