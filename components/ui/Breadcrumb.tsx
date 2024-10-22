import React from "react";
import { Link } from "../../navigation";
import { cn } from "../../lib/utils";
import { RxChevronRight } from "react-icons/rx";
import { useLocale, useTranslations } from "next-intl";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
  const tFooter = useTranslations("AllFooter");
  const lang = useLocale();

  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href={"/"}
        className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px]"
      >
        {tFooter("mainTitBreak")}
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <RxChevronRight
            className={`h-4 w-4 ${lang == "ar" && " rotate-180"}`}
          />
          <Link
            href={item.link}
            className={cn(
              "font-medium text-[16px]",
              index === items.length - 1
                ? "text-foreground pointer-events-none"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
