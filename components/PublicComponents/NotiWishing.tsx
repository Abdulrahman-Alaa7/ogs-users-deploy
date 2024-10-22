"use client";
import React, { useContext } from "react";
import { AppContext } from "../../app/utils/AppContext";

type Props = {};

const NotiWishing = (props: Props) => {
  const { wishingListOgs } = useContext(AppContext);
  return (
    <div>
      <span
        className={`${
          wishingListOgs.length <= 0 && "!hidden"
        } fadeIn transition-all text-[13px] absolute -top-[8px] -right-2 bg-primary rounded-full w-fit px-2 py-0  text-white/90`}
      >
        {wishingListOgs?.length > 9 ? "+9" : wishingListOgs?.length}
      </span>
    </div>
  );
};

export default NotiWishing;
