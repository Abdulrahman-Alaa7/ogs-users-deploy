import React from "react";
import Heading from "../../../utils/Heading";
import Search from "../../../../components/PublicComponents/Search";

const Page = () => {
  return (
    <>
      <Heading
        title="Search - OGS Games"
        description="نتائج البحث عن ألعاب الورق المفضلة لديك مع OGs Games."
        keywords="تائج البحث, ألعاب الورق, OGS Games, البحث عن الألعاب"
      />
      <div className={`mt-[90px] md:mt-[105px]`}>
        <Search />
      </div>
    </>
  );
};

export default Page;
