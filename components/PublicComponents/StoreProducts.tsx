"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BreadCrumb from "../ui/Breadcrumb";
import TopRated from "./filters/TopRated";
import TopSelling from "./filters/TopSelling";
import NewProducts from "./filters/NewProducts";

type Props = {};

const StoreProducts = (props: Props) => {
  const lang = useLocale();
  const tFooter = useTranslations("AllFooter");
  const tHomeProducts = useTranslations("HomeProducts");
  const breadcrumbItems = [{ title: `${tFooter("footLink1")}`, link: "/" }];

  return (
    <div className="fadeIn  px-2 md:px-12 ">
      <div className="flex justify-center items-center mx-auto">
        <BreadCrumb items={breadcrumbItems} />
      </div>

      <div className=" ">
        <h1
          className={`1200px:text-[70px] mb-4 1100px:text-[60px]  1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
        >
          {tHomeProducts("allProductsTitle")}
        </h1>

        <Tabs defaultValue="new-trending" className=" mx-auto">
          <TabsList
            className={`flex ${
              lang == "ar" && " flex-row-reverse"
            } items-center justify-center gap-2 w-[359px] sm:w-[375px] mx-auto rounded-full !px-3 h-12 mb-6 border border-primary shadow bg-background`}
          >
            <TabsTrigger
              value="new-trending"
              className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white  rounded-full hover:bg-primary hover:text-white "
            >
              {tHomeProducts("homeProductsFilternewTrend")}
            </TabsTrigger>
            <TabsTrigger
              value="bestSelling"
              className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white  rounded-full hover:bg-primary hover:text-white "
            >
              {tHomeProducts("homeProductsFilterBestsell")}
            </TabsTrigger>
            <TabsTrigger
              value="fan-favorite"
              className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white  rounded-full hover:bg-primary hover:text-white "
            >
              {tHomeProducts("homeProductsFilterFavFav")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new-trending" className="">
            <NewProducts />
          </TabsContent>
          <TabsContent value="bestSelling" className="">
            <TopSelling />
          </TabsContent>
          <TabsContent value="fan-favorite" className="">
            <TopRated />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StoreProducts;
