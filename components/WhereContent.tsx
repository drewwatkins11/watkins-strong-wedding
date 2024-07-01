import { useBreakpoint } from "@/hooks/tailwind";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const accomodations: {
  title: string;
  description: string;
  bookingLink?: string;
}[] = [
  {
    title: "Peek'n Peak",
    description:
      "Peak'n'Peak is the closest option for accomodations and has several options to choose from, including both hotel rooms and condos. They also have a spa and golf course. Blocks are not available and prices start around $229/night.",
    bookingLink:
      "https://www.inntopia.travel/Ecomm/Shop/Lodging/2557220/en-US/?arrivaldate=2024-10-12&departuredate=2024-10-13&adultcount=2&childCount=0&childagearray=",
  },
  {
    title: "Holiday Inn Express",
    description:
      "We're finalizing a block of rooms at the Holiday Inn in North East, PA. They're about 20 minutes away and have a pool, slide, and hot tub. Prices start around $140/night. For out-of-towners, is the most convenient option off Interstate 90.",
    bookingLink:
      "https://www.inntopia.travel/Ecomm/Shop/Lodging/2557220/en-US/?arrivaldate=2024-10-12&departuredate=2024-10-13&adultcount=2&childCount=0&childagearray=",
  },
  {
    title: "AirBnB",
    description:
      "There are several AirBnb locations in the area, ranging from cabins to houses. You may also want to look at North East, PA, which has beautiful vineyards to enjoy on Sunday.",
    bookingLink:
      "https://www.airbnb.com/s/Wattsburg--Pennsylvania--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-07-01&monthly_length=3&monthly_end_date=2024-10-01&price_filter_input_type=0&channel=EXPLORE&query=Wattsburg%2C%20PA&place_id=ChIJA1i8YR2cMogREyrSeKJcoW0&location_bb=QigHacKfmo9CJ%2F7Uwp%2BgTw%3D%3D&date_picker_type=calendar&checkin=2024-10-12&checkout=2024-10-13&adults=2&source=structured_search_input_header&search_type=autocomplete_click",
  },
  {
    title: "Tent Camping",
    description:
      "You're welcome to pitch a tent in the field behind the lodge. We'd love to have you stay on site and not worry about transportation or what time you have to leave the party! (Sorry, no RVs permitted!)",
  },
];

function openMaps() {
  // If it's an iPhone..
  if (
    navigator.platform.indexOf("iPhone") != -1 ||
    navigator.platform.indexOf("iPod") != -1 ||
    navigator.platform.indexOf("iPad") != -1
  )
    window.open(
      "maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=42.0550538,-79.7746085",
      "_blank"
    );
  else
    window.open(
      "https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=42.0550538,-79.7746085",
      "_blank"
    );
}

const schoolyardMarkerImg = (
  <span className="text-red-300 border-red-100 border-2 p-1 pb-3 rounded-full">
    <FontAwesomeIcon icon={faMapPin} className="text-4xl" />
  </span>
);

