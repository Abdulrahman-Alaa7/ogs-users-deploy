"use client";
import React, { FC, useContext, useState } from "react";
import { Link } from "../../navigation";
import { Button } from "../ui/button";
import { AppContext } from "../../app/utils/AppContext";
import { useLocale, useTranslations } from "next-intl";
import ProductCarousel from "./ProductCarousel";
import { Badge } from "../ui/badge";
import BreadCrumb from "../ui/Breadcrumb";
import MainBtn from "./MainBtn";
import { TbHeartX } from "react-icons/tb";
import { StoreIcon } from "lucide-react";
import Heading from "../../app/utils/Heading";

type Props = {};

const WishListPage: FC<Props> = (props: Props) => {
  const lang = useLocale();
  const tHeader = useTranslations("AllHeader");
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [isViewMore, setIsViewMore] = useState(true);
  const tHomeProducts = useTranslations("HomeProducts");

  const breadcrumbItems = [{ title: `${tHeader("wishingList")}`, link: "/" }];

  const handleToggleView = () => {
    if (isViewMore) {
      setVisibleProducts(8);
    } else {
      setVisibleProducts(4);
    }
    setIsViewMore(!isViewMore);
  };
  const { wishingListOgs } = useContext(AppContext);

  return (
    <>
      <Heading
        title={`${tHeader("wishingList")} - OGs Games`}
        description="حفظ ألعاب الورق المفضلة لديك لشرائها لاحقاً مع OGs Games."
        keywords="قائمة المفضلة, حفظ الألعاب, المفضلات, OGs Games, ألعاب الورق, ogs games"
      />
      {wishingListOgs.length >= 1 ? (
        <div className="fadeIn mt-6 px-4 md:px-12 ">
          <div className="flex justify-center items-center mx-auto">
            <BreadCrumb items={breadcrumbItems} />
          </div>
          <h1
            className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
          >
            {tHeader("wishingListReviewBtn")}
          </h1>
          <div
            dir="ltr"
            className={` grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all ${
              isViewMore
                ? "ease-in duration-300"
                : "ease-out duration-300 fadeHidden"
            } pb-8`}
          >
            {wishingListOgs.slice(0, visibleProducts).map((product: any) => (
              <div className="fadeIn" key={product.id}>
                <ProductCarousel product={product} />
              </div>
            ))}
          </div>
          {isViewMore && wishingListOgs.length > 4 ? (
            <Button
              variant={`outline`}
              type="button"
              className={`w-full block my-3 ${!isViewMore && "!hidden"}`}
              onClick={handleToggleView}
            >
              {tHomeProducts("viewMoreBtn")}
            </Button>
          ) : (
            <div className="flex justify-center items-center my-3">
              <Link href={`/store`}>
                <Badge
                  variant={`outline`}
                  className={` gap-2 font-normal text-white text-[18px] bg-primary hover:bg-foreground hover:text-white dark:hover:text-black dark:text-white w-[250px] flex justify-center items-center py-2`}
                >
                  <StoreIcon />
                  {tHeader("store")}
                </Badge>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="fadeIn flex justify-center items-center my-6 flex-col gap-4">
          <div className="flex justify-center items-center  flex-col gap-1">
            <TbHeartX size={125} className=" text-muted-foreground" />
            <h1 className=" text-[25px] font-bold">
              {tHeader("wishingListTitle")}
            </h1>
            <p className="text-center sm:text-[18px] text-[15px]">
              {tHeader("wishingListdesc")}
            </p>
          </div>
          <Link href={`/store`} className="z-50">
            <MainBtn
              accessKey="Store_Button_In_Whishing_List"
              title={`${tHeader("shopNowBtn")}`}
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default WishListPage;
