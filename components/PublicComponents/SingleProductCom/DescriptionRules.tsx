import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";
import { Editor } from "../../../components/editor/Editor";

type Props = {
  loading: any;
  product: any;
};

const DescriptionRules = ({ loading, product }: Props) => {
  const lang = useLocale();

  const tHomeProducts = useTranslations("HomeProducts");
  return (
    <Card className=" bg-transparent border-none transition-all duration-500  mb-4 shadow-none ">
      <h3 className="flex justify-center after:w-[1px] relative after:h-[21px] after:left-1/2 after:top-14 after:transform after:-translate-x-1/2 after:bg-primary after:z-20 after:absolute after:rounded-3xl  items-center mx-auto border border-primary p-4 w-fit rounded-3xl font-semibold">
        {tHomeProducts("descRules")}
      </h3>
      <CardContent className=" w-full  p-4  ">
        {loading ? (
          <div className="flex justify-center items-center gap-4 flex-col">
            <Skeleton className="w-[90%] h-[20px] rounded-full mx-auto" />
            <Skeleton className="w-[90%] h-[20px] rounded-full mx-auto" />
            <Skeleton className="w-[90%] h-[20px] rounded-full mx-auto" />
            <Skeleton className="w-[90%] h-[20px] rounded-full mx-auto" />
            <Skeleton className="w-[90%] h-[20px] rounded-full mx-auto" />
          </div>
        ) : (
          <>
            <div className="">
              {lang === "en" ? (
                product?.descriptionEn ? (
                  <div>
                    {" "}
                    <Editor value={product.descriptionEn} />
                  </div>
                ) : (
                  <p>No description available in English</p>
                )
              ) : product?.descriptionAr ? (
                <div dir="rtl" className=" text-right">
                  <Editor value={product.descriptionAr} />
                </div>
              ) : (
                <p>الوصف غير متوفر بالعربية</p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DescriptionRules;
