import React from "react";
import StoreProducts from "../../../../components/PublicComponents/StoreProducts";
import Heading from "../../../utils/Heading";
import { useTranslations } from "next-intl";

const Page = () => {
  const tHeader = useTranslations("AllHeader");

  return (
    <>
      <Heading
        title={`${tHeader("store")} - OGs Games`}
        description="استعراض لأفضل ألعاب الورق المتوفرة في OGs Games. اشترِ الآن واستمتع بأفضل التجارب."
        keywords="ألعاب الورق, متجر الألعاب, شراء الألعاب, card games egypt, ogs games, OGs Games "
      />
      <div
        className={`mt-[60px] md:mt-[62px] bg-secondary dark:bg-[#ffffff05] pb-12 pt-7`}
      >
        <StoreProducts />
      </div>
    </>
  );
};

export default Page;
