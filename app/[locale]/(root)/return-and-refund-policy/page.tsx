import React from "react";
import Heading from "../../../utils/Heading";
import BreadCrumb from "../../../../components/ui/Breadcrumb";
import { useTranslations } from "next-intl";

const Page = () => {
  const tHeader = useTranslations("AllHeader");
  const tPage = useTranslations("return-and-refund-policy");

  const breadcrumbItems = [{ title: `${tHeader("returnAndRe")}`, link: "/" }];
  return (
    <>
      <Heading
        title={`${tHeader("returnAndRe")} - OGS Games`}
        description="تعرف على سياسة الاسترجاع واسترداد الأموال من OGs Games."
        keywords="سياسة الاسترجاع, استرداد الأموال, OGS Games, سياسة المشتريات"
      />
      <div className="mt-[90px] md:mt-[105px] fadeIn px-1 md:px-12">
        <div className="flex justify-center items-center mx-auto">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <h1
          className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
        >
          {tHeader("returnAndRe")}
        </h1>
        <div className={`mb-4`}>
          <div className="mb-3 md:p-8 w-[95%] 800px:w-[100%] m-auto">
            <div className="px-1">
              <div className="  ">
                <h2 className="text-3xl font-bold mb-6">{tPage("title1")}</h2>
                <p className="mb-4">{tPage("p1")}</p>
                <p className="mb-4">
                  {tPage("p2")}
                  <a
                    href="mailto:ogsgamess@gmail.com"
                    className="text-blue-500"
                  >
                    ogsgamess@gmail.com
                  </a>{" "}
                  {tPage("p21")}
                </p>
                <p className="mb-4">{tPage("p3")}</p>
                <h2 className="text-3xl font-bold mb-6"> {tPage("title2")}</h2>
                <p className="mb-4">{tPage("pt21")}</p>
                <h2 className="text-3xl font-bold mb-6">{tPage("title3")}</h2>
                <p className="mb-4">
                  {tPage("pt31")}
                  <a
                    href="mailto:ogsgamess@gmail.com"
                    className="text-blue-500"
                  >
                    ogsgamess@gmail.com
                  </a>{" "}
                  {tPage("pt312")}
                </p>
                <p className="mb-4">{tPage("pt32")}</p>
                <h2 className="text-3xl font-bold mb-6">{tPage("title4")}</h2>
                <p className="mb-4">
                  {tPage("pt41")}
                  <a
                    href="mailto:ogsgamess@gmail.com"
                    className="text-blue-500"
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
