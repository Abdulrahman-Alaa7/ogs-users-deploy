import React, { FC } from "react";
import SingleProduct from "../../../../../components/PublicComponents/SingleProduct";

type Props = {};

const Page: FC<Props> = ({ params }: any) => {
  const id = params?.id;

  return (
    <>
      <SingleProduct id={id} />
    </>
  );
};

export default Page;
