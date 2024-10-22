"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { CgMenu } from "react-icons/cg";
import { Link } from "../../navigation";
import { Separator } from "../ui/separator";
import { BadgeInfo, Home, Store } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useLocale, useTranslations } from "next-intl";
import { MdOutlineLocalShipping, MdOutlinePrivacyTip } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";

type Props = {};

const MoreHeader = (props: Props) => {
  const tHeader = useTranslations("AllHeader");
  const tFooter = useTranslations("AllFooter");
  const [isOpen, setIsOpen] = useState(false);
  const lang = useLocale();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        name="MENU_BTN"
        accessKey="Menu_Button"
        aria-label="Menu"
        className="hover:bg-accent hover:text-accent-foreground h-10 px-2 py-2 rounded-full inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <CgMenu size={25} />
      </SheetTrigger>
      <SheetContent
        className="px-0 pt-0 pb-12"
        side={`${lang == "ar" ? "left" : "right"}`}
      >
        <ScrollArea className="h-[100%]">
          <SheetHeader className="mb-3 px-2 pt-4 pb-0 flex justify-center items-center mx-auto">
            <SheetTitle> {tHeader("menuTitle")} </SheetTitle>
          </SheetHeader>
          <Separator />
          <div className="flex   items-center gap-2 flex-col my-2 px-2">
            <Link
              className={`w-full flex justify-center items-center ${
                lang === "ar" && "flex-row-reverse"
              } gap-2 py-2 rounded-lg px-2  text-sm font-medium dark:hover:text-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900`}
              href={`/`}
              onClick={handleLinkClick}
            >
              <Home size={18} color="orange" />
              {tFooter("mainTitBreak")}
            </Link>
            <Link
              className={`w-full flex justify-center items-center ${
                lang === "ar" && "flex-row-reverse"
              } gap-2 py-2 rounded-lg px-2  text-sm font-medium dark:hover:text-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900`}
              href={`/store`}
              onClick={handleLinkClick}
            >
              <Store size={18} color="orange" />
              {tFooter("footLink1")}
            </Link>
            <Link
              className={`w-full  flex justify-center items-center ${
                lang === "ar" && "flex-row-reverse"
              } gap-2 py-2 rounded-lg px-2  text-sm font-medium dark:hover:text-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900`}
              href={`/about-us`}
              onClick={handleLinkClick}
            >
              <BadgeInfo size={18} color="orange" />
              {tFooter("footLink2")}
            </Link>
            <Link
              href={`/privacy-policy`}
              className={`w-full flex justify-center items-center ${
                lang === "ar" && "flex-row-reverse"
              } gap-2 py-2 rounded-lg px-2  text-sm font-medium dark:hover:text-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900`}
              onClick={handleLinkClick}
            >
              <MdOutlinePrivacyTip size={18} color="orange" />
              {tFooter("footLink4")}
            </Link>
            <Link
              href={`/terms-of-service`}
              className={`w-full flex justify-center items-center ${
                lang === "ar" && "flex-row-reverse"
              } gap-2 py-2 rounded-lg px-2  text-sm font-medium dark:hover:text-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900`}
              onClick={handleLinkClick}
            >
              <RiServiceLine size={18} color="orange" />
              {tFooter("footLink5")}
            </Link>
            <Link
              href={`/shipping-policy`}
              className={`w-full flex justify-center items-center ${
                lang === "ar" && "flex-row-reverse"
              } gap-2 py-2 rounded-lg px-2  text-sm font-medium dark:hover:text-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900`}
              onClick={handleLinkClick}
            >
              <MdOutlineLocalShipping size={18} color="orange" />
              {tFooter("footLink6")}
            </Link>
            <Link
              href={`/return-and-refund-policy`}
              className={`w-full flex justify-center items-center ${
                lang === "ar" && "flex-row-reverse"
              } gap-2 py-2 rounded-lg px-2  text-sm font-medium dark:hover:text-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900`}
              onClick={handleLinkClick}
            >
              <TbTruckReturn size={18} color="orange" />
              {tFooter("footLink7")}
            </Link>
          </div>

          <Separator />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MoreHeader;
