"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import OGSGAMESLOGO from "../../public/assets/OGLOGOLIGHT.png";
import OGSGAMESDARK from "../../public/assets/OGLOGODARK.png";
import { Link } from "../../navigation";
import ShippingList from "./ShippingList";
import InputSearch from "./inputSearch";
import MoreHeader from "./MoreHeader";
import LangMenu from "../../app/utils/LangMenu";
import WishingList from "./WishingList";
import { useTranslations } from "next-intl";
import { ThemeSwitcher } from "../../app/utils/ThemeSwitcher";

type Props = {};

const Header: FC<Props> = () => {
  const [active, setActive] = useState(false);
  const tHeader = useTranslations("AllHeader");
  const tFooter = useTranslations("AllFooter");

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linksData = [
    {
      url: "/",
      text: `${tFooter("mainTitBreak")}`,
    },
    {
      url: "/store",
      text: `${tHeader("store")}`,
    },
    {
      url: "//about-us",
      text: `${tHeader("about-us")}`,
    },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-screen-md lg:max-w-full lg:px-2 transition-all duration-300 ${
          active &&
          "border-b sm:border border-primary shadow lg:!max-w-screen-lg md:rounded-3xl md:top-4"
        } bg-white/80 dark:!bg-background py-3  backdrop-blur-lg`}
        aria-label="Main Navigation"
      >
        <div className="px-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <Link
                aria-current="page"
                aria-label="Go to Homepage"
                className="flex items-center "
                href="/"
              >
                <Image
                  src={OGSGAMESDARK}
                  alt="Logo Dark"
                  width={200}
                  height={200}
                  className="hidden  dark:!flex h-12 w-12 md:rounded-full rounded-md "
                  priority
                />
                <Image
                  src={OGSGAMESLOGO}
                  alt="Logo Light"
                  width={200}
                  height={200}
                  className="flex  dark:!hidden h-12 w-12 md:rounded-full rounded-md "
                  priority
                />
                <p
                  className={`flex tracking-tighter !font-sans dark:text-white font-semibold text-[12px] sm:text-[20px] bg-gradient-to-r from-slate-900 to-neutral-900 bg-clip-text text-transparent`}
                >
                  Original Gamers
                </p>
              </Link>
            </div>

            <div className="flex items-center gap-1 mx-1">
              <div className="hidden md:!flex transition-all">
                {linksData.map((link: any, index: number) => (
                  <Link
                    key={index}
                    className="inline-block rounded-lg px-2 py-2 text-sm font-medium  text-gray-900 dark:text-gray-100 dark:hover:text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href={link.url}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-0">
                <LangMenu />
                <InputSearch />
              </div>
              <WishingList />
              <ShippingList />
              <ThemeSwitcher />
              <MoreHeader />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
