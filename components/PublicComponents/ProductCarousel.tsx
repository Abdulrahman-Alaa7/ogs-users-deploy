"use client";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { EmblaCarouselType } from "embla-carousel";
import { Badge } from "../ui/badge";
import { Gift, Minus, Plus } from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "../../navigation";
import { CgDetailsMore } from "react-icons/cg";
import { TbShoppingBagPlus } from "react-icons/tb";
import { PiMinusCircleLight } from "react-icons/pi";
import { AppContext } from "../../app/utils/AppContext";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/getProducts";

type Props = {
  product: any;
};

const ProductCarousel: FC<Props> = ({ product }) => {
  const { data } = useQuery(GET_PRODUCTS);
  const products = data?.getProductsForClients;

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

  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);
  const { selectedIndex, onDotButtonClick } = useDotButton(api);
  const [order, setOrder] = useState<Array<any>>(shippingListOgs);

  const [itemQuantities, setItemQuantities] = useState<{
    [key: string]: number;
  }>(() => {
    const initialQuantities: { [key: string]: number } = {};
    if (products && typeof products === "object") {
      Object.keys(products).forEach((item: any) => {
        initialQuantities[item] = 0;
      });
    }
    return initialQuantities;
  });

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

  useEffect(() => {
    setOrder(shippingListOgs);
    const allProductsId = products?.map((el: any) => el.id);
    const allOrderAndQuantity = order?.map((item) => {
      if (allProductsId?.includes(item.id)) {
        return { id: item.id, quantity: item.quantity };
      } else {
        return null;
      }
    });

    const quantities: any = {};
    allOrderAndQuantity.forEach((item: any) => {
      quantities[item?.id] = item?.quantity;
    });

    setItemQuantities(quantities);
  }, [order, wishingListOgs, shippingListOgs, products]);

  const AddToList = useCallback(
    (item: any) => {
      const id = item.id;
      setItemQuantities((prevState) => ({ ...prevState, [id]: 1 }));
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
      toast.success(`${tHeader("successAddedBag")}`);
    },
    [handleAddNewItemShipping, tHeader]
  );

  const deleteFromList = useCallback(
    (id: any) => {
      setOrder((prevOrder: any) =>
        prevOrder.filter((item: any) => item.id !== id)
      );
      setItemQuantities((prevState: any) => ({ ...prevState, [id]: 0 }));
      handleDeleteItemShipping(id);
      toast(`${tHeader("successDelBag")}`);
    },
    [handleDeleteItemShipping, tHeader]
  );

  const handleIncrease = useCallback(
    (id: any) => {
      setItemQuantities((prevState: any) => ({
        ...prevState,
        [id]: (prevState[id] || 0) + 1,
      }));

      setOrder((prevOrder: any) =>
        prevOrder.map((item: any) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      handleItemShippingIncreaseOrDecrease(id, itemQuantities[id] + 1);
    },
    [handleItemShippingIncreaseOrDecrease, itemQuantities]
  );

  const handleDecrease = useCallback(
    (id: any) => {
      if (itemQuantities[id] && itemQuantities[id] > 0) {
        setItemQuantities((prevState: any) => ({
          ...prevState,
          [id]: prevState[id] - 1,
        }));

        setOrder((prevOrder: any) =>
          prevOrder.map((item: any) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
        handleItemShippingIncreaseOrDecrease(id, itemQuantities[id] - 1);
      }
    },
    [handleItemShippingIncreaseOrDecrease, itemQuantities]
  );

  const handleAddWishingList = useCallback(
    (item: any) => {
      handleAddToWishingList(item);
      toast.success(`${tHeader("successAddedFav")}`);
    },
    [handleAddToWishingList, tHeader]
  );

  const handleDeleteWishingList = useCallback(
    (id: any) => {
      handleDeleteFromWishingList(id);
      toast(`${tHeader("successDelFav")}`);
    },
    [handleDeleteFromWishingList, tHeader]
  );

  const isExistInWish: boolean = useMemo(
    () => wishingListOgs.some((item: any) => item.id === product.id),
    [wishingListOgs, product.id]
  );

  return (
    <Card className=" flex flex-col h-full gap-4  relative pb-36 transition-all duration-500 pt-4 border-primary border ">
      <div className=" absolute right-2 top-2 flex flex-col items-center gap-2 z-30">
        {isExistInWish ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className=" transition-all duration-300">
                <Button
                  variant={`outline`}
                  type="button"
                  className=" rounded-full w-10 h-10 flex justify-center items-center p-0  transition-all duration-300 shadow-md"
                  onClick={() => handleDeleteWishingList(product.id)}
                  aria-label={`Delete ${product.name} From wishlist`}
                  name="deleteWishList"
                >
                  <IoIosHeart size={25} className="text-primary" />
                </Button>
              </TooltipTrigger>

              <TooltipContent
                className="bg-black text-white border-[#292524]"
                side="left"
              >
                <p>{tHomeProducts("deleteFromWishList")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className=" transition-all duration-300">
                <Button
                  variant={`outline`}
                  type="button"
                  className=" rounded-full w-10 h-10 flex justify-center items-center p-0 transition-all duration-300 shadow-md"
                  onClick={() => handleAddWishingList(product)}
                  aria-label={`Add ${product.name} to wishlist`}
                  name="addToWishList"
                >
                  <IoIosHeartEmpty size={25} />
                </Button>
              </TooltipTrigger>

              <TooltipContent
                className="bg-black text-white border-[#292524]"
                side="left"
              >
                <p>{tHomeProducts("addToWishList")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {product.aiGen === true && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-8 h-8  rounded-md cursor-default shadow-md bg-gradient-to-r from-violet-200 to-pink-200 text-black/80 flex justify-center items-center gap-1 hover:opacity-80">
                  <Image
                    src={`/assets/ai.png`}
                    alt="AI"
                    width={20}
                    height={20}
                    loading="lazy"
                    aria-label={`AI - ${product.name}`}
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

      <div className=" absolute left-2 top-2  flex  items-start gap-1 z-20 flex-col">
        {product?.soldOut === true && (
          <Badge
            variant={`default`}
            className={`${
              lang === "ar" && "flex-row-reverse"
            } text-[14px] bg-black dark:bg-white shadow-md dark:text-black text-white hover:!bg-primary hover:!text-white flex justify-center items-center gap-1`}
          >
            <IoCloseCircleOutline size={17} /> {tHomeProducts("soldOutBtn")}
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
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnFocusIn: false,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            <CarouselItem>
              <div
                className={`relative   max-w-[100%] min-h-96  transition-all  p-[7px]  flex justify-center items-center flex-col rounded-lg font-semibold text-[15px]`}
              >
                <Image
                  src={product?.mainImage}
                  alt={product?.name}
                  fill
                  className="absolute object-contain rounded-md z-10 max-w-[99%]  cursor-grab mx-auto"
                  loading="lazy"
                  aria-label={`First Image For ${product.name}`}
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
                    className="absolute object-contain rounded-md z-10 max-w-[99%]  mx-auto  cursor-grab "
                    loading="lazy"
                    aria-label={`Image number ${elIndex} For ${product.name}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

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

            {product?.images.map((_: any, elIndex: number) => (
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
            className="absolute object-contain rounded-md z-10 max-w-[99%]  mx-auto"
            loading="lazy"
            aria-label={`Main Image For ${product.name}`}
          />
        </div>
      )}

      <CardContent className="flex flex-col gap-2 p-2">
        <div className="flex justify-center">
          <span className=" line-clamp-2 font-bold text[22px]">
            {product?.name}
          </span>
        </div>

        {product?.estimatedPrice > 0 ? (
          <div
            dir={`${lang === "ar" ? "rtl" : "ltr"}`}
            className="prices flex justify-center items-center gap-3 mt-1 mb-2"
          >
            <span
              className={`font-semibold block line-through text-muted-foreground`}
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
            </span>

            <Badge variant="secondary" className={`font-bold text-[16px] `}>
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

            <Badge variant="default" className="text-white font-bold">
              {discountPercentage}%
            </Badge>
          </div>
        ) : (
          <div
            dir={`${lang === "ar" ? "rtl" : "ltr"}`}
            className="prices flex justify-center items-center gap-3 my-3 "
          >
            <Badge variant="secondary" className="font-bold text-[16px] ">
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

        <div className="absolute flex flex-col gap-4 items-center w-full bottom-3 right-2 left-1 ">
          <div
            className={` transition-all  flex justify-center items-center ${
              itemQuantities[product?.id] === 0 ? "mt-6" : "mt-12"
            } mb-9 flex-col`}
          >
            {itemQuantities[product?.id] >= 1 ? (
              <Button
                type="button"
                className={`${
                  lang === "ar" && "flex-row-reverse"
                }  absolute bottom-12 w-[90%] rounded-full gap-2 py-2 px-4 bg-primary     transition-all `}
                onClick={() => deleteFromList(product?.id)}
                aria-label={`Delete ${product.name} from bag`}
                name="deleteFromList"
                accessKey={`Delete_From_Bag_For_${product.name}`}
              >
                <PiMinusCircleLight size={20} />

                {tHomeProducts("delFromBagBtn")}
              </Button>
            ) : (
              <>
                {product?.soldOut ? (
                  <Button
                    type="button"
                    className={`!cursor-no-drop absolute bottom-12 w-[90%] rounded-full gap-2 py-2 px-4 bg-primary transition-all`}
                    disabled={true}
                    aria-label={`${product.name} is Solded_Out`}
                    name="soldout"
                  >
                    {tHomeProducts("soldOutBtn")}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className={`${
                      lang === "ar" && "flex-row-reverse"
                    }  absolute bottom-12 w-[90%] rounded-full gap-2 py-2 px-4 bg-primary transition-all`}
                    onClick={() => AddToList(product)}
                    aria-label={`Add ${product.name} to bag`}
                    name="AddToBag"
                    accessKey={`Add_To_Bag_${product.name}`}
                  >
                    <TbShoppingBagPlus size={20} />

                    {tHomeProducts("addToBagBtn")}
                  </Button>
                )}
              </>
            )}

            <Link
              href={`/store/${product?.id}`}
              className={`${
                lang === "ar" && "flex-row-reverse"
              } absolute bottom-0  h-10 hover:bg-primary gap-2 text-white inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[90%] rounded-full py-2 px-4 bg-primary hover:opacity-85 `}
            >
              <CgDetailsMore size={20} />

              {tHomeProducts("moreDetBtn")}
            </Link>

            <div
              className={`${
                !itemQuantities[product?.id]
                  ? "!hidden"
                  : " flex justify-center item-center gap-2 absolute bottom-20 my-4"
              } !transition-all fadeIn `}
            >
              <Button
                type="button"
                className={`p-2 transition-all fadeIn`}
                onClick={() => handleDecrease(product?.id)}
                disabled={(itemQuantities[product?.id] || 0) === 1}
                aria-label="less"
                name="minus"
                accessKey={`Less_quantity_${product.name}`}
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
                accessKey={`More_Quantity_${product.name}`}
              >
                <Plus size={20} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCarousel;
