import React from "react";
import Image from "next/image";
import MoreInfoAboutUs from "../../public/assets/iphone.png";
import OGSGAMESLOGO from "../../public/assets/OGLOGOLIGHT.png";
import OGSGAMESDARK from "../../public/assets/OGLOGODARK.png";
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";

const MoreInfoAboutus = React.memo(() => {
  const tMoreInfo = useTranslations("MoreInfoAboutUs");

  return (
    <section className="fadeIn">
      <div className="mt-6 bg-secondary dark:bg-[#ffffff05] ">
        <Separator />
        <h1 className="mt-3 text-center tracking-tight font-bold gradient-text text-[30px] 600px:text-[35px] 800px:text-[40px] 1000px:text-[45px] 1100px:text-[50px] 1200px:text-[60px]">
          {tMoreInfo("moreInfoTitle")}
        </h1>

        <div className="w-full 1000px:!w-[90%] !mx-auto flex flex-col-reverse items-center justify-center gap-2 px-1 py-1 800px:flex-row-reverse  800px:justify-between 800px:p-8 ">
          <div className="w-[97%] mx-auto pt-1 text-center font-normal text-[#666] leading-loose text-[16px] md:text-[18px] dark:text-[#939db6] 800px:!w-[50%]">
            <p className="mb-3">{tMoreInfo("moreInfodesc")}</p>
            <p>{tMoreInfo("moreInfoP")}</p>
          </div>
          <div className="relative flex justify-center items-center w-full 800px:!w-[50%]">
            <Image
              src={MoreInfoAboutUs}
              alt="More Info About Us"
              className="rounded-3xl object-contain w-[360px] h-[360px] 1300px:w-[400px] 1300px:h-[400px] 1000px:w-[400px] 1000px:h-[400px]"
              loading="lazy"
              width={400}
              height={400}
            />
            <Image
              src={OGSGAMESLOGO}
              alt="OGS Games Logo Light"
              width={200}
              height={200}
              className="absolute !flex  dark:!hidden md:rounded-full rounded-md"
              loading="lazy"
            />
            <Image
              src={OGSGAMESDARK}
              alt="OGS Games Logo Dark"
              width={200}
              height={200}
              className="absolute hidden  dark:!flex md:rounded-full rounded-md"
              loading="lazy"
            />
          </div>
        </div>
        <br />
      </div>
    </section>
  );
});

MoreInfoAboutus.displayName = "MoreInfoAboutus";

export default MoreInfoAboutus;
