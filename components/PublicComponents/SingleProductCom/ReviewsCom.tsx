import React from "react";
import { useTranslations } from "next-intl";
import WriteAReview from "../WriteAReview";
import CustomerReviews from "../CustomerReviews";
import { Card, CardContent } from "../../../components/ui/card";

type Props = {
  product: any;
  reviews: any;
  loading: any;
};

const ReviewsCom = ({ product, reviews, loading }: Props) => {
  const tHomeProducts = useTranslations("HomeProducts");
  return (
    <Card className="  border-primary fadeIn mb-4">
      <h2 className="flex justify-center items-center mx-auto   p-4 w-fit rounded-b-3xl font-semibold">
        {tHomeProducts("customerReTit")}
      </h2>
      <WriteAReview id={product?.id} />
      <CardContent className="">
        <CustomerReviews reviews={reviews} loading={loading} />
      </CardContent>
    </Card>
  );
};
export default ReviewsCom;
