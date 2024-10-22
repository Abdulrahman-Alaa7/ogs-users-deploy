"use client";
import React, { FC } from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MdLanguage } from "react-icons/md";
import { usePathname, useRouter } from "../../navigation";

type Props = {};

const LangMenu: FC<Props> = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={`ghost`} size="icon" className="rounded-full">
          <MdLanguage size={20} className={`text-black dark:text-white `} />
          <span className="sr-only">Language Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className={`mt-2`}>
        <button
          type="button"
          onClick={() => router.push(pathname, { locale: "en" })}
          className="!text-center block w-full  mx-auto "
        >
          <DropdownMenuItem className="flex justify-center items-center">
            English
          </DropdownMenuItem>
        </button>
        <button
          type="button"
          onClick={() => router.push(pathname, { locale: "ar" })}
          className="!text-center block w-full  mx-auto "
        >
          <DropdownMenuItem className="flex justify-center items-center">
            العربية
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangMenu;
