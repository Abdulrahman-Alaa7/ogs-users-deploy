"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Truck, BadgePercent, Gift } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "../../graphql/queries/getSettings";
import { Skeleton } from "../ui/skeleton";

type Props = {
  icon: any;
  title: string;
  description: any;
};

const CardComponent = React.memo(
  ({ icon: Icon, title, description }: Props) => (
    <Card className=" p-6 rounded-3xl border-primary">
      <CardContent className="!p-0 flex flex-col justify-center items-center gap-2">
        <Icon size={50} className="text-primary" />
        <h2 className="font-bold text-[20px]">{title}</h2>
        <div className=" text-[#666] leading-loose text-[16px] text-center dark:text-[#939db6]">
          {description}
        </div>
      </CardContent>
    </Card>
  )
);

CardComponent.displayName = "CardComponent";

const SomeFeatures = () => {
  const tSomefeat = useTranslations("SomeFeatures");
  const lang = useLocale();
  const { data, loading } = useQuery(GET_SETTINGS);

  const featShip = data?.getSettings[0];

  const [freeShipDesc, setFreeShipDesc] = useState("");

  useEffect(() => {
    if (!loading && featShip) {
      setFreeShipDesc(
        lang === "ar" ? featShip.freeShipDescAr : featShip.freeShipDescEn
      );
    }
  }, [loading, lang, featShip]);

  return (
    <section className="fadeIn">
      <div className="flex justify-center items-center flex-col gap-8">
        <Separator />
        <h1 className="mt-3 1200px:text-[70px] 1100px:text-[60px] 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold gradient-text text-center tracking-tight">
          {tSomefeat("someFeaTitle")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 transition-all pb-8 mx-2">
          <CardComponent
            icon={Truck}
            title={tSomefeat("Feat1Tit")}
            description={
              loading ? (
                <Skeleton className="h-[20px] w-[210px] rounded-xl mt-3" />
              ) : (
                freeShipDesc
              )
            }
          />
          <CardComponent
            icon={BadgePercent}
            title={tSomefeat("Feat2Tit")}
            description={tSomefeat("Feat2desc")}
          />
          <CardComponent
            icon={Gift}
            title={tSomefeat("Feat3Tit")}
            description={tSomefeat("Feat3desc")}
          />
        </div>
      </div>
    </section>
  );
};

export default SomeFeatures;
