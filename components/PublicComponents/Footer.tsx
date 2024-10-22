"use client";
import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { Link as LinkNav } from "../../navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import OGSGAMESLOGO from "../../public/assets/OGLOGOLIGHT.png";
import OGSGAMESDARK from "../../public/assets/OGLOGODARK.png";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "../../graphql/queries/getSettings";
import { Skeleton } from "../ui/skeleton";

const Footer = () => {
  const tFooter = useTranslations("AllFooter");
  const lang = useLocale();
  const { data, loading } = useQuery(GET_SETTINGS);
  const featShip = data?.getSettings[0];

  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=61563176355416",
      imgSrc: "/assets/facebook.png",
      alt: "Facebook Logo",
      tooltipText: tFooter("FolloFacebook"),
    },
    {
      href: "https://www.instagram.com/ogsgames_/",
      imgSrc: "/assets/instagram.png",
      alt: "Instagram logo",
      tooltipText: tFooter("FolloInsta"),
    },
    {
      href: "https://www.tiktok.com/@ogsgames_",
      imgSrc: "/assets/tiktok.png",
      alt: "tiktok Logo",
      tooltipText: tFooter("FolloTikTok"),
    },
    {
      href: "https://www.youtube.com/@ogsgamess",
      imgSrc: "/assets/youtube.png",
      alt: "youtube Logo",
      tooltipText: tFooter("FolloYoutube"),
    },
  ];

  return (
    <footer className="text-center bg-background" aria-label="Footer">
      <Separator />
      <div className="flex items-center justify-center p-6 border-primary lg:justify-between px-12">
        <div className="mr-12 hidden lg:block text-[#666] leading-loose text-[18px] dark:text-[#939db6]">
          <span>{tFooter("socialP")} </span>
        </div>
        <div className="flex items-center md:gap-3 gap-6">
          <TooltipProvider>
            {socialLinks.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className="w-12 h-12 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                    target="_blank"
                    aria-label={`Follow us on ${link.alt.split(" ")[0]}`}
                  >
                    <Image
                      src={link.imgSrc}
                      alt={link.alt}
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="bg-black text-white border-[#292524] mb-2"
                  side="top"
                >
                  <p>{link.tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      <Separator />

      <div
        className={`mx-6 py-10 text-center ${
          lang == "ar" ? "md:!text-right" : "md:text-left"
        } px-12`}
      >
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:mt-16">
            <LinkNav
              href={`/`}
              className="mb-4 flex items-center justify-center font-semibold md:justify-start lg:justify-center gap-2"
            >
              <Image
                src={OGSGAMESDARK}
                alt="Logo"
                width={45}
                height={45}
                className="hidden dark:!flex rounded-full"
              />
              <Image
                src={OGSGAMESLOGO}
                alt="Logo"
                width={45}
                height={45}
                className="flex dark:!hidden rounded-full"
              />
              <p className="tracking-wide mt-1 dark:text-white font-semibold text-[22px] sm:text-[25px] bg-gradient-to-r from-slate-900 to-neutral-900 bg-clip-text text-transparent">
                <span className="tracking-[-4px]">OG</span>
                <span className="font-norican">
                  <span className="text-orange-500 !font-normal">s</span> Games
                </span>
              </p>
            </LinkNav>
            <p className="text-[#666] lg:text-center text-[16px] mx-auto px-3 dark:text-[#939db6]">
              {tFooter("mainP")}
            </p>
          </div>

          <div>
            <h2 className="mb-4 flex justify-center font-semibold md:justify-start text-[20px]">
              {tFooter("linkTitle1")}
            </h2>
            <div className="flex flex-col gap-2">
              {[
                { href: "/store", text: tFooter("footLink1") },
                { href: "/about-us", text: tFooter("footLink2") },
                { href: "/privacy-policy", text: tFooter("footLink4") },
                { href: "/terms-of-service", text: tFooter("footLink5") },
                { href: "/shipping-policy", text: tFooter("footLink6") },
                {
                  href: "/return-and-refund-policy",
                  text: tFooter("footLink7"),
                },
              ].map((link, index) => (
                <LinkNav
                  key={index}
                  href={link.href}
                  className="w-fit mx-auto md:mx-0 hover:underline text-[#666] leading-loose text-[14px] dark:text-[#939db6] hover:text-primary dark:hover:text-primary transition-all duration-300"
                >
                  {link.text}
                </LinkNav>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:justify-start md:items-start gap-1">
            <h2 className="text-left mb-4 flex justify-center font-semibold md:justify-start text-[20px]">
              {tFooter("contactTitle")}
            </h2>
            {loading ? (
              <Skeleton className="h-[20px] w-[170px] rounded-xl mb-4" />
            ) : (
              <p
                dir="ltr"
                className="text-left mb-4 flex items-center justify-center md:justify-start gap-2 text-[#666] leading-loose text-[14px] dark:text-[#939db6]"
              >
                <MapPin />
                {featShip?.addressOgs}
              </p>
            )}
            <Link
              dir="ltr"
              href={`mailto:ogsgamess@gmail.com`}
              className="text-left md:mx-0 mb-4 flex items-center justify-center md:justify-start gap-2 text-[#666] leading-loose text-[14px] dark:text-[#939db6] hover:!text-primary dark:hover:text-primary !transition-all !duration-300"
            >
              <Mail />
              ogsgamess@gmail.com
            </Link>
            <Link
              dir="ltr"
              href={`tel:+01098198827`}
              className="text-left md:mx-0 mb-4 flex items-center justify-center md:justify-start gap-2 text-[#666] leading-loose text-[14px] dark:text-[#939db6] hover:text-primary dark:hover:text-primary transition-all duration-300"
            >
              <Phone /> <span>+ 010 98198827</span>
            </Link>
          </div>
        </div>
      </div>

      <Separator />
      <div
        className={`bg-background p-6 text-center flex justify-center items-center gap-1 ${
          lang == "ar" && "flex-row-reverse"
        }`}
      >
        <div
          className={`flex justify-center items-center ${
            lang == "ar" && "!flex-row-reverse"
          } gap-1`}
        >
          &copy; <span>{new Date().getFullYear()}</span>
        </div>
        <span
          className={`tracking-wide dark:text-white font-semibold text-[18px] bg-gradient-to-r from-slate-900 to-neutral-900 bg-clip-text text-transparent`}
        >
          <span className="tracking-[-4px]">OG</span>
          <span className="font-norican">
            <span className="text-orange-500 !font-normal">s</span> Games
          </span>
        </span>{" "}
        <span>{tFooter("allrights")}</span>
      </div>
    </footer>
  );
};

export default Footer;
