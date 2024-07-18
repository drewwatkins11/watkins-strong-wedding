"use client";
import { BodySection, SectionHeading } from "@/components/common";
import { Autoplay, Scrollbar } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import { useBreakpoint } from "@/hooks/tailwind";

const imageClasses = "rounded-xl shadow-xl";

const images = [
  {
    src: "/carousel/canoe.jpg",
    alt: "Ainsley and Drew in a canoe",
    width: 400,
    height: 250,
  },
  {
    src: "/carousel/dbg.jpeg",
    alt: "Ainsley and Drew at the Desert Botanic Gardens",
    width: 400,
    height: 250,
  },
  {
    src: "/carousel/engagement.jpg",
    alt: "Drew proposing to Ainsley",
    width: 400,
    height: 250,
  },
  {
    src: "/carousel/goruck.jpg",
    alt: "Ainsley and Drew at a Goruck event",
    width: 400,
    height: 250,
  },
  {
    src: "/carousel/lodge_porch.jpg",
    alt: "Ainsley and Drew after a night ski",
    width: 400,
    height: 250,
  },
  {
    src: "/carousel/nyc.jpg",
    alt: "Ainsley and Drew being subway tourists in NYC",
    width: 400,
    height: 250,
  },
  {
    src: "/carousel/ski.jpg",
    alt: "Ainsley and Drew skiing in Algqonquin",
    width: 600,
    height: 400,
  },
];

export default function RSVP() {
  const isDesktop = useBreakpoint("lg");

  return (
    <BodySection
      id="rsvp"
      className="!bg-parchment text-black !h-full font-montserrat"
    >
      <SectionHeading heading="rsvp" color="black" />
      <div>
        <h4 className="text-2xl">To RSVP, start by looking up your invite.</h4>
        <p>Only one member of your party needs to RSVP.</p>
        <p className="font-bold">Please RSVP before September 1st.</p>
        <div className="mt-6">
          <Link href="/rsvp/lookup">
            <button className="btn btn-primary">Lookup Invite</button>
          </Link>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={isDesktop ? 3 : 2}
        modules={[Autoplay, Scrollbar]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-11/12 lg:w-4/5 mt-20"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className={imageClasses}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </BodySection>
  );
}
