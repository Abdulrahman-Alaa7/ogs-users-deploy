"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "../../navigation";
import MainBtn from "./MainBtn";
import { useLocale, useTranslations } from "next-intl";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "../../graphql/queries/getSettings";
import { GET_SETTINGS_HERO } from "../../graphql/queries/getHero";
import { Skeleton } from "../../components/ui/skeleton";
import { Badge } from "../ui/badge";
import { Truck } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const { data, loading } = useQuery(GET_SETTINGS_HERO);
  const { data: settingsData, loading: loadingSettings } =
    useQuery(GET_SETTINGS);
  const slides = data?.getSettingsHero || [];
  const shippingInfo = settingsData?.getSettings?.[0];

  const lang = useLocale();
  const tHeader = useTranslations("AllHeader");

  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);
  const { selectedIndex, onDotButtonClick } = useDotButton(api);

  const cleanAttributes = useCallback((node: HTMLElement | any) => {
    if (node.hasAttribute("__idm_id__")) {
      node.removeAttribute("__idm_id__");
    }
    [...node.children].forEach((child) =>
      cleanAttributes(child as HTMLElement)
    );
  }, []);

  useEffect(() => {
    cleanAttributes(document.body);
  }, [cleanAttributes]);

  if (loading || loadingSettings) {
    return <SkeletonCarousel />;
  }

  return (
    <section className="fadeIn w-full">
      <Carousel
        className="relative"
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnFocusIn: false,
            stopOnInteraction: false,
          }),
        ]}
        opts={{ direction: lang === "ar" ? "rtl" : "ltr" }}
      >
        <CarouselContent className="fadeIn h-[calc(100vh-68px)] !-ml-0 rounded-3xl">
          {slides.map((slide: any) => (
            <CarouselItemContent
              key={slide.id}
              slide={slide}
              shippingInfo={shippingInfo}
              lang={lang}
              tHeader={tHeader}
            />
          ))}
        </CarouselContent>
        <CarouselDots
          slides={slides}
          selectedIndex={selectedIndex}
          onDotButtonClick={onDotButtonClick}
        />
      </Carousel>
    </section>
  );
};

const SkeletonCarousel = () => (
  <div className="w-full h-[680px] flex flex-col gap-4 justify-center items-center md:flex-row md:gap-8 ">
    <div className="h-[80%] md:w-[50%] xl:h-full py-8 flex flex-col items-center justify-center gap-8 text-center">
      <Skeleton className="w-[280px] h-[30px] rounded-full" />
      <Skeleton className="w-[250px] h-[30px] rounded-full" />
      <Skeleton className="w-[200px] h-[30px] rounded-full" />
    </div>
    <div>
      <Skeleton className="h-[330px] w-[350px] rounded-xl" />
    </div>
  </div>
);

const CarouselItemContent = ({ slide, shippingInfo, lang, tHeader }: any) => (
  <CarouselItem className="!w-full !mx-auto !pl-0 h-full flex flex-col gap-4 justify-center items-center md:flex-row md:gap-8">
    <div className="h-[50%] md:w-[50%] xl:h-full py-8 flex flex-col items-center justify-center gap-8 text-center">
      <Badge className="py-2 px-3 text-sm md:text-base mx-auto flex justify-center items-center gap-2">
        <Truck size={18} />
        <p className="text-[12px] md:text-[14px] text-[#ffffff]">
          {lang === "ar"
            ? `شحن مجاني ${shippingInfo?.freeShipDescAr}`
            : `Free shipping ${shippingInfo?.freeShipDescEn}`}
        </p>
      </Badge>
      <h2 className="text-black text-xl lg:text-3xl 2xl:text-5xl dark:text-white">
        {lang === "ar" ? slide.descAr : slide.descEn}
      </h2>
      <h1 className="text-black text-4xl lg:text-6xl 2xl:text-8xl font-semibold dark:text-white px-1">
        {lang === "ar" ? slide.titleAr : slide.titleEn}
      </h1>
      <Link href={`/store`}>
        <MainBtn title={`${tHeader("shopNowBtn")}`} />
      </Link>
    </div>
    <div className="sm:h-[95%] w-full md:w-[40%] h-[50%]">
      <MediaContent mediaSrc={slide.image} />
    </div>
  </CarouselItem>
);

const MediaContent = ({ mediaSrc }: any) => {
  const isImage = mediaSrc.match(/\.(png|jpg|jpeg|gif|svg|bmp|tiff)$/i);
  return isImage ? (
    <Image
      src={mediaSrc}
      className="w-[95%] h-full object-contain rounded-3xl flex justify-center items-center mx-auto"
      alt="Slide Image"
      width={500}
      height={500}
      priority
    />
  ) : (
    <video
      muted
      loop
      autoPlay
      src={mediaSrc}
      className="w-[95%] h-full object-contain rounded-3xl flex justify-center items-center mx-auto"
    >
      <track kind="captions" src="captions.vtt" srcLang="en" label="English" />
    </video>
  );
};

const CarouselDots = ({ slides, selectedIndex, onDotButtonClick }: any) => (
  <div className="absolute left-1/2 bottom-12 transform -translate-x-1/2 mt-2 flex gap-2">
    {slides.map((_: any, index: number) => (
      <DotButton
        key={index}
        onClick={() => onDotButtonClick(index)}
        className={` w-3 h-3 border rounded-full transition ${
          index === selectedIndex
            ? "bg-primary scale-150"
            : "bg-foreground hover:scale-150 cursor-pointer"
        }`}
      />
    ))}
  </div>
);

export default Hero;
