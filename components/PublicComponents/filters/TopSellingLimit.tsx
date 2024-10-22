"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@apollo/client";
import { Skeleton } from "../../../components/ui/skeleton";
import ProductCarousel from "../ProductCarousel";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Link } from "../../../navigation";
import { GET_TOP_SELLING_WITH_LIMIT } from "../../../graphql/queries/filters/getTopSellingWithLimit";

type Props = {};

const TopSellingLimit = (props: Props) => {
  const { data, loading } = useQuery(GET_TOP_SELLING_WITH_LIMIT);
  const lang = useLocale();
  const products = data?.getTopSellingWithLimit;

  const [visibleProducts, setVisibleProducts] = useState(3);
  const [isViewMore, setIsViewMore] = useState(true);
  const tHomeProducts = useTranslations("HomeProducts");

  const handleToggleView = () => {
    setVisibleProducts(isViewMore ? 6 : 3);
    setIsViewMore(!isViewMore);
  };

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all pb-8">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex justify-center items-center mx-auto flex-col gap-4"
        >
          <Skeleton className="h-[330px] w-[350px] rounded-xl" />
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
          <Skeleton className="w-[200px] h-[30px] rounded-full" />
          <Skeleton className="w-[250px] h-[30px] rounded-full" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="fadeIn">
      {loading ? (
        renderSkeletons()
      ) : (
        <>
          {products?.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all pb-8`}
            >
              {products.slice(0, visibleProducts).map((product: any) => (
                <div className="fadeIn" key={product.id}>
                  <ProductCarousel product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="flex justify-center items-center mx-auto my-12">
              {tHomeProducts("noProducts")}
            </p>
          )}
        </>
      )}
      {isViewMore && products?.length > 3 ? (
        <Button
          variant="outline"
          className="w-full my-3 !border-primary !text-primary hover:text-primary"
          onClick={handleToggleView}
        >
          {tHomeProducts("viewMoreBtn")}
        </Button>
      ) : (
        <div className="flex justify-center items-center my-3">
          <Link href="/store">
            <Badge
              variant="outline"
              className={`${
                lang === "ar" ? "flex-row-reverse" : ""
              } gap-2 text-[18px] bg-primary w-[250px] text-white hover:opacity-85 transition-all  flex justify-center items-center py-2`}
            >
              {tHomeProducts("seeAllBtn")}
            </Badge>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopSellingLimit;
