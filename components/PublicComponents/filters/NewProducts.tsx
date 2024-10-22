"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@apollo/client";
import { Skeleton } from "../../../components/ui/skeleton";
import ProductCarousel from "../ProductCarousel";
import { Button } from "../../../components/ui/button";
import { GET_PRODUCTS } from "../../../graphql/queries/getProducts";

type Props = {};

const NewProducts = (props: Props) => {
  const { data, loading: getProductsLoading } = useQuery(GET_PRODUCTS);

  const products = data?.getProductsForClients;

  const lang = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.ceil(products?.length / productsPerPage);

  const tHomeProducts = useTranslations("HomeProducts");

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="  fadeIn">
      {getProductsLoading ? (
        <div
          className={` grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all  pb-8`}
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
          {products?.length > 0 ? (
            <div
              className={` grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all  pb-8`}
            >
              {currentProducts?.map((product: any) => (
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
      {products?.length > 6 && (
        <div
          className={`flex justify-between items-center ${
            lang == "ar" && "flex-row-reverse"
          } my-3 md:w-[50%] w-full mx-auto `}
        >
          <Button
            variant="default"
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {tHomeProducts("prevPageBtn")}
          </Button>
          <div
            className={` bg- border shadow text-black dark:text-white p-2 rounded-3xl font-semibold`}
          >
            {currentPage} / {totalPages}
          </div>
          <Button
            variant="default"
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            {tHomeProducts("nextPageBtn")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewProducts;
