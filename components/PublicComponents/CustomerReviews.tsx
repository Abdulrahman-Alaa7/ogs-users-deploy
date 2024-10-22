"use client";
import React, { useState, useCallback } from "react";
import { Rating } from "@smastrom/react-rating";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { FaRankingStar } from "react-icons/fa6";

const ReviewSkeleton = () => (
  <div className="flex flex-col gap-3 items-center justify-center">
    <Skeleton className="w-[300px] h-[35px] rounded-full" />
    <div className="flex flex-col gap-2 items-center justify-center mt-2">
      <Skeleton className="w-[310px] h-[15px] rounded-full" />
      <Skeleton className="w-[280px] h-[15px] rounded-full" />
      <Skeleton className="w-[210px] h-[15px] rounded-full" />
    </div>
  </div>
);

type Props = {
  reviews: any[];
  loading: boolean;
};

const CustomerReviews = React.memo(({ reviews, loading }: Props) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const tHomeProducts = useTranslations("HomeProducts");

  const showMoreReviews = useCallback(() => {
    setVisibleCount((prevCount) => prevCount + 3);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="fadeIn grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <ReviewSkeleton key={index} />
            ))}
        </div>
      ) : reviews?.length === 0 ? (
        <div className="text-center">
          <FaRankingStar size={120} className="text-muted-foreground mx-auto" />
          <p className="text-[25px] font-bold text-muted-foreground">
            {tHomeProducts("noReviews")}
          </p>
        </div>
      ) : (
        <>
          <div className="fadeIn grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 transition-all">
            {reviews.slice(0, visibleCount).map((item, index) => (
              <div
                key={item.id || index}
                className="relative fadeIn flex flex-col gap-2 bg-secondary p-2 rounded-md justify-center items-center"
              >
                <Rating
                  style={{ maxWidth: 180 }}
                  value={item.rating}
                  readOnly
                />
                <h3 className="text-md text-[#666] leading-loose dark:text-[#939db6]">
                  {item.name}, {format(new Date(item.createdAt), "dd/MM/yyyy")}
                </h3>
                <p className="text-md leading-loose text-center">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
          {visibleCount < reviews?.length && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                type="button"
                className="w-full my-3 border-primary text-primary hover:text-primary"
                onClick={showMoreReviews}
              >
                {tHomeProducts("viewMoreBtn")}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

CustomerReviews.displayName = "CustomerReviews";

export default CustomerReviews;
