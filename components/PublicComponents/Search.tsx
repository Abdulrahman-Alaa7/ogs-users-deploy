"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import BreadCrumb from "../ui/Breadcrumb";
import { Badge } from "../ui/badge";
import { Link } from "../../navigation";
import { ScanSearch, StoreIcon } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/getProducts";
import ProductCarousel from "./ProductCarousel";
import { Skeleton } from "../ui/skeleton";
import { useSearchParams } from "next/navigation";

type Props = {};

const Search = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");

  const tHeader = useTranslations("AllHeader");
  const breadcrumbItems = [
    { title: `${tHeader("inputSearchTitle")}`, link: "/" },
  ];

  const { data, loading: getProductsLoading } = useQuery(GET_PRODUCTS);

  const products = useMemo(() => data?.getProductsForClients || [], [data]);

  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      setGames(
        products.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      setLoading(false);
    }
  }, [products, search]);

  return (
    <div className="fadeIn mt-6 px-4 md:px-12 ">
      <div className="flex justify-center items-center mx-auto">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <h1
        className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
      >
        {tHeader("searchTitle")}
      </h1>

      {getProductsLoading || loading ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all  pb-8`}
        >
          {" "}
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
          {games?.length > 0 ? (
            <div
              dir="ltr"
              className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all  pb-8`}
            >
              {" "}
              {games?.map((game: any) => (
                <div className="fadeIn " key={game.id}>
                  <ProductCarousel product={game} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mx-auto ">
              <ScanSearch size={120} className="text-muted-foreground" />
              <p className="flex justify-center items-center mx-auto mt-6 text-[25px] my-3 font-bold text-muted-foreground">
                {tHeader("searchResults")}
              </p>
            </div>
          )}
        </>
      )}

      <div className="flex justify-center items-center my-8">
        <Link href={`/store`}>
          <Badge
            variant={`outline`}
            className=" gap-2  font-normal text-white text-[18px] bg-primary hover:bg-foreground hover:text-white dark:hover:text-black dark:text-white w-[250px] flex justify-center items-center py-2"
          >
            <StoreIcon size={18} />
            {tHeader("store")}
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default Search;
