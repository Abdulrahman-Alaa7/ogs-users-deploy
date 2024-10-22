"use client";
import React, { FC, useState } from "react";
import { FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  product: any;
};

const ShareButtons: FC<Props> = ({ product }) => {
  const tHomeProducts = useTranslations("HomeProducts");
  const [copied, setCopied] = useState<boolean>(false);

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `${tHomeProducts("checkOutThisGame")}: ${product.name}`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsapp = () => {
    const text = encodeURIComponent(
      `${tHomeProducts("checkOutThisGame")}: ${window.location.href}`
    );
    const url = `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  };

  const shareOnTelegram = () => {
    const text = encodeURIComponent(
      `${tHomeProducts("checkOutThisGame")}: ${window.location.href}`
    );
    const url = `https://telegram.me/share/url?url=${text}`;
    window.open(url, "_blank");
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    handleCopy();
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className=" transition-all duration-300">
            <Button
              type="button"
              className="xl:w-[350%] lg:w-[250%] md:w-[200%] w-[200%] rounded-full gap-2 py-2 px-4 bg-primary   transition-all"
              onClick={shareOnFacebook}
              name="facebook"
              accessKey="Share_FaceBook"
              aria-label="Share On Facebook"
            >
              <FaFacebook size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="bg-black text-white border-[#292524]"
            side="bottom"
          >
            <p>{tHomeProducts("shareFacebook")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className=" transition-all duration-300">
            <Button
              type="button"
              className="xl:w-[350%] lg:w-[250%] md:w-[200%] w-[200%] rounded-full gap-2 py-2 px-4 bg-primary transition-all"
              onClick={shareOnTwitter}
              name="X"
              accessKey="Share_X"
              aria-label="Share On X"
            >
              <FaXTwitter size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="bg-black text-white border-[#292524]"
            side="bottom"
          >
            <p>{tHomeProducts("shareX")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className=" transition-all duration-300">
            <Button
              type="button"
              className="xl:w-[350%] lg:w-[250%] md:w-[200%] w-[200%] rounded-full gap-2 py-2 px-4 bg-primary transition-all"
              onClick={shareOnWhatsapp}
              name="WhatsApp"
              accessKey="Share_WhatsApp"
              aria-label="Share On WhatsApp"
            >
              <FaWhatsapp size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="bg-black text-white border-[#292524]"
            side="bottom"
          >
            <p>{tHomeProducts("shareWhats")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className=" transition-all duration-300">
            <Button
              type="button"
              className="xl:w-[350%] lg:w-[250%] md:w-[200%] w-[200%] rounded-full gap-2 py-2 px-4 bg-primary transition-all"
              onClick={shareOnTelegram}
              name="Telegram"
              accessKey="Share_Telegram"
              aria-label="Share On Telegram"
            >
              <FaTelegram size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="bg-black text-white border-[#292524]"
            side="bottom"
          >
            <p>{tHomeProducts("shareTele")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className=" transition-all duration-300">
            <Button
              type="button"
              className="xl:w-[350%] lg:w-[250%] md:w-[200%] w-[200%] rounded-full gap-2 py-2 px-4 bg-primary transition-all"
              onClick={copyToClipboard}
              name="Copy Link"
              accessKey="Copy_product_link"
              aria-label="Copy product link"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="bg-black text-white border-[#292524]"
            side="bottom"
          >
            <p>{tHomeProducts("copyLink")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ShareButtons;
