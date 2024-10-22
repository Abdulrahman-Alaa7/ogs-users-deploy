import React from "react";
import Heading from "../../../utils/Heading";
import BreadCrumb from "../../../../components/ui/Breadcrumb";
import { useTranslations } from "next-intl";

const Page = () => {
  const tHeader = useTranslations("AllHeader");
  const tPage = useTranslations("privacy-policy");

  const breadcrumbItems = [{ title: `${tHeader("privacyPol")}`, link: "/" }];
  return (
    <>
      <Heading
        title={`${tHeader("privacyPol")} - OGs Games`}
        description="اكتشف كيف تحمي OGs Games خصوصيتك وبياناتك الشخصية."
        keywords="سياسة الخصوصية, حماية البيانات, الأمان, OGs Games"
      />
      <div className="mt-[90px] md:mt-[105px] fadeIn px-1 md:px-12">
        <div className="flex justify-center items-center mx-auto">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <h1
          className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
        >
          {tHeader("privacyPol")}
        </h1>
        <div className={`mb-4`}>
          <div className="mb-3  w-[95%] 800px:w-[100%] m-auto">
            <div className="px-1">
              <div className="  ">
                <p className="mb-4">{tPage("p1")}</p>
                <p className="mb-4">{tPage("p2")}</p>
                <h2 className="text-2xl font-semibold mb-4">
                  {tPage("title1")}{" "}
                </h2>
                <h3 className="text-xl font-semibold mb-2">
                  {tPage("title2")}{" "}
                </h3>
                <ul className="list-disc list-inside mb-4">
                  <li>{tPage("lt1")}</li>
                  <li>{tPage("lt2")}</li>
                  <li>{tPage("lt3")}</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2">
                  {tPage("title3")}
                </h3>
                <p className="mb-4">{tPage("pt2")}</p>
                <h2 className="text-2xl font-semibold mb-4">
                  {tPage("title4")}
                </h2>
                <p className="mb-4">{tPage("pt3")}</p>
                <ul className="list-disc list-inside mb-4">
                  <li>{tPage("lt41")}</li>
                  <li>{tPage("lt42")}</li>
                  <li>{tPage("lt43")}</li>
                  <li>{tPage("lt44")}</li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4">
                  {tPage("title5")}
                </h2>
                <p className="mb-4">{tPage("pt4")}</p>
                <h2 className="text-2xl font-semibold mb-4">
                  {tPage("title6")}
                </h2>
                <p className="mb-4">{tPage("pt5")}</p>
                <h2 className="text-2xl font-semibold mb-4">
                  {tPage("title7")}{" "}
                </h2>
                <p className="mb-4">{tPage("pt6")}</p>
                <h2 className="text-2xl font-semibold mb-4">
                  {tPage("title8")}{" "}
                </h2>
                <p className="mb-4">{tPage("pt7")}</p>
                <h2 className="text-2xl font-semibold mb-4">
                  {tPage("title9")}
                </h2>
                <p className="mb-4">
                  {tPage("pt8")}
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
