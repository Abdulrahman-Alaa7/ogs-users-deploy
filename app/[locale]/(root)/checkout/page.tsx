import React from "react";
import CheckoutCom from "../../../../components/PublicComponents/CheckoutCom";
import Heading from "../../../../app/utils/Heading";
import { useTranslations } from "next-intl";

const Page = () => {
  const tCheckout = useTranslations("CheckOut");

  return (
    <>
      <Heading
        title={`${tCheckout("checkout")} - OGS Games`}
        description="املئ بيانتك لتأكيد طلبك من OGs Games"
        keywords="checkout ogs games, card games, الدفع"
      />
      <div className={`mt-[90px] md:mt-[105px] `}>
        <CheckoutCom />
      </div>
    </>
  );
};

export default Page;
