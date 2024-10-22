"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Link } from "../../navigation";
import { Badge } from "../ui/badge";
import { useLocale, useTranslations } from "next-intl";
import TopSellingLimit from "./filters/TopSellingLimit";
import TopRatedLimit from "./filters/TopRatedLimit";
import NewLimit from "./filters/NewLimit";
import { StoreIcon } from "lucide-react";

const IndexProductList = () => {
  const tHomeProducts = useTranslations("HomeProducts");
  const tHeader = useTranslations("AllHeader");
  const lang = useLocale();
  const triggers = [
    {
      value: "new-trending",
      label: tHomeProducts("homeProductsFilternewTrend"),
    },
    {
      value: "bestSelling",
      label: tHomeProducts("homeProductsFilterBestsell"),
    },
    { value: "fan-favorite", label: tHomeProducts("homeProductsFilterFavFav") },
  ];

  return (
    <section className="bg-secondary dark:bg-[#ffffff05] fadeIn pb-12 pt-2">
      <div className="mt-6 px-2 md:px-12">
        <h1 className="text-[35px] font-bold gradient-text text-center tracking-tight 600px:text-[40px] 800px:text-[45px] 1000px:text-[50px] 1100px:text-[60px] 1200px:text-[70px] mb-4">
          {tHomeProducts("homeProductsTitle")}
        </h1>

        <Tabs defaultValue="new-trending" className="mx-auto">
          <TabsList
            className={`flex ${
              lang === "ar" ? "flex-row-reverse" : ""
            } items-center justify-center gap-2 w-[359px] sm:w-[375px] mx-auto rounded-full !px-3 h-12 border !border-primary shadow bg-background`}
          >
            {triggers.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white rounded-full hover:bg-primary hover:text-white"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex justify-end items-end my-3">
            <Link href="/store">
              <Badge
                variant="outline"
                className={`${
                  lang === "ar" ? "flex-row-reverse" : ""
                } flex justify-center items-center gap-2 font-normal text-[18px] hover:bg-primary hover:text-white px-3 border-primary text-primary`}
              >
                <StoreIcon size={18} />
                {tHeader("store")}
              </Badge>
            </Link>
          </div>

          <TabsContent value="new-trending">
            <NewLimit />
          </TabsContent>
          <TabsContent value="bestSelling">
            <TopSellingLimit />
          </TabsContent>
          <TabsContent value="fan-favorite">
            <TopRatedLimit />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default IndexProductList;
