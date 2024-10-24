import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { FC } from "react";

interface ModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

/*
* Globar reusable modal
* Trigger stands for open modal
* Content stands for content within the modal
* title -> modal title
* description -> modal description
* Need to pass props values to use this modal.
*/

export const Modal: FC<ModalProps> = ({
  trigger,
  children,
  title,
  description,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger className={className} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
