"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { IoIosSearch } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "../../navigation";

type Props = {};

const InputSearch = (props: Props) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const tHeader = useTranslations("AllHeader");
  const lang = useLocale();
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (search === "") {
      return;
    } else {
      router.push(`/results?search=${search}`);
      setIsOpen(false);
      setSearch("");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger accessKey="Open_search" aria-label="Search" asChild>
        <Button
          name="search"
          variant="ghost"
          className="px-2 rounded-full flex justify-center items-center"
          accessKey="Open_search_Buuton"
        >
          <IoIosSearch size={25} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={`top`}
        className="flex flex-col items-center min-h-[170px]"
      >
        <SheetHeader>
          <SheetTitle> {tHeader("inputSearchTitle")}</SheetTitle>
        </SheetHeader>
        <div className="relative w-full sm:w-[450px] px-1">
          <IoIosSearch
            size={25}
            className={`absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 ${
              lang == "en" ? "left-3" : "right-3"
            }`}
          />
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder={`${tHeader("inputSearchPlaceHolder")}`}
              className="w-full py-3 pl-12 pr-10  border rounded-full outline-none bg-muted focus:border-orange-600"
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
              }}
            />
            {search.length > 0 && (
              <IoCloseCircle
                size={25}
                className={`fadeIn absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 ${
                  lang == "en" ? "right-20" : "left-20"
                } cursor-pointer`}
                onClick={() => setSearch("")}
              />
            )}
            <Button
              className="rounded-full !py-4"
              type="button"
              onClick={handleSearch}
              name="search_btn"
              accessKey="Search_Button"
            >
              <IoIosSearch size={25} />
            </Button>
          </div>
        </div>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default InputSearch;
