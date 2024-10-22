"use client";
import React, { useContext, useState } from "react";
import { Link } from "../../navigation";
import { Button } from "../ui/button";
import { AppContext } from "../../app/utils/AppContext";
import { useLocale, useTranslations } from "next-intl";
import ProductCarousel from "./ProductCarousel";
import { Badge } from "../ui/badge";
import BreadCrumb from "../ui/Breadcrumb";
import MainBtn from "./MainBtn";
import { TbShoppingBagX } from "react-icons/tb";
import { StoreIcon } from "lucide-react";
import Heading from "../../app/utils/Heading";

type Props = {};

const ShippingListPage = (props: Props) => {
  const lang = useLocale();
  const tHeader = useTranslations("AllHeader");
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [isViewMore, setIsViewMore] = useState(true);
  const tHomeProducts = useTranslations("HomeProducts");

  const breadcrumbItems = [{ title: `${tHeader("bag")}`, link: "/" }];

  const handleToggleView = () => {
    if (isViewMore) {
      setVisibleProducts(8);
    } else {
      setVisibleProducts(4);
    }
    setIsViewMore(!isViewMore);
  };

  const { shippingListOgs } = useContext(AppContext);

  const sumPrice = (order: any[]) => {
    let TotalPrice = 0;
    for (let i = 0; i < order.length; i++) {
      TotalPrice += order[i].price * order[i].quantity;
    }
    return TotalPrice;
  };

  return (
    <>
      <Heading
        title={`${tHeader("bag")} - OGs Games`}
        description="مراجعة مشترياتك من OGS Games وإتمام عملية الدفع بسهولة وسرعة."
        keywords="Card games, ogs games, سلة التسوقو, OGs Games, مشتريات ، الدفع"
      />
      {shippingListOgs.length >= 1 ? (
        <div className="fadeIn mt-6 px-4 md:px-12 ">
          <div className="flex justify-center items-center mx-auto">
            <BreadCrumb items={breadcrumbItems} />
          </div>
          <h1
            className={`1200px:text-[70px] 1100px:text-[60px] pb-3 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
          >
            {tHeader("shippingListReviewBtn")}
          </h1>
          <div className="bg-secondary p-5 rounded-3xl flex justify-between items-center gap-3 my-4 w-full md:w-[80%] mx-auto flex-col md:flex-row ">
            <p className=" text-[25px] font-bold ">
              {lang === "ar" ? (
                <>
                  {tHeader("payInFull")} : {sumPrice(shippingListOgs)}{" "}
                  {tHeader("pound")}
                </>
              ) : (
                <>
                  {tHeader("payInFull")} : {tHeader("pound")}{" "}
                  {sumPrice(shippingListOgs)}
                </>
              )}
            </p>
            <Link href={`/checkout`} className="">
              <Badge
                variant={`outline`}
                className="font-normal text-white text-[18px] bg-primary hover:bg-foreground hover:text-white dark:hover:text-black dark:text-white w-[250px] flex justify-center items-center py-2"
              >
                {" "}
                {tHeader("checkoutBtn")}
              </Badge>
            </Link>
          </div>
          <div
            dir="ltr"
            className={` grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all ${
              isViewMore
                ? "ease-in duration-300"
                : "ease-out duration-300 fadeHidden"
            } pb-8`}
          >
            {shippingListOgs.slice(0, visibleProducts).map((product: any) => (
              <div className="fadeIn" key={product.id}>
                <ProductCarousel product={product} />
              </div>
            ))}
          </div>
          {isViewMore && shippingListOgs.length > 4 ? (
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
            <TbShoppingBagX size={125} className=" text-muted-foreground" />
            <h1 className=" text-[25px] font-bold">
              {tHeader("shippingListTitle")}
            </h1>
            <p className="text-center sm:text-[18px] text-[15px]">
              {tHeader("shippingListdesc")}
            </p>
          </div>
          <Link href={`/store`} className="z-50">
            <MainBtn
              accessKey="Store_Button_In_Shipping_List"
              title={`${tHeader("shopNowBtn")}`}
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default ShippingListPage;