export default function WhereContent() {
  const [markerPosition] = useState({
    lat: 42.055228,
    lng: -79.771924,
  });
  const [schoolyardPosition] = useState({
    lat: 42.055495,
    lng: -79.775505,
  });
  const [mapCenter] = useState({
    lat: 41.735617,
    lng: -80.875291,
  });

  const isDesktop = useBreakpoint("lg");

  const schoolyardMarker = {
    marker: schoolyardMarkerImg,
    ...schoolyardPosition,
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around w-full gap-8 lg:gap-0 flex-wrap">
      <div className="prose px-4 lg:px-0 lg:w-2/5 prose-headings:text-parchment prose-p:text-parchment prose-p:text-lg ">
        <p className="italic font-thin mb-0">
          The ceremony and reception
          <br /> will be held at the:
        </p>
        <h3 className="font-oyster text-4xl lg:text-7xl mb-4 mt-0">
          Wilderness Lodge
        </h3>
        <p className="italic font-thin mb-0">located at:</p>
        <p className="mt-0">
          13448 Weeks Valley Rd
          <br />
          Wattsburg, PA 16442
        </p>
        <button
          onClick={openMaps}
          className="rounded-full py-2 px-2 pr-3 text-sm border border-black font-semibold hover:scale-110 transition-all hover:shadow-lg bg-parchment"
        >
          <i className="rounded-full bg-ember p-1 px-2 mr-2">
            <FontAwesomeIcon icon={faMap} className="text-parchment" />
          </i>
          open in maps
        </button>
        <hr className="mb-6 my-6 border-wheat w-6/12 mx-auto" />
        <p className="lg:w-4/5 mx-auto">
          The{" "}
          <a className="text-wheat" href="https://thewildernesslodge.net">
            Wilderness Lodge
          </a>{" "}
          holds a special place in our hearts. It&apos;s owned by Drew&apos;s
          step-family and he&apos;s been skiing there since the age of 8.
        </p>{" "}
        <p className="lg:w-4/5 mx-auto">
          Ainsley and Drew met while he was living on the property in 2021 and
          many of our early dates were spent exploring the woods and trails
          around the lodge. We&apos;re excited to share this special place with
          our friends and family!
        </p>
        <hr className="mb-6 my-6 border-wheat w-6/12 mx-auto" />
        <p className="lg:w-4/5 mx-auto">
          The ceremony will be held in the &ldquo;schoolyard&rdquo; - a clearing
          just inside the woodline (looking West from the lodge). It&apos;s
          roughly a 200 yard walk.
        </p>
        <div
          className="w-full lg:w-5/6  mx-auto shadow-lg rounded-2xl overflow-hidden mb-12 lg:mb-0"
          style={{ height: isDesktop ? "300px" : "300px" }}
        >
          <Map
            markers={[schoolyardMarker]}
            initialViewState={{
              longitude: -79.773429,
              latitude: 42.055412,
              zoom: 16.2,
              pitch: 57.78,
              bearing: -54.72,
            }}
            mapStyle="POI"
          />
        </div>
      </div>
      <div
        className="px-4 lg:px-0 lg:w-3/5 flex flex-row flex-wrap gap-4  relative lg:mt-12"
        style={{ minHeight: isDesktop ? "850px" : undefined }}
      >
        <div
          className="w-full lg:w-3/5 min-h-96 ml-auto shadow-lg rounded-2xl overflow-hidden z-40"
          style={{ height: isDesktop ? "500px" : "300px" }}
        >
          <Map markers={[markerPosition]} mapCenter={mapCenter} />
        </div>
        <Image
          src="/place_img/wilderness_lodge_outside_corner.jpg"
          width="450"
          height="450"
          alt="Wilderness Lodge Entryway"
          className="lg:absolute rounded-2xl shadow-lg z-50"
          style={{ top: "400px" }}
        />
        <Image
          src="/place_img/ainsley_excited_ski.jpg"
          width="400"
          height="400"
          alt="Ainsley skiing in spring 2022"
          className="lg:absolute rounded-2xl shadow-lg z-30 hover:z-50 ease-in-out transition-all hidden lg:block"
          style={{ top: "75px", left: "60px" }}
        />
        <Image
          src="/place_img/wilderness_lodge_schoolyard.jpg"
          width="400"
          height="400"
          alt="Schoolyard (ceremony area)"
          className="lg:absolute rounded-2xl shadow-lg z-30 hover:z-50 ease-in-out transition-all"
          style={{ top: "520px", right: "20px" }}
        />
      </div>
      <div className="w-11/12 lg:w-full mx-auto bg-parchment p-8 rounded-2xl shadow-lg text-black mt-12">
        <h3 className="font-oyster text-4xl lg:text-7xl mb-4 mt-0">
          Accomodations
        </h3>
        <p className="w-3/5 mx-auto">
          Accomodations are available at several area hotels. Here are the best
          options:
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 text-base w-11/12 mx-auto">
          {accomodations.map((accomodation, index) => (
            <div className="flex flex-col basis-5/12 mb-4" key={index}>
              <h3 className="font-bold mb-2 text-xl">{accomodation.title}</h3>
              <p>{accomodation.description}</p>
              {accomodation.bookingLink && (
                <a
                  className="capitalize text-ember font-bold mt-2"
                  href={accomodation.bookingLink}
                >
                  check availability
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
