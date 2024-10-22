import React from "react";
import Heading from "../../../utils/Heading";
import BreadCrumb from "../../../../components/ui/Breadcrumb";
import Image from "next/image";
import LOGOLIGHT from "../../../../public/assets/OGLOGOLIGHT.png";
import LOGODARK from "../../../../public/assets/OGLOGODARK.png";
import { useTranslations } from "next-intl";

const Page = () => {
  const tHeader = useTranslations("AllHeader");
  const tAboutUs = useTranslations("About-Us");

  const breadcrumbItems = [{ title: `${tHeader("about-us")}`, link: "/" }];
  return (
    <>
      <Heading
        title={`${tHeader("about-us")} - OGs Games`}
        description="تعرف على OGs Games، الشركة المتخصصة في بيع ألعاب الورق. اكتشف   هدفنا ورؤيتنا."
        keywords="ogs games , card games , العاب الورق , من نحن ، معلومات عن OGs Games"
      />
      <div className="mt-[90px] md:mt-[105px] fadeIn px-1 md:px-12">
        <div className="flex justify-center items-center mx-auto">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <h1
          className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
        >
          {tHeader("about-us")}
        </h1>

        <div
          className={`flex items-center 800px:justify-between justify-center flex-col gap-4  py-2  `}
        >
          <div className={` w-[100%] flex justify-center items-center`}>
            <Image
              src={LOGOLIGHT}
              alt="MoreInfoAboutUs"
              className={`flex  dark:!hidden w-[400px] h-[400px] 1300px:w-[400px] 1300px:h-[400px] 1000px:w-[300px] 1000px:h-[300px] rounded-3xl`}
            />
            <Image
              src={LOGODARK}
              alt="MoreInfoAboutUs"
              className={`hidden  dark:!flex w-[400px] h-[400px] 1300px:w-[400px] 1300px:h-[400px] 1000px:w-[300px] 1000px:h-[300px] rounded-3xl`}
            />
          </div>
        </div>
        <div className="px-[4px] mt-4 mb-16">
          <p
            className={`mb-3 leading-loose text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("p1")}
          </p>
          <p
            className={`mb-3 leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("p2")}
          </p>
          <p
            className={`mb-3 leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("p3")}
          </p>
          <p
            className={`mb-3 leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("p4")}
          </p>
          <h2 className="text-center border p-2 font-bold border-primary rounded text-[20px] mb-6">
            {tAboutUs("titleV")}
          </h2>
          <p
            className={`mb-6 leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("pV1")}
          </p>
          <h2 className="text-center border p-2 font-bold border-primary rounded text-[20px] mb-6">
            {tAboutUs("titleM")}
          </h2>
          <p
            className={`mb-6 leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("pM1")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
