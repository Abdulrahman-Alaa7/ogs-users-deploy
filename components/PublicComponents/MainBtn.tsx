import React from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  accessKey?: string;
};

const MainBtn = ({ title, accessKey }: Props) => {
  return (
    <Button
      name="OGs_Btn"
      accessKey={accessKey}
      className="rounded-full bg-primary  py-3 px-4 !z-50 dark:bg-primary  dark:!text-white dark:md:hover:!text-black hover:bg-black  hover:md:bg-black dark:md:hover:bg-white   hover:!text-white"
    >
      {title}
    </Button>
  );
};

export default MainBtn;
