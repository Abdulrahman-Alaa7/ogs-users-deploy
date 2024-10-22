"use client";
import React, { useContext } from "react";
import { AppContext } from "../../app/utils/AppContext";

type Props = {};

const NotiShipping = (props: Props) => {
  const {
    shippingListOgs,
    handleAddNewItemShipping,
    handleDeleteItemShipping,
    handleItemShippingIncreaseOrDecrease,
  } = useContext(AppContext);

  return (
    <div>
      <span
        className={`${
          shippingListOgs.length <= 0 && "!hidden"
        } fadeIn transition-all text-[13px] absolute -top-[8px] -right-2 bg-primary rounded-full w-fit px-2 py-0  text-white/90`}
      >
        {shippingListOgs?.length > 9 ? "+9" : shippingListOgs?.length}
      </span>
    </div>
  );
};

export default NotiShipping;
