"use client";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { DotButton, useDotButton } from "../EmblaCarouselDotButton";
import { EmblaCarouselType } from "embla-carousel";
import { Badge } from "../../ui/badge";
import { Minus, Plus, ArrowDown, StoreIcon, Gift } from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Link } from "../../../navigation";
import { TbShoppingBagPlus } from "react-icons/tb";
import { PiMinusCircleLight } from "react-icons/pi";
import { AppContext } from "../../../app/utils/AppContext";
import { useLocale, useTranslations } from "next-intl";
import BreadCrumb from "../../ui/Breadcrumb";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Separator } from "../../ui/separator";
import ShareButtons from "../ShareButtons ";
import SugProductsList from "../SugProducts";
import { toast } from "sonner";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../graphql/queries/getProducts";
import { GET_PRODUCT_BY_ID } from "../../../graphql/queries/getProductById";
import { Skeleton } from "../../ui/skeleton";
import Heading from "../../../app/utils/Heading";
import DescriptionRules from "../SingleProductCom/DescriptionRules";
import ReviewsCom from "../SingleProductCom/ReviewsCom";

type Props = {
  products: any;
  loading: any;
  product: any;
  reviews: any;
  setReviews: (reviews: any) => void;
};

const MainSec = ({
  products,
  loading,
  product,
  reviews,
  setReviews,
}: Props) => {
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);
  const [isExistInWish, setIsExistInWish] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ratings, setRatings] = useState<number>(0);
  const { selectedIndex, onDotButtonClick } = useDotButton(api);
  const [order, setOrder] = useState<Array<any>>([]);
  const [itemQuantities, setItemQuantities] = useState<{
    [key: string]: number;
  }>({});

  const lang = useLocale();
  const tHeader = useTranslations("AllHeader");
  const tHomeProducts = useTranslations("HomeProducts");

  const {
    shippingListOgs,
    wishingListOgs,
    handleAddNewItemShipping,
    handleDeleteItemShipping,
    handleItemShippingIncreaseOrDecrease,
    handleAddToWishingList,
    handleDeleteFromWishingList,
  } = useContext(AppContext);

  useEffect(() => {
    setOrder(shippingListOgs);

    const allProductsId = products?.map((el: any) => el.id);
    const updatedQuantities = allProductsId?.reduce((acc: any, id: string) => {
      const item = shippingListOgs.find((item: any) => item.id === id);
      if (item) acc[id] = item.quantity;
      return acc;
    }, {});
    setItemQuantities(updatedQuantities || {});
  }, [shippingListOgs, products]);

  const calculateDiscountPercentage = useCallback(
    (price: any, estimatedPrice: any) => {
      const discountAmount = price - estimatedPrice;
      return Math.round((discountAmount / price) * 100);
    },
    []
  );

  const discountPercentage = useMemo(
    () => calculateDiscountPercentage(product?.price, product?.estimatedPrice),
    [product?.price, product?.estimatedPrice, calculateDiscountPercentage]
  );

  const AddToList = useCallback(
    (item: any) => {
      setItemQuantities((prevState) => ({
        ...prevState,
        [item.id]: 1,
      }));

      setOrder((prevOrder: any) => [
        ...prevOrder,
        {
          id: item.id,
          name: item.name,
          img: item.mainImage,
          price: item.estimatedPrice > 0 ? item.estimatedPrice : item.price,
          quantity: 1,
        },
      ]);

      handleAddNewItemShipping(item, 1);
      toast.success(tHeader("successAddedBag"));
    },
    [handleAddNewItemShipping, tHeader]
  );

  const deleteFromList = useCallback(
    (id: any) => {
      setOrder((prevOrder: any) =>
        prevOrder.filter((item: any) => item.id !== id)
      );
      setItemQuantities((prevState) => ({ ...prevState, [id]: 0 }));
      handleDeleteItemShipping(id);
      toast(tHeader("successDelBag"));
    },
    [handleDeleteItemShipping, tHeader]
  );

  const handleIncrease = useCallback(
    (id: any) => {
      setItemQuantities((prevState) => ({
        ...prevState,
        [id]: (prevState[id] || 0) + 1,
      }));

      setOrder((prevOrder) =>
        prevOrder.map((item: any) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

      handleItemShippingIncreaseOrDecrease(id, itemQuantities[id] + 1);
    },
    [itemQuantities, handleItemShippingIncreaseOrDecrease]
  );

  const handleDecrease = useCallback(
    (id: any) => {
      if (itemQuantities[id] > 0) {
        setItemQuantities((prevState) => ({
          ...prevState,
          [id]: prevState[id] - 1,
        }));

        setOrder((prevOrder) =>
          prevOrder.map((item: any) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );

        handleItemShippingIncreaseOrDecrease(id, itemQuantities[id] - 1);
      }
    },
    [itemQuantities, handleItemShippingIncreaseOrDecrease]
  );

  const handleAddWishingList = useCallback(
    (item: any) => {
      handleAddToWishingList(item);
      toast.success(tHeader("successAddedFav"));
    },
    [handleAddToWishingList, tHeader]
  );

  const handleDeleteWishingList = useCallback(
    (id: any) => {
      handleDeleteFromWishingList(id);
      toast(tHeader("successDelFav"));
    },
    [handleDeleteFromWishingList, tHeader]
  );

  useEffect(() => {
    setIsExistInWish(wishingListOgs.some((el: any) => el.id === product?.id));
  }, [wishingListOgs, product?.id]);

  useEffect(() => {
    setReviews(product?.reviews || []);
  }, [product, setReviews]);

  const avgRef = useRef(0);

  useEffect(() => {
    if (reviews?.length) {
      setIsLoading(true);
      avgRef.current = reviews.reduce(
        (acc: number, rev: any) => acc + rev.rating,
        0
      );
      setRatings(Number((avgRef.current / reviews.length).toFixed(1)));
      setIsLoading(false);
    } else {
      setRatings(0);
    }
  }, [reviews]);

  return (
    <>
      {loading ? (
        <Card className="  border-primary flex flex-col lg:flex-row gap-4 md:items-center  relative  px-4  pt-4 pb-8 transition-all duration-500 mb-4  ">
          <div className=" md:w-[60%] w-full ">
            <div
              className={`relative   max-w-[100%] min-h-96 transition-all  p-[7px]  flex justify-center items-center flex-col rounded-lg font-semibold text-[15px]`}
            >
              <div>
                <Skeleton className="h-[330px] w-[350px] rounded-xl" />
              </div>
            </div>
          </div>
          <Separator orientation="vertical" />
          <CardContent className="md:w-[40%] w-full flex flex-col gap-4 p-2 ">
            <div className="flex justify-center">
              <span className=" line-clamp-2 font-bold !text-[25px]">
                <Skeleton className="w-[250px] h-[30px] rounded-full" />
              </span>
            </div>
            <div className="flex justify-center items-center mx-auto">
              <Skeleton className="w-[250px] h-[30px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center ">
              <Skeleton className="w-[50px] h-[20px] rounded-full" />
            </div>

            <div className="prices flex justify-center items-center gap-3 my-3 ">
              <Badge
                variant="secondary"
                className="font-bold !text-[16px] lg:!text-[20px] p-2"
              >
                <Skeleton className="w-[200px] h-[20px] rounded-full" />
              </Badge>
            </div>

            <div className="flex flex-col gap-4 items-center w-full   ">
              <div
                className={` transition-all  flex justify-center items-center  mb-3 flex-col`}
              >
                <Skeleton className="w-[250px] h-[20px] rounded-full" />
              </div>
              <div>
                <Skeleton className="w-[300px] h-[20px] rounded-full" />
              </div>

              <div
                className={`flex flex-col justify-center items-center gap-2 ${
                  lang == "ar" && "flex-row-reverse"
                } `}
              >
                <Image
                  src={`/assets/desc-pic-1.png`}
                  alt="description&rules"
                  width={150}
                  height={150}
                  loading="lazy"
                  aria-label="description and rules"
                />
                <p className="flex justify-center items-center gap-4 text-[18px]">
                  {" "}
                  <ArrowDown
                    size={30}
                    className="animate-bounce border p-1 rounded-full"
                  />
                  {tHomeProducts("descRules")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className=" mb-4 border-primary flex flex-col lg:flex-row gap-4 md:items-center  relative  px-4  pt-4 pb-8 transition-all duration-500 ">
          <div className=" absolute right-2 top-2 flex flex-col items-center gap-2 z-30">
            {isExistInWish ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full w-10 h-10 flex justify-center items-center p-0 transition-all duration-300 shadow-md"
                      onClick={() => handleDeleteWishingList(product.id)}
                      aria-label="Remove From My WishList"
                    >
                      <IoIosHeart size={25} className="text-primary" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p>{tHomeProducts("deleteFromWishList")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full w-10 h-10 flex justify-center items-center p-0 transition-all duration-300 shadow-md"
                      onClick={() => handleAddWishingList(product)}
                      aria-label="Add To My WishList"
                    >
                      <IoIosHeartEmpty size={25} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p>{tHomeProducts("addToWishList")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {product?.aiGen === true && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-8 h-8 rounded-md cursor-default shadow-md bg-gradient-to-r from-violet-200 to-pink-200 text-black/80 flex justify-center items-center gap-1 hover:opacity-80">
                      <Image
                        src={`/assets/ai.png`}
                        alt="ai"
                        width={20}
                        height={20}
                        loading="lazy"
                        aria-label="AI_Generated"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-black text-white border-[#292524]"
                    side="left"
                  >
                    <p>{tHomeProducts("aiGen")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className=" md:w-[60%] w-full ">
            <div
              dir="ltr"
              className=" absolute left-2 top-2  flex  items-start gap-1 z-20 flex-col "
            >
              {product?.soldOut === true && (
                <Badge
                  variant={`default`}
                  className={`${
                    lang === "ar" && "flex-row-reverse"
                  } text-[14px] bg-black dark:bg-white shadow-md dark:text-black text-white hover:!bg-primary hover:!text-white flex justify-center items-center gap-1`}
                >
                  <IoCloseCircleOutline size={17} />{" "}
                  {tHomeProducts("soldOutBtn")}
                </Badge>
              )}
              {product?.offer === true && (
                <Badge
                  variant={`default`}
                  className={`${
                    lang === "ar" && "flex-row-reverse"
                  } text-[14px] bg-[crimson]  shadow-md text-white hover:!bg-primary hover:!text-white flex justify-center items-center gap-1`}
                >
                  <Gift size={17} /> {tHomeProducts("offer")}
                </Badge>
              )}
            </div>

            {product?.images?.length > 0 ? (
              <Carousel
                className="relative"
                setApi={setApi}
                opts={{ direction: `${lang == "ar" ? "rtl" : "ltr"}` }}
              >
                <CarouselContent>
                  <CarouselItem>
                    <div
                      className={`relative   max-w-[100%] min-h-96 md:mt-12  transition-all  p-[7px]  flex justify-center items-center flex-col rounded-lg font-semibold text-[15px]`}
                    >
                      <Image
                        src={product?.mainImage}
                        alt={product?.name}
                        fill
                        className="absolute object-contain rounded-md z-10 max-w-[99%] mx-auto   cursor-grab"
                        loading="lazy"
                        aria-label={`First Image In ${product?.name}`}
                      />
                    </div>
                  </CarouselItem>
                  {product?.images.map((el: any, elIndex: number) => (
                    <CarouselItem key={elIndex}>
                      <div
                        className={` relative   max-w-[100%] min-h-96  transition-all  p-[7px]  flex justify-center items-center flex-col rounded-lg font-semibold text-[15px]`}
                      >
                        <Image
                          src={el}
                          alt={product?.name}
                          fill
                          className="absolute object-contain rounded-md z-10 max-w-[99%] mx-auto   cursor-grab "
                          loading="lazy"
                          aria-label={` Image Number ${elIndex} In ${product?.name}`}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  dir="ltr"
                  className={`hidden xl:flex absolute  ${
                    lang == "ar" ? "xl:left-[750px] rotate-180" : "left-24"
                  } `}
                />
                <CarouselNext
                  dir="ltr"
                  className={`hidden xl:flex  absolute  ${
                    lang == "ar" ? "xl:right-[750px] rotate-180" : "right-24"
                  } `}
                />
                <div
                  className={`mt-2 !flex justify-center items-center gap-1 mx-auto`}
                >
                  <DotButton
                    onClick={() => onDotButtonClick(0)}
                    className={`${
                      0 === selectedIndex
                        ? "!bg-primary !w-2 !h-2 border border-border shadow rounded-full cursor-pointer scale-150 transition-all duration-300"
                        : "!w-2 !h-2 bg-foreground border border-border shadow rounded-full cursor-pointer transition-all duration-300 hover:scale-150"
                    }`}
                  />
                  {product.images.map((_: any, elIndex: number) => (
                    <DotButton
                      key={elIndex + 1}
                      onClick={() => onDotButtonClick(elIndex + 1)}
                      className={`${
                        elIndex + 1 === selectedIndex
                          ? "!bg-primary !w-2 !h-2 border border-primary shadow rounded-full cursor-pointer scale-150 transition-all duration-300"
                          : "!w-2 !h-2 bg-foreground border border-foreground shadow rounded-full cursor-pointer transition-all duration-300 hover:scale-150"
                      }`}
                    />
                  ))}
                </div>
              </Carousel>
            ) : (
              <div
                className={`relative   max-w-[100%] min-h-96 transition-all  p-[7px]  flex justify-center items-center flex-col rounded-lg font-semibold text-[15px]`}
              >
                <Image
                  src={product?.mainImage}
                  alt={product?.name}
                  fill
                  className="absolute object-contain rounded-md z-10 max-w-[99%] mx-auto "
                  loading="lazy"
                  aria-label={`Main Image In ${product?.name}`}
                />
              </div>
            )}
          </div>
          <Separator orientation="vertical" />
          <CardContent className="md:w-[40%] w-full flex flex-col gap-4 p-2 ">
            <div className="flex justify-center">
              <span className=" line-clamp-2 font-bold !text-[25px]">
                {product?.name}
              </span>
            </div>
            <div className="flex justify-center items-center mx-auto">
              {loading || isLoading ? (
                <Skeleton className="w-[250px] h-[30px] rounded-full" />
              ) : (
                <>
                  <Rating style={{ maxWidth: 180 }} value={ratings} readOnly />
                </>
              )}
            </div>
            {loading || isLoading ? (
              <div className="flex justify-center items-center mx-auto">
                <Skeleton className="w-[50px] h-[20px] rounded-full" />
              </div>
            ) : (
              <>
                <p className="flex justify-center items-center mx-auto text-sm text-[#666] leading-loose dark:text-[#939db6] ">
                  (
                  {`${ratings} • ${reviews && reviews.length} ${tHomeProducts(
                    "rateTitAll"
                  )}`}
                  )
                </p>
              </>
            )}
            {product?.estimatedPrice > 0 ? (
              <div
                dir={`${lang === "ar" ? "rtl" : "ltr"}`}
                className="prices flex justify-center items-center gap-3 mt-1 mb-2"
              >
                <span className="font-semibold block line-through text-muted-foreground !text-[16px] lg:!text-[20px] p-2">
                  {lang === "ar" ? (
                    <>
                      {product?.price} {tHeader("pound")}
                    </>
                  ) : (
                    <>
                      {tHeader("pound")} {product?.price}
                    </>
                  )}{" "}
                </span>
                <Badge
                  variant="secondary"
                  className="font-bold !text-[16px] lg:!text-[20px] p-2"
                >
                  {lang === "ar" ? (
                    <>
                      {product?.estimatedPrice} {tHeader("pound")}
                    </>
                  ) : (
                    <>
                      {tHeader("pound")} {product?.estimatedPrice}
                    </>
                  )}
                </Badge>
                <Badge
                  variant="default"
                  className="text-white font-bold !text-[16px] lg:!text-[20px] p-2"
                >
                  {discountPercentage}%
                </Badge>
              </div>
            ) : (
              <div
                dir={`${lang === "ar" ? "rtl" : "ltr"}`}
                className="prices flex justify-center items-center gap-3 my-3 "
              >
                <Badge
                  variant="secondary"
                  className="font-bold !text-[16px] lg:!text-[20px] p-2"
                >
                  {lang === "ar" ? (
                    <>
                      {product?.price} {tHeader("pound")}
                    </>
                  ) : (
                    <>
                      {tHeader("pound")} {product?.price}
                    </>
                  )}
                </Badge>
              </div>
            )}

            <div className="flex flex-col gap-4 items-center w-full   ">
              <div
                className={` transition-all  flex justify-center items-center  mb-3 flex-col`}
              >
                <div
                  className={`${
                    !itemQuantities[product?.id]
                      ? "!hidden"
                      : " flex justify-center item-center gap-2  my-4"
                  } !transition-all fadeIn `}
                >
                  <Button
                    type="button"
                    className={`p-2 transition-all fadeIn`}
                    onClick={() => handleDecrease(product?.id)}
                    disabled={(itemQuantities[product?.id] || 0) === 1}
                    aria-label="less"
                    name="minus"
                    accessKey={`Less_quantity_${product?.name}`}
                  >
                    <Minus size={20} />
                  </Button>
                  <Badge
                    className={`fadeIn transition-all shadow-md bg-gradient-to-r text-md px-4 py-2 rounded-lg font-bold text-white/90`}
                  >
                    {itemQuantities[product?.id] || 0}
                  </Badge>
                  <Button
                    type="button"
                    className={`p-2 transition-all fadeIn`}
                    onClick={() => handleIncrease(product?.id)}
                    aria-label="More"
                    name="plus"
                    accessKey={`More_Quantity_${product?.name}`}
                  >
                    <Plus size={20} />
                  </Button>
                </div>
                {itemQuantities[product?.id] >= 1 ? (
                  <Button
                    type="button"
                    className={` xl:w-[220%] lg:w-[150%] md:w-[160%] w-[160%] rounded-full gap-2 py-2 px-4 bg-primary  transition-all `}
                    onClick={() => deleteFromList(product?.id)}
                    aria-label={`Delete ${product.name} from bag`}
                    name="deleteFromList"
                    accessKey={`Delete_From_Bag_For_${product?.name}`}
                  >
                    <PiMinusCircleLight size={20} />
                    {tHomeProducts("delFromBagBtn")}
                  </Button>
                ) : (
                  <>
                    {product?.soldOut ? (
                      <Button
                        type="button"
                        className={`!cursor-no-drop xl:w-[220%] lg:w-[150%] md:w-[150%] w-[150%] rounded-full gap-2 py-2 px-4 bg-primary  transition-all`}
                        disabled={true}
                        aria-label={`${product.name} is Solded_Out`}
                        name="soldout"
                      >
                        {tHomeProducts("soldOutBtn")}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className={` xl:w-[220%] lg:w-[150%] md:w-[150%] w-[150%] rounded-full gap-2 py-2 px-4 bg-primary  transition-all`}
                        onClick={() => AddToList(product)}
                        aria-label={`Add ${product?.name} to bag`}
                        name="AddToBag"
                        accessKey={`Add_To_Bag_${product?.name}`}
                      >
                        <TbShoppingBagPlus size={20} />
                        {tHomeProducts("addToBagBtn")}
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div>
                <ShareButtons product={product} />
              </div>

              <div
                className={`flex flex-col justify-center items-center gap-2 ${
                  lang == "ar" && "flex-row-reverse"
                } `}
              >
                <Image
                  src={`/assets/desc-pic-1.png`}
                  alt="description&rules"
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <p className="flex justify-center items-center gap-4 text-[18px]">
                  {" "}
                  <ArrowDown
                    size={30}
                    className="animate-bounce border p-1 rounded-full"
                  />
                  {tHomeProducts("descRules")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MainSec;
