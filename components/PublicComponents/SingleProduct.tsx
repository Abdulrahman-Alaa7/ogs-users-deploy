"use client";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import BreadCrumb from "../ui/Breadcrumb";
import "@smastrom/react-rating/style.css";
import SugProductsList from "./SugProducts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/getProducts";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries/getProductById";
import Heading from "../../app/utils/Heading";
import DescriptionRules from "./SingleProductCom/DescriptionRules";
import ReviewsCom from "./SingleProductCom/ReviewsCom";
import MainSec from "./SingleProductCom/MainSec";

type Props = {
  id: any;
};

const SingleProduct: FC<Props> = ({ id }) => {
  const { data } = useQuery(GET_PRODUCTS);
  const products = data?.getProductsForClients;

  const { data: theProduct, loading: getProductsByIdLoading } = useQuery(
    GET_PRODUCT_BY_ID,
    {
      variables: { id },
    }
  );
  const product = theProduct?.getProductByIdForClients?.product;
  const sugProducts = theProduct?.getProductByIdForClients?.randomProducts;
  const [reviews, setReviews] = useState<any[]>(product?.reviews || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ratings, setRatings] = useState<number>(0);

  const tFooter = useTranslations("AllFooter");
  const tHomeProducts = useTranslations("HomeProducts");

  const breadcrumbItems = useMemo(
    () => [
      { title: `${tFooter("footLink1")}`, link: "/store" },
      {
        title: getProductsByIdLoading ? `...` : product?.name,
        link: `/store/${id}`,
      },
    ],
    [getProductsByIdLoading, product?.name, tFooter, id]
  );

  useEffect(() => {
    setReviews(product?.reviews || []);
  }, [product]);

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
      <Heading
        title={`${
          getProductsByIdLoading
            ? `${tHomeProducts("moreDetBtn")}`
            : `${product?.name}`
        }  - OGS Games`}
        description={`اكتشف المزيد عن ${product?.name} من OGS Games، واستمتع بتجربة لعبة ممتعه.`}
        keywords={`${product?.name}, ألعاب الورق,card games egypt, ogs games, OGs Games , شراء ${product?.name} `}
      />
      <div
        className={`mt-[60px] md:mt-[62px] bg-secondary dark:bg-[#ffffff05] pb-12 pt-7`}
      >
        <div className="fadeIn    md:mx-12 mx-2">
          <div className="flex justify-center items-center mx-auto mb-6">
            <BreadCrumb items={breadcrumbItems} />
          </div>

          <MainSec
            products={products}
            product={product}
            reviews={reviews}
            setReviews={setReviews}
            loading={getProductsByIdLoading}
          />

          <DescriptionRules
            product={product}
            loading={getProductsByIdLoading}
          />

          <ReviewsCom
            product={product}
            reviews={reviews}
            loading={getProductsByIdLoading}
          />

          <SugProductsList
            SugProducts={sugProducts}
            loading={getProductsByIdLoading}
          />
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
