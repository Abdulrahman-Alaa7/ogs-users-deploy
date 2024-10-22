import Hero from "../../components/PublicComponents/Hero";
import Heading from "../utils/Heading";
import MoreInfoAboutus from "../../components/PublicComponents/MoreInfoAboutus";
import SomeFeatures from "../../components/PublicComponents/SomeFeatures";
import IndexProductList from "../../components/PublicComponents/IndexProductList";

export default function Home() {
  return (
    <>
      <Heading
        title={`OGs Games`}
        description="OGs Games هو المكان المثالي لشراء العاب الورق في مصر و الوطن العربي ، خليك OG"
        keywords="Card games, شراء العاب, OGs Games, ألعاب الورق, ogs games"
      />
      <div className={`mt-[68px] md:mt-[84px]`}>
        <Hero />
        <IndexProductList />
        <SomeFeatures />
        <MoreInfoAboutus />
      </div>
    </>
  );
}
