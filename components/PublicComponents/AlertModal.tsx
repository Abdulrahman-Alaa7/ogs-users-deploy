"use client";
import { useEffect, useState } from "react";
import { Modal } from "./Model";
import { Link } from "../../navigation";
import MainBtn from "./MainBtn";
import { useTranslations } from "next-intl";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose }) => {
  const tCheckOut = useTranslations("CheckOut");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`${tCheckOut("successSend")}`}
      description={`${tCheckOut("desc1")}`}
      description2={`${tCheckOut("desc2")}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-center mx-auto w-full">
        <Link href={`/store`} className="z-50">
          <MainBtn title={`${tCheckOut("conShop")}`} />
        </Link>
      </div>
    </Modal>
  );
};
