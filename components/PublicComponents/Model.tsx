"use client";
import { CircleCheckBig } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  description2: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  description2,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={`mx-auto w-[95%] !rounded-3xl`}>
        <CircleCheckBig
          size={80}
          className="flex justify-center items-center mx-auto text-green-600"
        />
        <DialogHeader className="flex flex-col gap-2 items-center justify-center ">
          <DialogTitle>{title}</DialogTitle>
          <div className="flex flex-col gap-1 items-center justify-center ">
            <DialogDescription>{description}</DialogDescription>
            <DialogDescription>{description2}</DialogDescription>
          </div>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
