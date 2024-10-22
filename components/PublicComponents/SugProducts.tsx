import React, { FC } from "react";
import { useTranslations } from "next-intl";
import ProductCarousel from "./ProductCarousel";
import { BsBalloonHeartFill } from "react-icons/bs";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Link } from "../../navigation";
import { StoreIcon } from "lucide-react";

type Props = {
  SugProducts: any;
  loading: any;
};

export const SugProductsList: FC<Props> = ({ SugProducts, loading }: any) => {
  const tHomeProducts = useTranslations("HomeProducts");
  const tHeader = useTranslations("AllHeader");

  return (
    <div className="fadeIn">
      <h3 className="flex justify-center items-center gap-2 text-white bg-primary mx-auto  p-[7px] px-4 w-fit  font-bold text-lg  rounded-full  mb-4 mt-12">
        <BsBalloonHeartFill />
        {tHomeProducts("SugForYou")}
      </h3>
      {loading ? (
        <div
          className={` grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all ease-out duration-300 fadeHidden pb-8`}
        >
          <div className="flex justify-center items-center mx-auto flex-col gap-4">
            <div>
              <Skeleton className="h-[330px] w-[350px] rounded-xl" />
            </div>
            <div>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center ">
              <Skeleton className="w-[200px] h-[30px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center mt-3">
              <Skeleton className="w-[250px] h-[30px] rounded-full" />
              <Skeleton className="w-[250px] h-[30px] rounded-full" />
            </div>
          </div>
          <div className="flex justify-center items-center mx-auto flex-col gap-4">
            <div>
              <Skeleton className="h-[330px] w-[350px] rounded-xl" />
            </div>
            <div>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center ">
              <Skeleton className="w-[200px] h-[30px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center mt-3">
              <Skeleton className="w-[250px] h-[30px] rounded-full" />
              <Skeleton className="w-[250px] h-[30px] rounded-full" />
            </div>
          </div>
          <div className="flex justify-center items-center mx-auto flex-col gap-4">
            <div>
              <Skeleton className="h-[330px] w-[350px] rounded-xl" />
            </div>
            <div>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center ">
              <Skeleton className="w-[200px] h-[30px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center mt-3">
              <Skeleton className="w-[250px] h-[30px] rounded-full" />
              <Skeleton className="w-[250px] h-[30px] rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {SugProducts?.length > 0 ? (
            <div
              dir="ltr"
              className={` grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all  pb-8`}
            >
              {SugProducts?.slice(0, 3).map((product: any) => (
                <div className="fadeIn" key={product.id}>
                  <ProductCarousel product={product} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="flex justify-center items-center mx-auto my-12">
                {tHomeProducts("noProducts")}
              </p>
            </>
          )}
        </>
      )}
      <Link href={`/store`} aria-label="Go To Our Store">
        <Badge
          variant={`outline`}
          className="font-normal mb-5 mx-auto gap-2 text-white text-[18px] bg-primary hover:bg-foreground hover:text-white dark:hover:text-black dark:text-white w-[250px] flex justify-center items-center py-2"
        >
          <StoreIcon size={18} />
          {tHeader("store")}
        </Badge>
      </Link>
    </div>
  );
};

export default SugProductsList;
