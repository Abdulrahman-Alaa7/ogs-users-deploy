import React from "react";
import Heading from "../../../utils/Heading";
import BreadCrumb from "../../../../components/ui/Breadcrumb";
import { useTranslations } from "next-intl";

const Page = () => {
  const tHeader = useTranslations("AllHeader");
  const tPage = useTranslations("terms-of-service");

  const breadcrumbItems = [{ title: `${tHeader("termsofser")}`, link: "/" }];
  return (
    <>
      <Heading
        title={`${tHeader("termsofser")} - OGs Games`}
        description="تعرف على شروط الاستخدام الخاصة بـ OGs Games وتفاصيل الخدمة المقدمة."
        keywords="شروط الخدمة, سياسة الاستخدام, OGs Games, الشروط والأحكام"
      />
      <div className="mt-[90px] md:mt-[105px] fadeIn px-1 md:px-12">
        <div className="flex justify-center items-center mx-auto">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <h1
          className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
        >
          {tHeader("termsofser")}
        </h1>
        <div className={`mb-4`}>
          <div className="mb-3  w-[95%] 800px:w-[100%] m-auto">
            <div className="px-1">
              <div className="  ">
                <h2 className="text-3xl font-bold mb-6">{tPage("title1")}</h2>
                <p className="mb-4">{tPage("p1")}</p>
                <h2 className="text-3xl font-bold mb-6"> {tPage("title2")}</h2>
                <p className="mb-4">{tPage("p2")}</p>
                <h2 className="text-3xl font-bold mb-6">{tPage("title3")}</h2>
                <p className="mb-4">{tPage("p3")}</p>
                <h2 className="text-3xl font-bold mb-6"> {tPage("title4")} </h2>
                <p className="mb-4">{tPage("p4")}</p>
                <h2 className="text-3xl font-bold mb-6">{tPage("title5")}</h2>
                <p className="mb-4">{tPage("p5")}</p>
                <h2 className="text-3xl font-bold mb-6"> {tPage("title6")}</h2>
                <p className="mb-4">{tPage("p6")}</p>
                <h2 className="text-3xl font-bold mb-6">{tPage("title7")}</h2>
                <p className="mb-4">{tPage("p7")}</p>
                <h2 className="text-3xl font-bold mb-6"> {tPage("title8")}</h2>
                <p className="mb-4">{tPage("p8")}</p>
                <h2 className="text-3xl font-bold mb-6">{tPage("title9")}</h2>
                <p className="mb-4">
                  {tPage("p9")}
                  <a
                    href="mailto:ogsgamess@gmail.com"
                    className="text-blue-500 text-[14px]"
                  >
                    ogsgamess@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
